import {createClient} from "@/utils/supabase/server";
import ClueTableWrapper from "@/components/clue-table/clue-table-wrapper";

export default async function Index() {
  const supabase = await createClient();
  const { data: clues, count } = await supabase.from("openmart_quiz").select('*', { count: 'exact' }).range(0, 49).order('id', { ascending: true });
  console.log(count)

  return (
    <>
      <ClueTableWrapper clues={clues ?? []} count={count ?? 0} />
    </>
  );
}
