import {ReactNode} from "react";

export default function ClueTable({ children }: { children: ReactNode }) {
  return (
    <div className="table min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
      {children}
    </div>
  )
}
