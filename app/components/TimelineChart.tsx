import { format } from 'date-fns';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { AggregatedData } from '@/types/youtube';

interface TimelineChartProps {
  data1: AggregatedData;
  data2: AggregatedData;
}

export const TimelineChart = ({ data1, data2 }: TimelineChartProps) => {
  // Combine and sort all videos by date
  const combinedData = [
    ...data1.videosOverTime.map((v) => ({
      date: new Date(v.date).getTime(),
      dateStr: v.date,
      [data1.searchTerm]: v.viewCount,
      title1: v.title,
    })),
    ...data2.videosOverTime.map((v) => ({
      date: new Date(v.date).getTime(),
      dateStr: v.date,
      [data2.searchTerm]: v.viewCount,
      title2: v.title,
    })),
  ].sort((a, b) => a.date - b.date);

  // Group by month for cleaner visualization
  const monthlyData = combinedData.reduce(
    (acc, curr) => {
      const monthKey = format(new Date(curr.date), 'yyyy-MM');
      if (!acc[monthKey]) {
        acc[monthKey] = {
          month: monthKey,
          date: curr.date,
          [data1.searchTerm]: 0,
          [data2.searchTerm]: 0,
          count1: 0,
          count2: 0,
        };
      }
      if (curr[data1.searchTerm]) {
        acc[monthKey][data1.searchTerm] += curr[data1.searchTerm];
        acc[monthKey].count1++;
      }
      if (curr[data2.searchTerm]) {
        acc[monthKey][data2.searchTerm] += curr[data2.searchTerm];
        acc[monthKey].count2++;
      }
      return acc;
    },
    {} as Record<string, any>
  );

  // Calculate averages and format for chart
  const chartData = Object.values(monthlyData).map((item: any) => ({
    month: format(new Date(item.date), 'MMM yyyy'),
    [data1.searchTerm]:
      item.count1 > 0 ? Math.round(item[data1.searchTerm] / item.count1) : 0,
    [data2.searchTerm]:
      item.count2 > 0 ? Math.round(item[data2.searchTerm] / item.count2) : 0,
  }));

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toString();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Video Popularity Over Time</CardTitle>
        <CardDescription>
          Average views per video by month for top 50 results
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis
              tickFormatter={formatYAxis}
              className="text-xs"
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [formatYAxis(value), 'Avg. Views']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={data1.searchTerm}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))' }}
            />
            <Line
              type="monotone"
              dataKey={data2.searchTerm}
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--secondary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
