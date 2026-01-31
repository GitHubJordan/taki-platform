// src/components/FeedCard.tsx
import { HeartIcon, ChatBubbleLeftIcon, ShareIcon } from '@heroicons/react/24/solid';

interface FeedCardProps {
  videoUrl: string;
  userName: string;
  caption: string;
  location: string;
  likes: number;
  comments: number;
}

const FeedCard: React.FC<FeedCardProps> = ({ 
  videoUrl, 
  userName, 
  caption, 
  location, 
  likes, 
  comments 
}) => {
  return (
    <div className="relative h-screen w-full">
      <video
        src={videoUrl}
        className="h-full w-full object-cover"
        loop
        muted
        autoPlay
      />
      <div className="caption absolute bottom-12 left-0 right-0 p-6 bg-gradient-to-t from-bg-900 to-transparent">
        <div className="flex items-center mb-4">
          <div className="caption-elemet">
            <div className="flex flex-row items-center justify-items-start">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <p className="font-semibold ml-4">{userName}</p>
            </div>
            <div className="flex flex-col justify-items-start">
              <p className="text-300 m-1">{caption}</p>
              <p className="text-muted-300 text-sm flex m-1">{location}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-4 bottom-1/4 flex flex-col space-y-4">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-bg-800/70 flex items-center justify-center">
            <HeartIcon className="w-6 h-6" />
          </div>
          <span className="text-sm mt-1">{likes}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-bg-800/70 flex items-center justify-center">
            <ChatBubbleLeftIcon className="w-6 h-6" />
          </div>
          <span className="text-sm mt-1">{comments}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-bg-800/70 flex items-center justify-center">
            <ShareIcon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;