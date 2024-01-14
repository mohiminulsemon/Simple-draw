import React from 'react';

function IconButton({
  icon = <i className="fa-solid fa-ghost"></i>,
  onClick = () => {},
  label = '',
  size = '14px',
  width = '30px',
  height = '30px'
}) {
  return (
    <div
      onClick={(e) => onClick(e)}
      style={{ fontSize: size, width: label ? 'auto' : width, height: height }}
      className="flex items-center p-2 rounded-md cursor-pointer
        hover:bg-indigo-100 hover:dark:bg-zinc-500 
        text-zinc-600 dark:text-zinc-100"
    >
      <div style={{ width: label ? width : '100%' }} className="flex justify-center items-center">
        {icon}
      </div>

      {label && <div className="ms-2 truncate">{label}</div>}
    </div>
  );
}

export default IconButton;
