// components/VideoModal.jsx
import { X } from "lucide-react";

const VideoModal = ({ setShowVideoModal }) => {
  return (
    <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4">
      {/* EXACT SAME JSX */}

      {showVideoModal && (
        <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4">
          <button onClick={() => setShowVideoModal(false)} className="absolute top-6 right-6 text-white hover:text-emerald-500 transition-colors">
            <X size={32} />
          </button>
          <div className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative">
             <div className="absolute inset-0 flex items-center justify-center text-white">
               <div className="text-center">
                 <p className="text-xl font-bold mb-4">Video Placeholder</p>
                 <p className="text-gray-400">In a production build, this would load a YouTube/Vimeo embed.</p>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoModal;
