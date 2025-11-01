export interface VideoStatistics {
  viewCount: string;
  likeCount: string;
  commentCount: string;
}

export interface VideoSnippet {
  publishedAt: string;
  title: string;
  description: string;
  channelTitle: string;
  thumbnails: { medium: { url: string } };
}

export interface Video {
  id: string;
  statistics: VideoStatistics;
  snippet: VideoSnippet;
}

export interface SearchResult {
  totalResults: number;
  videos: Video[];
}

export interface AggregatedData {
  searchTerm: string;
  totalResults: number;
  totalViews: number;
  averageViews: number;
  totalLikes: number;
  averageLikes: number;
  videosOverTime: {
    date: string;
    viewCount: number;
    title: string;
  }[];
}

export interface ComparisonData {
  term1: AggregatedData;
  term2: AggregatedData;
}
