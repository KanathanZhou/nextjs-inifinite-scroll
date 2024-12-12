"use client"

import {CSSProperties, forwardRef, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import InfiniteLoader from "react-window-infinite-loader";
import { VariableSizeList as List } from "react-window";
import {ClueModel} from "@/model/clue.model";
import {createClient} from "@/utils/supabase/client";
import ClueTableRow from "@/components/clue-table/clue-table-row";
import ClueTableHeader from "@/components/clue-table/clue-table-header";
import {useWindowSize} from "@/hooks/useWindowSize";


export default function ClueTableWrapper({
  clues,
  count
}: {
  clues: ClueModel[],
  count: number
}) {
  const windowSize = useWindowSize();
  const supabase = createClient();
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [data, setData] = useState<ClueModel[]>(clues);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [selectAll, setSelectAll] = useState(false)
  const [selected, setSelected] = useState<number[]>([])

  useEffect(() => {
    supabase
      .channel('openmart_quiz')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'openmart_quiz' }, (cb) => {
        setData(items => {
          const newItems = [...items]
          const updatedItem = newItems.find(item => item.id === cb.new.id)
          if (updatedItem) {
            updatedItem.updated_at = cb.new.updated_at
            updatedItem.url = cb.new.url
          }
          return newItems
        })
      })
      .subscribe()
  }, [data, setData])

  const onChangeSelectAll = useCallback((v: boolean) => {
    setSelectAll(v)
    setSelected([])
  }, [])

  const selectedRowsCount = useMemo(() => {
    if (selectAll) {
      return count - selected.length
    } else {
      return selected.length
    }
  }, [selectAll, selected, count])

  const itemCount = useMemo(() => {
    return hasNextPage ? data.length + 1 : data.length;
  }, [hasNextPage, data]);

  const loadNextPage = async () => {
    setIsNextPageLoading(true);
    const lastId = data[data.length - 1].id
    const { data: nextClues } = await supabase.from("openmart_quiz").select().range(0, 49).gt('id', lastId).order('id', { ascending: true });
    setData(d => [...data, ...(nextClues ?? [])]);
    if (nextClues) {
      if (nextClues.length === 0) {
        setHasNextPage(false);
      }
    }
    setIsNextPageLoading(false);
  }

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  const isItemLoaded = (index: number) => !hasNextPage || index < data.length;

  // Render an item or a loading indicator.
  const Item = ({ index, style }: { index: number, style: CSSProperties }) => {
    if (isItemLoaded(index)) {
      const clue = data[index];
      return (
        <div style={style}>
          {index === 0 && <ClueTableHeader selectAll={selectAll} onChangeSelectAll={onChangeSelectAll}/>}
          <ClueTableRow key={clue.id} clue={clue} selected={selected} selectAll={selectAll} setSelected={setSelected} />
        </div>
      )
    } else {
      return <div style={{ padding: '20px', ...style }}>Loading...</div>;
    }
  };

  const onBulkUpdateCreatedAt = useCallback(async() => {
    if (selectAll) {
      const { error, data } =
        await supabase
          .from("openmart_quiz")
          .update({ updated_at: Date.now() })
          .not('id', 'in', `(${selected.join(',')})`);
      alert('Bulk updated ok')
    } else {
      if (selected.length) {
        const { error, data } =
          await supabase
            .from("openmart_quiz")
            .update({ updated_at: Date.now() })
            .in('id', selected);
        alert('Bulk updated ok')
      } else {
        alert('Please select couple rows')
      }
    }
  }, [selectAll, selected])

  return (
    <>
      <div style={{height: 72}} className="flex items-center p-4">
        <div className="flex gap-2 items-center">
          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 focus:outline-none focus:border-blue-600 focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none"
          >
            Total rows: {count}, select rows: {selectedRowsCount}
          </button>

          <button
            type="button"
            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none"
            onClick={onBulkUpdateCreatedAt}
          >
            Bulk update selected rows updated_at to now
          </button>
        </div>
      </div>
      {(windowSize.width && windowSize.height) && (
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={itemCount}
          loadMoreItems={loadMoreItems}
        >
          {({onItemsRendered, ref}) => (
            <List
              className="divide-y divide-gray-200"
              ref={ref}
              onItemsRendered={onItemsRendered}
              height={(windowSize.height as number) - 72}
              itemCount={itemCount}
              itemSize={index => index === 0 ? 98 : 54}
              width={windowSize.width as number}
            >
              {Item}
            </List>
          )}
        </InfiniteLoader>
      )}
    </>

  );
};

