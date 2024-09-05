'use client';

import { Dialog, DialogBody } from '@material-tailwind/react';
import { size } from '@material-tailwind/react/types/components/dialog';
import React, { ReactNode, useState } from 'react';

interface ModalProps {
  open: boolean;
  onClose?: any;
  openModal?: () => void;
  backgroundColor?: string;
  closeBtn?: boolean;
  children: ReactNode;
  size?: size;
  closable?: boolean;
  toggleOpen?: (isOpen: boolean) => void;
  dismiss?: boolean;
  closeClick?: any;
}

const Modal = ({
  open,
  onClose,
  children,
  size,
  closable,
  toggleOpen,
  dismiss,
  closeClick,
}: ModalProps) => {
  const [isOpen, setOpen] = useState(open);

  return (
    <>
      <Dialog
        open={toggleOpen ? open : isOpen}
        size={size ?? 'lg'}
        animate={{
          mount: { y: 0 },
          unmount: { y: 150 },
        }}
        dismiss={{ outsidePress: dismiss || false }}
        handler={
          toggleOpen ??
          ((isOpen: boolean) => {
            setOpen(isOpen);
            if (!isOpen) {
              onClose?.();
            }
          })
        }
      >
        <DialogBody>{children}</DialogBody>

        {closable && (
          <button
            className={`absolute -bottom-16 left-1/2 right-1/2 block w-32 -translate-x-1/2 rounded-full border border-white bg-white/20 px-6 py-1.5 font-bold text-white`}
            onClick={closeClick}
          >
            X close
          </button>
        )}
      </Dialog>
    </>
  );
};

export default Modal;
