import React from 'react';
import { Modal } from '../elements';

const LoaderModal = () => {
  return (
    <>
      <Modal open={true} size='sm'>
        <div className='flex items-center justify-center bg-white'>
          <div className='relative my-40 h-16 w-16'>
            <div className='absolute inset-0 animate-spin rounded-full border-4 border-gray-300 border-t-primary' />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoaderModal;
