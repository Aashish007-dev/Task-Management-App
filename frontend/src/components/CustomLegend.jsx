import React from 'react'

const CustomLegend = ({payload}) => {
  return (
    <div className='flex flex-wrap gap-2 justify-center mt-4 space-x-6'>
        {payload?.map((entry, index) => (
            <div key={`legend-${index}`} className='flex items-center space-x-2'>
                <div className={`w-2.5 h-2.5 rounded-full`} style={{backgroundColor: entry.color}} />
                <span className='text-sm text-gray-600'>{entry.value}</span>
            </div>
        ))}
    </div>
  )
}

export default CustomLegend