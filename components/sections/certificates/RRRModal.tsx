import { CustomButton, Modal } from '@/components/elements';
import { DashboardRoutes } from '@/components/Navigation/Routes';
import { copyText } from '@/util/helpers';
import { remitaPayment } from '@/util/remitaPayment';
import { PiCopy } from 'react-icons/pi';

const RRRModal = ({
  closeClick,
  open,
  setOpen,
  txnDetails,
}: {
  closeClick: any;
  open: boolean;
  setOpen: any;
  txnDetails: { rrr: string; txref: string };
}) => {
  const handleRemita = () => {
    remitaPayment({
      rrr: txnDetails.rrr,
      transactionId: txnDetails.txref,
      callbackURL: DashboardRoutes.VIEW_CERTIFICATES,
    });
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
              You are about to make a payment of N65,000 for your NATEP
              certificate enrollment appointment.
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
          />
        </div>
      </Modal>
    </>
  );
};

export default RRRModal;
