import { Calendar, Lightbulb, TrendingUp, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AggregatedData } from '@/types/youtube';

interface InsightsPanelProps {
  data1: AggregatedData;
  data2: AggregatedData;
}

export const InsightsPanel = ({ data1, data2 }: InsightsPanelProps) => {
  const getWinner = (val1: number, val2: number) => {
    if (val1 > val2) return data1.searchTerm;
    if (val2 > val1) return data2.searchTerm;
    return 'tied';
  };

  const engagementRate1 =
    data1.totalViews > 0 ? (data1.totalLikes / data1.totalViews) * 100 : 0;
  const engagementRate2 =
    data2.totalViews > 0 ? (data2.totalLikes / data2.totalViews) * 100 : 0;

  const insights = [
    {
      icon: TrendingUp,
      title: 'Market Size',
      description: `"${getWinner(data1.totalResults, data2.totalResults)}" has ${
        getWinner(data1.totalResults, data2.totalResults) === data1.searchTerm
          ? ((data1.totalResults / data2.totalResults - 1) * 100).toFixed(0)
          : ((data2.totalResults / data1.totalResults - 1) * 100).toFixed(0)
      }% more total videos, indicating ${
        getWinner(data1.totalResults, data2.totalResults) === 'tied'
          ? 'similar'
          : 'higher'
      } content saturation.`,
    },
    {
      icon: Users,
      title: 'Audience Interest',
      description: `"${getWinner(data1.averageViews, data2.averageViews)}" shows ${
        getWinner(data1.averageViews, data2.averageViews) === 'tied'
          ? 'similar'
          : 'stronger'
      } audience interest with ${
        getWinner(data1.averageViews, data2.averageViews) === data1.searchTerm
          ? (data1.averageViews / 1000).toFixed(1)
          : (data2.averageViews / 1000).toFixed(1)
      }K average views per video.`,
    },
    {
      icon: Lightbulb,
      title: 'Engagement Rate',
      description: `"${getWinner(engagementRate1, engagementRate2)}" has ${
        getWinner(engagementRate1, engagementRate2) === 'tied'
          ? 'similar'
          : 'better'
      } engagement with ${
        getWinner(engagementRate1, engagementRate2) === data1.searchTerm
          ? engagementRate1.toFixed(2)
          : engagementRate2.toFixed(2)
      }% like-to-view ratio.`,
    },
    {
      icon: Calendar,
      title: 'Content Freshness',
      description:
        'Review the timeline chart to identify when content performs best and spot trending periods for each topic.',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Creator Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex gap-3 pb-4 border-b last:border-0 last:pb-0"
            >
              <div className="mt-1">
                <insight.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="font-semibold text-sm">{insight.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
