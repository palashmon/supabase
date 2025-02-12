import { FC } from 'react'
import { IconChevronRight } from '@supabase/ui'
import { isNull } from 'lodash'
import { Dictionary } from '@supabase/grid'

interface Props {
  pane: number
  jsonData: Dictionary<any>
  activeKey?: string
  onSelectKey: (key: string, pane: number) => void
}

const DrilldownPane: FC<Props> = ({ pane, jsonData, activeKey, onSelectKey = () => {} }) => {
  if (!jsonData) {
    return (
      <div className={`flex-1 ${pane === 2 ? 'border-l border-gray-500' : ''}`}>
        <div className="py-2 px-5 flex space-x-2">
          <p className="text-sm">Invalid JSON</p>
        </div>
      </div>
    )
  }

  if (Object.keys(jsonData).length === 0) {
    return (
      <div className={`flex-1 max-w-[50%] ${pane === 2 ? 'border-l border-gray-500' : ''}`}>
        <div className="py-2 px-5 flex space-x-2">
          <p className="opacity-50 text-sm">No data available</p>
        </div>
      </div>
    )
  }

  const keysWithChildren = Object.keys(jsonData).filter(
    (key: string) => typeof jsonData[key] === 'object' && !isNull(jsonData[key])
  )

  const keysWithoutChildren = Object.keys(jsonData).filter(
    (key: string) => isNull(jsonData[key]) || typeof jsonData[key] !== 'object'
  )

  return (
    <div className={`flex-1 max-w-[50%] ${pane === 2 ? 'border-l border-gray-500' : ''}`}>
      {keysWithChildren.map((key: string) => (
        <div
          key={key}
          className={`
              ${key === activeKey ? 'bg-gray-100 dark:bg-gray-400' : ''}
              group flex items-center justify-between
              cursor-pointer py-2 px-5 hover:bg-gray-100 dark:hover:bg-gray-500
            `}
          onClick={() => onSelectKey(key, pane)}
        >
          <p className="text-xs font-mono !text-blue-700 dark:!text-blue-1100">{key}</p>
          <div className={`${key === activeKey ? 'block' : 'hidden'} group-hover:block`}>
            <IconChevronRight strokeWidth={2} size={16} />
          </div>
        </div>
      ))}
      {keysWithoutChildren.map((key: string) => (
        <div key={key} className="py-2 px-5 flex space-x-2">
          <p className="text-xs font-mono !text-blue-700 dark:!text-blue-1100">{key}:</p>
          <p
            className={`text-xs font-mono break-all ${
              typeof jsonData[key] !== 'string'
                ? '!text-green-700 dark:!text-green-1000'
                : '!text-yellow-700 dark:!text-yellow-900'
            }`}
          >
            {isNull(jsonData[key])
              ? 'null'
              : typeof jsonData[key] === 'string'
              ? `"${jsonData[key]}"`
              : jsonData[key].toString()}
          </p>
        </div>
      ))}
    </div>
  )
}

export default DrilldownPane
