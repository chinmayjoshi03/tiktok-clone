import { Video } from '../types';

// Extended dummy video data for a more realistic feed
export const DUMMY_VIDEOS: Video[] = [
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
  },
  {
    id: '6',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://picsum.photos/400/600?random=6',
    title: 'Fitness Challenge',
    description: 'Try this 30-second workout challenge! 💪🔥 #fitness #workout #challenge',
    creator: {
      username: 'fitnessguru',
      avatar: 'https://picsum.photos/100/100?random=6',
      verified: true
    },
    stats: {
      likes: 18200,
      comments: 312,
      shares: 156,
      views: 52000
    },
    music: {
      title: 'Pump It Up',
      artist: 'Workout Beats'
    },
    duration: 30,
    createdAt: new Date('2024-01-10T08:15:00Z')
  },
  {
    id: '7',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnail: 'https://picsum.photos/400/600?random=7',
    title: 'Comedy Skit',
    description: 'When you realize it\'s Monday again 😂 #comedy #relatable #monday',
    creator: {
      username: 'funnyguy123',
      avatar: 'https://picsum.photos/100/100?random=7',
      verified: false
    },
    stats: {
      likes: 24500,
      comments: 567,
      shares: 234,
      views: 89000
    },
    duration: 20,
    createdAt: new Date('2024-01-09T16:45:00Z')
  },
  {
    id: '8',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnail: 'https://picsum.photos/400/600?random=8',
    title: 'Art Tutorial',
    description: 'Learn to draw realistic eyes in 60 seconds! ✏️👁️ #art #tutorial #drawing',
    creator: {
      username: 'artista_pro',
      avatar: 'https://picsum.photos/100/100?random=8',
      verified: true
    },
    stats: {
      likes: 13400,
      comments: 289,
      shares: 178,
      views: 41000
    },
    music: {
      title: 'Creative Inspiration',
      artist: 'Art Sounds'
    },
    duration: 60,
    createdAt: new Date('2024-01-08T12:20:00Z')
  },
  {
    id: '9',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    thumbnail: 'https://picsum.photos/400/600?random=9',
    title: 'Life Hack',
    description: 'This simple trick will save you so much time! ⏰✨ #lifehack #productivity #tips',
    creator: {
      username: 'lifehacker_pro',
      avatar: 'https://picsum.photos/100/100?random=9',
      verified: false
    },
    stats: {
      likes: 16800,
      comments: 423,
      shares: 267,
      views: 63000
    },
    duration: 25,
    createdAt: new Date('2024-01-07T14:30:00Z')
  },
  {
    id: '10',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    thumbnail: 'https://picsum.photos/400/600?random=10',
    title: 'Fashion Trend',
    description: 'This outfit combo is everything! 👗✨ #fashion #ootd #style #trending',
    creator: {
      username: 'fashionista_daily',
      avatar: 'https://picsum.photos/100/100?random=10',
      verified: true
    },
    stats: {
      likes: 21300,
      comments: 445,
      shares: 189,
      views: 78000
    },
    music: {
      title: 'Runway Vibes',
      artist: 'Fashion Beats'
    },
    duration: 18,
    createdAt: new Date('2024-01-06T11:45:00Z')
  },
  {
    id: '11',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4',
    thumbnail: 'https://picsum.photos/400/600?random=11',
    title: 'Tech Review',
    description: 'Is this gadget worth the hype? Let\'s find out! 📱⚡ #tech #review #gadgets',
    creator: {
      username: 'tech_reviewer',
      avatar: 'https://picsum.photos/100/100?random=11',
      verified: true
    },
    stats: {
      likes: 19700,
      comments: 356,
      shares: 198,
      views: 71000
    },
    duration: 45,
    createdAt: new Date('2024-01-05T09:30:00Z')
  },
  {
    id: '12',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    thumbnail: 'https://picsum.photos/400/600?random=12',
    title: 'Music Cover',
    description: 'Acoustic cover of trending song 🎸🎵 #music #cover #acoustic #singing',
    creator: {
      username: 'acoustic_soul',
      avatar: 'https://picsum.photos/100/100?random=12',
      verified: false
    },
    stats: {
      likes: 27800,
      comments: 612,
      shares: 345,
      views: 95000
    },
    music: {
      title: 'Trending Hit Cover',
      artist: 'Acoustic Soul'
    },
    duration: 35,
    createdAt: new Date('2024-01-04T18:20:00Z')
  }
];