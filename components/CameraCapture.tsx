'use client';

import React, { useRef, useEffect, useState } from 'react';

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string) => void;
  buttonText?: string;
  imageFormat?: string; // e.g., 'image/png' or 'image/jpeg'
  className?: string; // Optional styling class for the container
  continueButton: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  buttonText = 'Capture Image',
  imageFormat = 'image/png',
  className = '',
  continueButton
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

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

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : capturedImage ? (
        <>
          <img
            src={capturedImage}
            alt="Captured"
            className="w-full max-w-md rounded-md shadow-lg"
          />
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleRetake}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md"
            >
              Retake
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md"
              onClick={continueButton}
            >
              Continue
            </button>
          </div>
        </>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-w-md rounded-md shadow-lg"
          />
          <button
            onClick={captureImage}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {buttonText}
          </button>

          <canvas ref={canvasRef} className="hidden" />
        </>
      )}
    </div>
  );
};

export default CameraCapture;
