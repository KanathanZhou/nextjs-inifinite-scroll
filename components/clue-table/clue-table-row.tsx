"use client"

import {ClueModel} from "@/model/clue.model";
import {WIDTH_MAPPER} from "@/components/clue-table/clue-table-header";
import {Dispatch, SetStateAction, useCallback, useMemo, useState} from "react";
import './index.css'
import {createClient} from "@/utils/supabase/client";

export default function ClueTableRow({
                                       clue,
                                       selectAll,
  selected,
                                       setSelected
}: {
  clue: ClueModel
  selectAll: boolean
  selected: number[]
  setSelected: Dispatch<SetStateAction<number[]>>
}) {
  const supabase = createClient();
  const [editURL, setEditURL] = useState(clue.url)

  const checked = useMemo(() => {
    if (selectAll) {
      return !selected.includes(clue.id)
    } else {
      return selected.includes(clue.id)
    }
  }, [selected, selectAll])

  const onChangeSelect = useCallback((select: boolean) => {
    if (selectAll) {
      if (select) {
        setSelected(s => s.filter(item => item !== clue.id))
      } else {
        setSelected(s => [...s, clue.id])
      }
    } else {
      if (select) {
        setSelected(s => [...s, clue.id])
      } else {
        setSelected(s => s.filter(item => item !== clue.id))
      }
    }
  }, [selectAll, setSelected])

  const onUpdateURL = useCallback(async () => {
    console.log(editURL)
    const { error, status } =
      await supabase.from("openmart_quiz").update({ url: editURL }).eq('id', clue.id);
    alert('Updated')
  }, [editURL, clue])

  return (
    <div className="flex items-center">
      <div className="py-3 px-4 flex-none">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className="border-gray-200 rounded text-blue-600 focus:ring-blue-500"
            checked={checked}
            onChange={(e) => onChangeSelect(e.target.checked)}
          />
        </div>
      </div>
      <div
        className="flex-none py-4 whitespace-nowrap text-sm font-medium text-gray-800"
        style={{ width: WIDTH_MAPPER['id'] }}
      >
        {clue.id}
      </div>
      <div
        className="flex-none px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 overflow-ellipsis overflow-hidden hover-cell"
        style={{width: WIDTH_MAPPER['url'], position: 'relative'}}
      >
        <input value={editURL} onChange={(e) => setEditURL(e.target.value)} className="cell-input"/>
        <button
          type="button"
          className="px-1 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          style={{position: 'absolute', right: 0, top: 0, fontSize: 11}}
          onClick={onUpdateURL}
        >
          Update
        </button>
      </div>
      <div
        className="flex-none px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 overflow-ellipsis overflow-hidden"
        style={{width: WIDTH_MAPPER['created_at']}}
      >
        {clue.created_at}
      </div>
      <div
        className="flex-none px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 overflow-ellipsis overflow-hidden"
        style={{width: WIDTH_MAPPER['updated_at']}}
      >
        {clue.updated_at}
      </div>
      <div
        className="flex-none px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 overflow-ellipsis overflow-hidden"
        style={{ width: WIDTH_MAPPER['retailer_name'] }}
      >
        {clue.retailer_name}
      </div>
      <div
        className="flex-none px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 overflow-ellipsis overflow-hidden"
        style={{ width: WIDTH_MAPPER['desc_short'] }}
      >
        {clue.desc_short}
      </div>
      <div
        className="flex-none px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 overflow-ellipsis overflow-hidden"
        style={{ width: WIDTH_MAPPER['sector'] }}
      >
        {clue.sector}
      </div>
      <div
        className="flex-none px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 overflow-ellipsis overflow-hidden"
        style={{ width: WIDTH_MAPPER['type'] }}
      >
        {clue.type}
      </div>
      <div
        className="flex-none px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 overflow-ellipsis overflow-hidden"
        style={{ width: WIDTH_MAPPER['location'] }}
      >
        {clue.location}
      </div>
      <div
        className="flex-none px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 overflow-ellipsis overflow-hidden"
        style={{ width: WIDTH_MAPPER['city'] }}
      >
        {clue.city}
      </div>
      <div
        className="flex-none px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 overflow-ellipsis overflow-hidden"
        style={{ width: WIDTH_MAPPER['state'] }}
      >
        {clue.state}
      </div>
      <div
        className="flex-none px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 overflow-ellipsis overflow-hidden"
        style={{ width: WIDTH_MAPPER['country'] }}
      >
        {clue.country}
      </div>
      <div
        className="flex-none px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 overflow-ellipsis overflow-hidden"
        style={{ width: WIDTH_MAPPER['other_columns'] }}
      >
        {clue.other_columns}
      </div>
      <div
        className="flex-none px-6 py-4 whitespace-nowrap text-sm font-medium"
        style={{ width: WIDTH_MAPPER['action'] }}
      >
        <button
          type="button"
          className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
