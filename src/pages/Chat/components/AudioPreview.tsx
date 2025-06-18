import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { Avatar } from '../../../reuseables/Avatar';

interface AudioPreviewProps {
  audioBlob: Blob;
  onSend: () => void;
}

export const AudioPreview: React.FC<AudioPreviewProps> = ({
  audioBlob,
  onSend,
}) => (
  <div className='flex items-start gap-3 mb-4 flex-row-reverse'>
    <Avatar isUser={true} />
    <div className='flex items-center gap-2 w-fit bg-[#007b83] rounded-lg p-1'>
      <audio
        controls
        src={URL.createObjectURL(audioBlob)}
        className='max-w-[180px]'
      />
      <button
        onClick={onSend}
        className='p-2 text-white bg-cyan-600 rounded-full hover:bg-cyan-700 cursor-pointer'
      >
        <FaPaperPlane />
      </button>
    </div>
  </div>
);
