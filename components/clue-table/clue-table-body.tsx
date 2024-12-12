import {ReactNode} from "react";

export default function ClueTableBody({ children }: { children: ReactNode }) {
  return (
    <div className="table-row-group divide-y divide-gray-200 dark:divide-neutral-700">
      {children}
    </div>
  )
}
