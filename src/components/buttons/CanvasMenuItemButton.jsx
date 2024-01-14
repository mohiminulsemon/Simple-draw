import React from 'react';

function CanvasMenuItemButton({ leftLable = 'lable', rightLable = '', onClick = () => {} }) {
  return (
    <div
      onClick={() => onClick()}
      className="py-2 px-5 flex justify-between cursor-pointer items-center
      hover:dark:bg-zinc-600 hover:bg-indigo-100"
    >
      <div>{leftLable}</div>
      <div className="text-zinc-400 text-xs">{rightLable}</div>
    </div>
  );
}

export default CanvasMenuItemButton;
