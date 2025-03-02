
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import GlassMorphicCard from '@/components/common/GlassMorphicCard';

interface AnalyticsCardProps {
  title: string;
  type: 'pie' | 'bar' | 'stat';
  data: any[];
  dataKey?: string;
  nameKey?: string;
  value?: number;
  label?: string;
  colors?: string[];
}

const defaultColors = ['#111827', '#374151', '#6b7280', '#9ca3af', '#d1d5db'];

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  type,
  data,
  dataKey = 'value',
  nameKey = 'name',
  value,
  label,
  colors = defaultColors
}) => {
  const renderChart = () => {
    switch (type) {
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey={dataKey}
                nameKey={nameKey}
                label={(entry) => entry[nameKey]}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [value, name]}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '0.5rem', 
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey={nameKey} 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '0.5rem', 
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                }}
              />
              <Bar dataKey={dataKey} fill={colors[0]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'stat':
        return (
          <div className="flex flex-col items-center justify-center h-36">
            <motion.div 
              className="text-4xl font-display font-bold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {value}
            </motion.div>
            {label && <p className="text-muted-foreground mt-2">{label}</p>}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <GlassMorphicCard className="h-full">
      <div className="mb-4">
        <h3 className="font-medium">{title}</h3>
      </div>
      {renderChart()}
    </GlassMorphicCard>
  );
};

export default AnalyticsCard;
