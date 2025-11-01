import { Eye, ThumbsUp, TrendingUp, Video } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AggregatedData } from '@/types/youtube';

interface MetricsComparisonProps {
  data1: AggregatedData;
  data2: AggregatedData;
}

export const MetricsComparison = ({ data1, data2 }: MetricsComparisonProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toFixed(0);
  };

  const MetricCard = ({
    title,
    value1,
    value2,
    label1,
    label2,
    icon: Icon,
  }: {
    title: string;
    value1: number;
    value2: number;
    label1: string;
    label2: string;
    icon: any;
  }) => {
    const winner = value1 > value2 ? 1 : value1 < value2 ? 2 : 0;

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Icon className="h-5 w-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`space-y-1 ${winner === 1 ? 'text-primary font-semibold' : ''}`}
            >
              <p className="text-sm text-muted-foreground">{label1}</p>
              <p className="text-2xl font-bold">{formatNumber(value1)}</p>
            </div>
            <div
              className={`space-y-1 ${winner === 2 ? 'text-primary font-semibold' : ''}`}
            >
              <p className="text-sm text-muted-foreground">{label2}</p>
              <p className="text-2xl font-bold">{formatNumber(value2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Total Videos"
        value1={data1.totalResults}
        value2={data2.totalResults}
        label1={data1.searchTerm}
        label2={data2.searchTerm}
        icon={Video}
      />
      <MetricCard
        title="Total Views"
        value1={data1.totalViews}
        value2={data2.totalViews}
        label1={data1.searchTerm}
        label2={data2.searchTerm}
        icon={Eye}
      />
      <MetricCard
        title="Avg. Views"
        value1={data1.averageViews}
        value2={data2.averageViews}
        label1={data1.searchTerm}
        label2={data2.searchTerm}
        icon={TrendingUp}
      />
      <MetricCard
        title="Avg. Likes"
        value1={data1.averageLikes}
        value2={data2.averageLikes}
        label1={data1.searchTerm}
        label2={data2.searchTerm}
        icon={ThumbsUp}
      />
    </div>
  );
};
