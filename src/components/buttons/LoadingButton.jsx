import React from 'react';
import DotLoading from '../loadings/DotLoading';

function LoadingButton({ label = 'button', onClick = () => {}, isLoading = false }) {
  return (
    <button
      onClick={(e) => onClick(e)}
      className="w-full h-[40px] 
        flex justify-center items-center
        bg-indigo-400 rounded-md text-lg font-semibold text-white
        hover:bg-indigo-500 hover:shadow-md cursor-pointer"
    >
      {isLoading ? <DotLoading scale="50%" /> : <div>{label}</div>}
    </button>
  );
}

export default LoadingButton;
