// src/screens/HomeScreen.tsx
import { useState } from 'react';
import FeedCard from '../FeedCard';
import PrimaryButton from '../PrimaryButton';
import { UserIcon, HomeIcon, StarIcon, PlusIcon, MapIcon } from '@heroicons/react/24/solid';

const HomeScreen: React.FC = () => {
  const [feedItems] = useState([
    {
      id: 1,
      videoUrl: '/src/media/video/vdtk001.mp4',
      userName: 'Maria Silva',
      caption: 'Minha primeira viangem com a Taki',
      location: 'Talatona',
      likes: 243,
      comments: 15
    },
    {
      id: 2,
      videoUrl: '/src/media/video/vdtk002.mp4',
      userName: 'João Santos',
      caption: 'Esse motorista sabe falar Mandarim',
      location: 'Benfica',
      likes: 187,
      comments: 9
    }
  ]);

  return (
    <div className="h-screen w-full bg-bg-900">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-bg-900 bg-opacity-70 backdrop-blur-md">
        <h1 className="text-2xl font-poppins font-bold">TAKI</h1>
        <button
          className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center"
          onClick={() => window.location.href = '/profile'}
          aria-label="Ir para o perfil"
        >
          <UserIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Feed */}
      <div className="feed-card h-full w-screen overflow-y-scroll snap-y snap-mandatory">
        {feedItems.map((item) => (
          <div key={item.id} className="h-screen snap-start">
            <FeedCard {...item} />
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-bg-800 p-4 flex justify-around items-center">
        <HomeIcon className="w-6 h-6 text-primary-500" />
        <StarIcon className="w-6 h-6 text-muted-300" />
        <div className="relative -top-6">
          <PrimaryButton className="rounded-full p-4 w-16 h-16 flex items-center justify-center">
            <PlusIcon className="w-8 h-8" />
          </PrimaryButton>
        </div>
        <MapIcon className="w-6 h-6 text-muted-300" />
        <UserIcon className="w-6 h-6 text-muted-300" />
      </div>
    </div>
  );
};

export default HomeScreen;