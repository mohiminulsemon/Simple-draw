import React from 'react';

function DotLoading({ scale = '100%' }) {
  return (
    <div style={{ scale: scale }} className="w-[80px]  flex justify-between items-center">
      <div className="w-[20px] h-[20px] rounded-[50%] bg-white animate-[pulse_0.4s_ease_0.1s_infinite_alternate]"></div>
      <div className="w-[20px] h-[20px] rounded-[50%] bg-white animate-[pulse_0.4s_ease_0.2s_infinite_alternate]"></div>
      <div className="w-[20px] h-[20px] rounded-[50%] bg-white animate-[pulse_0.4s_ease_0.4s_infinite_alternate]"></div>
    </div>
  );
}

export default DotLoading;
