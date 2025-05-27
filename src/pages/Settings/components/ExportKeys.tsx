import React, { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface SecuritySectionProps {
  setActiveModal: (modal: string) => void;
  setPrivateKey: (key: string) => void;
}

export const ExportKeys: React.FC<SecuritySectionProps> = ({
  setActiveModal,
  setPrivateKey,
}) => {
  const [exportPassword, setExportPassword] = useState<string>('');

  const handleExportKeys = () => {
    console.log('Exporting keys with password:', exportPassword);
    setPrivateKey('mock-private-key-xyz123');
    setActiveModal('privateKey');
    setExportPassword('');
  };

  return (
    <div className='w-full max-w-xl mx-auto bg-white p-6 rounded-xl shadow-sm'>
      <h2 className='text-lg font-semibold text-gray-800 mb-6'>Security</h2>
      <div className='space-y-4'>
        <div className='flex items-center gap-3'>
          <div className='w-6 h-6 rounded-full bg-[#007b83] flex items-center justify-center'>
            <FaCheckCircle className='w-4 h-4 text-white' />
          </div>
          <span className='text-gray-700'>Export Private Key</span>
        </div>
        <div>
          <p className='text-sm text-gray-600 mb-2'>
            Enter your password to export your private key
          </p>
          <div className='flex flex-col sm:flex-row sm:gap-3 space-y-3 sm:space-y-0'>
            <input
              type='password'
              value={exportPassword}
              onChange={(e) => setExportPassword(e.target.value)}
              className='w-full sm:flex-1 h-12 px-4 rounded-lg border border-gray-200 focus:border-[#007b83] focus:ring-2 focus:ring-[#007b83]/20 outline-none'
              placeholder='Your password'
            />
            <button
              onClick={handleExportKeys}
              disabled={!exportPassword}
              className='w-full sm:w-auto px-4 h-12 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-lg transition-colors'
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
