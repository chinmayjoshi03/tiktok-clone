import { Video } from '../types';
import { DUMMY_VIDEOS } from '../data/dummyVideos';

// Video service functions
export class VideoService {
  // Simulate API delay
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get all videos (simulates API call)
  static async getVideos(): Promise<Video[]> {
    await this.delay(500); // Simulate network delay
    return [...DUMMY_VIDEOS];
  }

  // Get video by ID
  static async getVideoById(id: string): Promise<Video | null> {
    await this.delay(200);
    return DUMMY_VIDEOS.find(video => video.id === id) || null;
  }

  // Like a video (simulates API call)
  static async likeVideo(videoId: string): Promise<boolean> {
    await this.delay(300);
    const video = DUMMY_VIDEOS.find(v => v.id === videoId);
    if (video) {
      video.stats.likes += 1;
      return true;
    }
    return false;
  }

  // Unlike a video (simulates API call)
  static async unlikeVideo(videoId: string): Promise<boolean> {
    await this.delay(300);
    const video = DUMMY_VIDEOS.find(v => v.id === videoId);
    if (video && video.stats.likes > 0) {
      video.stats.likes -= 1;
      return true;
    }
    return false;
  }

  // Share a video (simulates API call)
  static async shareVideo(videoId: string): Promise<boolean> {
    await this.delay(200);
    const video = DUMMY_VIDEOS.find(v => v.id === videoId);
    if (video) {
      video.stats.shares += 1;
      return true;
    }
    return false;
  }

  // Get videos by creator
  static async getVideosByCreator(username: string): Promise<Video[]> {
    await this.delay(400);
    return DUMMY_VIDEOS.filter(video => video.creator.username === username);
  }

  // Search videos by title or description
  static async searchVideos(query: string): Promise<Video[]> {
    await this.delay(600);
    const lowercaseQuery = query.toLowerCase();
    return DUMMY_VIDEOS.filter(video => 
      video.title.toLowerCase().includes(lowercaseQuery) ||
      video.description.toLowerCase().includes(lowercaseQuery)
    );
  }
}

// Export default instance for convenience
export default VideoService;