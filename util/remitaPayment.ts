import toast from 'react-hot-toast';

// Extend the Window interface
declare global {
  interface Window {
    RmPaymentEngine: any;
  }
}

const remita_key: any = process.env.REMITA_KEY;
const remita_script: any = process.env.REMITA_SCRIPT_URL;

export const remitaPayment = async ({
  rrr,
  transactionId,
  callbackURL,
}: {
  rrr: string;
  transactionId: string;
  callbackURL: string;
}) => {
  console.log(remita_script, remita_key);
  // Load Remita script
  const loadRemitaScript = () => {
    return new Promise((resolve, reject) => {
      // Check if the script is already loaded
      if (document.getElementById('remita-script')) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.id = 'remita-script'; // Give the script an ID to avoid loading it multiple times
      script.src = remita_script; // Ensure this is correct
      script.async = true;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        reject(new Error('Remita payment script failed to load.'));
        toast.error('Remita payment script failed to load.');
      };

      document.body.appendChild(script);
    });
  };

  try {
    await loadRemitaScript();

    // Ensure the RmPaymentEngine exists after the script is loaded
    if (window.RmPaymentEngine) {
      const paymentEngine = window.RmPaymentEngine.init({
        key: remita_key,
        processRrr: true,
        transactionId: transactionId,
        extendedData: {
          customFields: [
            {
              name: 'rrr',
              value: rrr,
            },
          ],
        },
        onSuccess: (res: any) => {
          window.open(`${callbackURL}?rrr=${rrr}&txref=${res?.transactionId}`);
        },
        onError: (response: any) => {
          console.log('Payment Error', response);
          toast.error('Payment failed. Please try again.');
        },
        onClose: () => {
          console.log('Payment widget closed');
        },
      });

      paymentEngine.showPaymentWidget();
    } else {
      console.error('RmPaymentEngine not available after script load.');
      toast.error('Remita Payment Engine is unavailable.');
    }
  } catch (error) {
    console.error('Remita script loading error:', error);
    toast.error('An error occurred while loading the payment gateway.');
  }
};
