import { Sparkles, Youtube } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { InsightsPanel } from '@/components/InsightsPanel';
import { MetricsComparison } from '@/components/MetricsComparison';
import { SearchInputs } from '@/components/SearchInputs';
import { TimelineChart } from '@/components/TimelineChart';
import { VideosList } from '@/components/VideosList';
import { youtubeService } from '@/services/youtubeService';
import type { ComparisonData, SearchResult } from '@/types/youtube';

const Index = () => {
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(
    null
  );
  const [videoData, setVideoData] = useState<{
    videos1: SearchResult['videos'];
    videos2: SearchResult['videos'];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = async (term1: string, term2: string) => {
    setIsLoading(true);
    try {
      const [result1, result2] = await Promise.all([
        youtubeService.searchVideos(term1),
        youtubeService.searchVideos(term2),
      ]);

      const data = {
        term1: youtubeService.aggregateVideoData(term1, result1),
        term2: youtubeService.aggregateVideoData(term2, result2),
      };

      setComparisonData(data);
      setVideoData({ videos1: result1.videos, videos2: result2.videos });

      toast.success('Comparison data loaded successfully!');
    } catch (error) {
      toast('Failed to fetch data. Please check your API key.');
      console.error('Comparison error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Youtube className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">YouTube Topic Compass</h1>
              <p className="text-sm text-muted-foreground">
                Compare YouTube topics to make data-driven content decisions
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="bg-card rounded-lg border p-6">
          <SearchInputs onCompare={handleCompare} isLoading={isLoading} />
        </div>

        {comparisonData && videoData && (
          <>
            <MetricsComparison
              data1={comparisonData.term1}
              data2={comparisonData.term2}
            />
            <TimelineChart
              data1={comparisonData.term1}
              data2={comparisonData.term2}
            />
            <InsightsPanel
              data1={comparisonData.term1}
              data2={comparisonData.term2}
            />
            <VideosList
              data1={comparisonData.term1}
              data2={comparisonData.term2}
              videos1={videoData.videos1}
              videos2={videoData.videos2}
            />
          </>
        )}

        {!comparisonData && !isLoading && (
          <div className="text-center py-16 space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-6">
                <Sparkles className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">
                Ready to Compare Topics?
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Enter two YouTube topics above to get comprehensive analytics on
                audience interest, engagement, and content trends.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
