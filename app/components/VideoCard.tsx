import { ExternalLink } from 'lucide-react';

import type { SearchResult } from '@/types/youtube';

export const VideoCard = ({ video }: { video: SearchResult['videos'][0] }) => {
  const formatViews = (views: string) => {
    const num = parseInt(views);
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M views`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K views`;
    }
    return `${num} views`;
  };

  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block group overflow-hidden"
    >
      <div className="flex gap-3 p-3 rounded-lg border bg-card hover:bg-accent transition-colors">
        <div className="relative shrink-0 w-full max-w-40 h-24 rounded overflow-hidden bg-muted">
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <ExternalLink className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {video.snippet.title}
          </h4>
          <p className="text-xs text-muted-foreground mb-1 line-clamp-1">
            {video.snippet.channelTitle}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {formatViews(video.statistics.viewCount)}
          </p>
        </div>
      </div>
    </a>
  );
};
