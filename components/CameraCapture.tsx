import React, { useRef, useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { CameraAlert } from './sections/auth';

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  buttonText?: string;
  imageFormat?: string;
  className?: string;
  continueButton: () => void;
  capturedImage: string | null;
  setCapturedImage: any;
  isSubmitting: boolean;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  buttonText = 'Capture Image',
  imageFormat = 'image/png',
  className = '',
  continueButton,
  capturedImage,
  setCapturedImage,
  isSubmitting,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [error, setError] = useState<string | null>(null);
  const [showPrompt, setShowPrompt] = useState(true);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setError(
        'Error accessing the camera. Please ensure you have given permission.'
      );
      console.error('Error accessing the camera:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL(imageFormat);
        setCapturedImage(imageDataUrl);
        stopCamera();
        onCapture(imageDataUrl);
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleAllowCamera = () => {
    setShowPrompt(false); // Hide the prompt
    startCamera(); // Request camera access
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <CameraAlert
        onClick={handleAllowCamera}
        open={showPrompt}
        setOpen={setShowPrompt}
      />
      {error ? (
        <p className='text-red-500'>{error}</p>
      ) : capturedImage ? (
        <>
          <img
            src={capturedImage}
            alt='Captured'
            className='w-full max-w-md rounded-md shadow-lg'
          />
          <div className='mt-4 flex gap-4'>
            <button
              onClick={handleRetake}
              className='rounded-md bg-yellow-600 px-4 py-2 text-white'
            >
              Retake
            </button>
            <button
              className='rounded-md bg-green-600 px-4 py-2 text-white disabled:opacity-45'
              onClick={continueButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verifying...' : 'Continue'}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='relative h-80 w-full overflow-hidden rounded-md'>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className='absolute inset-0 h-full w-full object-cover'
            />
            <div className='absolute inset-0 bg-black'>
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='h-56 w-40 overflow-hidden rounded-full border-2 border-green-500'>
                  <div className='relative h-full w-full'>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className='absolute inset-0 h-full w-full object-cover'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={captureImage}
            className='mt-4 rounded-md bg-blue-600 px-4 py-2 text-white'
          >
            {buttonText}
          </button>

          <canvas ref={canvasRef} className='hidden' />
        </>
      )}
    </div>
  );
};

export default CameraCapture;
