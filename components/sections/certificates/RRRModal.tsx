import { CustomButton, Modal } from '@/components/elements';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { moneyFormat } from '@/util/helpers';
import { remitaPayment } from '@/util/remitaPayment';
import { useState } from 'react';
import { PiCopy } from 'react-icons/pi';

const RRRModal = ({
  closeClick,
  open,
  setOpen,
  txnDetails,
  callbackURL = DashboardRoutes.VIEW_CERTIFICATES,
}: {
  closeClick: any;
  open: boolean;
  setOpen: any;
  txnDetails: { rrr: string; txref: string; amount: number };
  callbackURL?: string;
}) => {
  const [loadRemita, setLoadRemita] = useState(false);

  const handleRemita = () => {
    setLoadRemita(true);
    remitaPayment({
      rrr: txnDetails.rrr,
      transactionId: txnDetails.txref,
      callbackURL,
      closeClick,
    });
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Error copying text: ', err);
    }
  };

  return (
    <>
      <Modal
        open={open}
        size='xs'
        toggleOpen={(isOpen: boolean | ((prevState: boolean) => boolean)) =>
          setOpen(isOpen)
        }
        closeClick={closeClick}
        closable
      >
        <div className='flex flex-col gap-8 px-2 py-3'>
          {/* <div>
            <Image src={PermissionImg} alt='permission image' />
          </div> */}

          <div className='flex flex-col gap-2 text-black'>
            <h2 className='mb-2 text-lg font-semibold'>Confirmation</h2>
            <p className='text-sm text-[#313642]'>
              You are about to make a payment of N
              {moneyFormat(txnDetails?.amount)} for your NATEP certificate
              enrollment appointment.
            </p>

            <div className='flex items-center justify-between text-sm'>
              <p>
                RRR:&nbsp;
                <span className='font-semibold'>{txnDetails.rrr || 'N/A'}</span>
              </p>

              <button onClick={() => copyText(txnDetails.rrr)}>
                <PiCopy className='text-xl text-primary' />
              </button>
            </div>
          </div>

          <CustomButton
            text='Continue Payment'
            onClick={handleRemita}
            className='w-full font-medium'
            disabled={loadRemita}
          />
        </div>
      </Modal>
    </>
  );
};

export default RRRModal;
