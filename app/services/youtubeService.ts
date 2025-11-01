import { API_ENDPOINTS, YOUTUBE_API_KEY } from 'app/config/youtube';
import type { AggregatedData, SearchResult, Video } from 'app/types/youtube';

export class YouTubeService {
  private apiKey: string;

  constructor(apiKey: string = YOUTUBE_API_KEY) {
    this.apiKey = apiKey;
  }

  async searchVideos(searchTerm: string): Promise<SearchResult> {
    const searchUrl = new URL(API_ENDPOINTS.search);
    searchUrl.searchParams.append('part', 'id');
    searchUrl.searchParams.append('q', searchTerm);
    searchUrl.searchParams.append('type', 'video');
    searchUrl.searchParams.append('maxResults', '50');
    searchUrl.searchParams.append('order', 'relevance');
    searchUrl.searchParams.append('key', this.apiKey);

    const response = await fetch(searchUrl.toString());

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to search videos');
    }

    const data = await response.json();
    const videoIds = data.items.map((item: any) => item.id.videoId);
    const totalResults = data.pageInfo?.totalResults || 0;

    // Fetch detailed video information
    const videos = await this.getVideoDetails(videoIds);

    return {
      totalResults,
      videos,
    };
  }

  async getVideoDetails(videoIds: string[]): Promise<Video[]> {
    if (videoIds.length === 0) return [];

    const videosUrl = new URL(API_ENDPOINTS.videos);
    videosUrl.searchParams.append('part', 'statistics,snippet');
    videosUrl.searchParams.append('id', videoIds.join(','));
    videosUrl.searchParams.append('key', this.apiKey);

    const response = await fetch(videosUrl.toString());

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to fetch video details');
    }

    const data = await response.json();
    return data.items;
  }

  aggregateVideoData(
    searchTerm: string,
    searchResult: SearchResult
  ): AggregatedData {
    const { videos, totalResults } = searchResult;

    const totalViews = videos.reduce(
      (sum, video) => sum + parseInt(video.statistics.viewCount || '0'),
      0
    );

    const totalLikes = videos.reduce(
      (sum, video) => sum + parseInt(video.statistics.likeCount || '0'),
      0
    );

    const averageViews = videos.length > 0 ? totalViews / videos.length : 0;
    const averageLikes = videos.length > 0 ? totalLikes / videos.length : 0;

    const videosOverTime = videos
      .map((video) => ({
        date: video.snippet.publishedAt,
        viewCount: parseInt(video.statistics.viewCount || '0'),
        title: video.snippet.title,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      searchTerm,
      totalResults,
      totalViews,
      averageViews,
      totalLikes,
      averageLikes,
      videosOverTime,
    };
  }

  async compareTopics(term1: string, term2: string) {
    const [result1, result2] = await Promise.all([
      this.searchVideos(term1),
      this.searchVideos(term2),
    ]);

    return {
      term1: this.aggregateVideoData(term1, result1),
      term2: this.aggregateVideoData(term2, result2),
    };
  }
}

export const youtubeService = new YouTubeService();
