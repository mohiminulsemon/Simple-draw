import React from 'react';

function CanvasMenuButton({
  onMouseEnter = () => {},
  onClick = () => {},
  seleted = false,
  label = 'label'
}) {
  return (
    <button
      onClick={() => onClick()}
      onMouseEnter={() => onMouseEnter()}
      className={
        (seleted && 'bg-indigo-100 dark:bg-zinc-800') +
        ' py-1 px-2 hover:bg-indigo-100 hover:dark:bg-zinc-800 rounded-[4px]'
      }
    >
      {label}
    </button>
  );
}

export default CanvasMenuButton;
