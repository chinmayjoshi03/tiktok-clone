import { Video } from '../types';

export const dummyVideos: Video[] = [
  {
    id: '1',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://picsum.photos/400/600?random=1',
    title: 'Amazing Dance Moves',
    description: 'Check out these incredible dance moves! 🕺💃 #dance #viral #fyp',
    creator: {
      username: 'dancequeen23',
      avatar: 'https://picsum.photos/100/100?random=1',
      verified: true
    },
    stats: {
      likes: 12500,
      comments: 234,
      shares: 89,
      views: 45000
    },
    music: {
      title: 'Upbeat Dance Track',
      artist: 'DJ Awesome'
    },
    duration: 15,
    createdAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: '2',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://picsum.photos/400/600?random=2',
    title: 'Cooking Hack',
    description: 'This cooking trick will blow your mind! 🍳✨ #cooking #lifehack #food',
    creator: {
      username: 'chefmaster',
      avatar: 'https://picsum.photos/100/100?random=2',
      verified: false
    },
    stats: {
      likes: 8900,
      comments: 156,
      shares: 67,
      views: 23000
    },
    music: {
      title: 'Kitchen Vibes',
      artist: 'Cooking Beats'
    },
    duration: 22,
    createdAt: new Date('2024-01-14T15:45:00Z')
  },
  {
    id: '3',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://picsum.photos/400/600?random=3',
    title: 'Pet Tricks',
    description: 'My dog learned the coolest trick! 🐕❤️ #pets #dogs #cute #animals',
    creator: {
      username: 'petlover99',
      avatar: 'https://picsum.photos/100/100?random=3',
      verified: false
    },
    stats: {
      likes: 15600,
      comments: 445,
      shares: 123,
      views: 67000
    },
    duration: 18,
    createdAt: new Date('2024-01-13T09:20:00Z')
  },
  {
    id: '4',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://picsum.photos/400/600?random=4',
    title: 'Travel Vlog',
    description: 'Exploring hidden gems in the city! 🌆✈️ #travel #explore #adventure',
    creator: {
      username: 'wanderlust_sarah',
      avatar: 'https://picsum.photos/100/100?random=4',
      verified: true
    },
    stats: {
      likes: 9800,
      comments: 189,
      shares: 95,
      views: 34000
    },
    music: {
      title: 'Adventure Awaits',
      artist: 'Travel Tunes'
    },
    duration: 28,
    createdAt: new Date('2024-01-12T14:15:00Z')
  },
  {
    id: '5',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://picsum.photos/400/600?random=5',
    title: 'DIY Craft',
    description: 'Easy DIY project you can do at home! 🎨✂️ #diy #craft #creative',
    creator: {
      username: 'crafty_hands',
      avatar: 'https://picsum.photos/100/100?random=5',
      verified: false
    },
    stats: {
      likes: 6700,
      comments: 98,
      shares: 45,
      views: 18000
    },
    music: {
      title: 'Creative Flow',
      artist: 'Artsy Beats'
    },
    duration: 25,
    createdAt: new Date('2024-01-11T11:30:00Z')
  }
];