import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import axiosInstance from '../tokenManagement/axiosInstance';

const InsightsSection = ({
    colors = ['#B3A7DE', '#4B4FA8','#A272BE','#C5B4E3', '#5E62B6'],
  innerRadius = 50,
  outerRadius = 100,
  showLabels = true,
  showAddForm,
  showEditForm,
  showDeleteForm
}) => {

        const [stats,setStats] = useState([]);

    const getData = async () => {
        try {
            
            const response = await axiosInstance.get(`/expense/stats`);
            const data = await response.data;
            setStats(data.categoryStats);
            console.log(data.categoryStats); 

        } catch (error) {
            console.log("Error" ,error);
        }
    }

    useEffect(() => {
        getData();
    },[showAddForm,showEditForm,showDeleteForm])
  return (
    <div className="w-full h-[400px] bg-[#f6f4fd] rounded-lg p-6 text-start"> 
    <h2 className="text-xl font-semibold mb-2 text-gray-800">
        Category Distribution
      </h2>
    <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={stats}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            dataKey="value"
            paddingAngle={2}
          >
            {stats.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                className="focus:outline-none"
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}`, name]}
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.8)',
              border: '1px solid rgba(0,0,0,0.8)',
              borderRadius: '4px',
              padding: '8px',
              color: '#fff'
            }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          {showLabels && (
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              formatter={(value, entry, index) => (
                <span className="text-sm text-gray-600">
                  {value}: {stats[index].percentage}
                </span>
              )}
              wrapperStyle={{
                paddingLeft: '20px'
              }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default InsightsSection
