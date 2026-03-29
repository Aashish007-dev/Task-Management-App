import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend,ResponsiveContainer } from 'recharts';
import CustomToolTip from './CustomToolTip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({data, colors}) => {
  return (
    <ResponsiveContainer width={"100%"} height={325}>
      <PieChart>
        <Pie data={data} cx={"50%"} cy={"50%"} labelLine={false} outerRadius={130} innerRadius={100} fill='#8884d8' dataKey="count" nameKey="status">
            {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
        </Pie>
        <Tooltip content={<CustomToolTip />} />
        <Legend  content={<CustomLegend />}/>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart