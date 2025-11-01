import { Video as VideoIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { AggregatedData } from '@/types/youtube';
import type { SearchResult } from '@/types/youtube';

import { VideoCard } from './VideoCard';

interface VideosListProps {
  data1: AggregatedData;
  data2: AggregatedData;
  videos1: SearchResult['videos'];
  videos2: SearchResult['videos'];
}

export const VideosList = ({
  data1,
  data2,
  videos1,
  videos2,
}: VideosListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <VideoIcon className="h-5 w-5 text-primary" />
          Videos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg mb-4 border-b">
              {data1.searchTerm}
            </h3>
            <div className="space-y-2 max-h-52 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:rounded-full">
              {videos1.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-lg mb-4 border-b">
              {data2.searchTerm}
            </h3>
            <div className="space-y-2 max-h-52 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:rounded-full">
              {videos2.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
