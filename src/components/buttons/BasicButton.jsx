import React from 'react';

function BasicButton({ label = 'button', onClick = () => {} }) {
  return (
    <div
      onClick={(e) => onClick(e)}
      className="w-full h-[40px] 
        flex justify-center items-center
        bg-indigo-400 rounded-md text-lg font-semibold text-white
        hover:bg-indigo-500 hover:shadow-md cursor-pointer"
    >
      {label}
    </div>
  );
}

export default BasicButton;
