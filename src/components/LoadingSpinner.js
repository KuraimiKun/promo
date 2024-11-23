import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      zIndex: 9999
    }}>
      <img 
        src="/logoWide.png" // Replace with your logo path
        alt="Loading..."
        style={{
          width: '100px', // Adjust size as needed
          height: 'auto',
          animation: 'pulse 1.2s ease-in-out infinite'
        }}
      />
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
