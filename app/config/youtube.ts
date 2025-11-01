// YouTube API Configuration
// To use your own API key, update the YOUTUBE_API_KEY constant below
// Get your API key from: https://console.cloud.google.com/apis/credentials

export const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';

export const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const API_ENDPOINTS = {
  search: `${YOUTUBE_API_BASE_URL}/search`,
  videos: `${YOUTUBE_API_BASE_URL}/videos`,
};
