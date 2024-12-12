export const WIDTH_MAPPER = {
  'id': 48,
  'url': 300,
  'created_at': 240,
  'updated_at': 240,
  'retailer_name': 200,
  'desc_short': 320,
  'sector': 200,
  'type': 200,
  'location': 320,
  'city': 160,
  'state': 100,
  'country': 88,
  'other_columns': 300,
  'action': 160,
}

const HEADERS: { text: string, value: string, width: number }[] = [
  { text: 'URL', value: 'url', width: WIDTH_MAPPER['url'] },
  { text: 'Created at', value: 'created_at', width: WIDTH_MAPPER['created_at'] },
  { text: 'Updated at', value: 'updated_at', width: WIDTH_MAPPER['updated_at'] },
  { text: 'Retailer name', value: 'retailer_name', width: WIDTH_MAPPER['retailer_name']},
  { text: 'Description (short)', value: 'desc_short', width: WIDTH_MAPPER['desc_short']},
  { text: 'Sector', value: 'sector', width: WIDTH_MAPPER['sector']},
  { text: 'Type', value: 'type', width: WIDTH_MAPPER['type']},
  { text: 'Location', value: 'location', width: WIDTH_MAPPER['location']},
  { text: 'City', value: 'city', width: WIDTH_MAPPER['city']},
  { text: 'State', value: 'state', width: WIDTH_MAPPER['state']},
  { text: 'Country', value: 'country', width: WIDTH_MAPPER['country']},
  { text: 'Other columns', value: 'other_columns', width: WIDTH_MAPPER['other_columns']},
]

export default function ClueTableHeader({
  selectAll,
  onChangeSelectAll
}: {
  selectAll: boolean
  onChangeSelectAll: (selectAll: boolean) => void
}) {
  return (
    <div className="bg-gray-50">
      <div className="flex">
        <div className="py-3 px-4 flex-none">
          <div className="h-5">
            <input
              type="checkbox"
              className="border-gray-200 rounded text-blue-600 focus:ring-blue-500"
              checked={selectAll}
              onChange={(e) => onChangeSelectAll(e.target.checked)}
            />
          </div>
        </div>
        <div
          className="flex flex-none items-center py-3 text-start text-xs font-medium text-gray-500 capitalize"
          style={{width: WIDTH_MAPPER['id']}}
        >
          ID
        </div>
        {HEADERS.map(header => {
          return (
            <div
              key={header.value}
              className="flex flex-none items-center px-6 py-3 text-start text-xs font-medium text-gray-500 capitalize"
              style={{width: header.width}}
            >
              {header.text}
            </div>
          )
        })}
        <div
          className="flex flex-none items-center px-6 py-3 text-end text-xs font-medium text-gray-500"
          style={{width: 160}}
        >
          Action
        </div>
      </div>
    </div>
  )
}
