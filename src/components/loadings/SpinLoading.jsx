import React from 'react';

function SpinLoading({ radius = '20px', circleWidth = '2px' }) {
  return (
    <div
      style={{
        width: radius,
        height: radius,
        borderWidth: circleWidth
      }}
      className="animate-spin rounded-full border-t-indigo-500 border-gray-300"
    ></div>
  );
}

export default SpinLoading;
