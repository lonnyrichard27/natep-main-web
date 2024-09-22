import { CustomButton, Modal } from '@/components/elements';
import { PermissionImg } from '@/public/assets/images';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const CameraAlert = ({
  onClick,
  open,
  setOpen,
}: {
  onClick: any;
  open: boolean;
  setOpen: any;
}) => {
  const { back } = useRouter();

  return (
    <>
      <Modal
        open={open}
        size='xs'
        toggleOpen={(isOpen: boolean | ((prevState: boolean) => boolean)) =>
          setOpen(isOpen)
        }
        closeClick={back}
        closable
      >
        <div className='flex flex-col gap-8 px-2 py-3'>
          <div>
            <Image src={PermissionImg} alt='permission image' />
          </div>

          <div className='text-black'>
            <h2 className='mb-2 text-lg font-semibold'>Allow Camera</h2>
            <p className='text-sm text-[#313642]'>
              We need access to your phone camera to scan any code. You can edit
              access in your phone settings.
            </p>
          </div>

          <CustomButton
            text='Allow Access'
            onClick={onClick}
            className='w-full font-medium'
          />
        </div>
      </Modal>
    </>
  );
};

export default CameraAlert;
