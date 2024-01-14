import React from 'react';

function IconInput({
  icon = <i className="fa-solid fa-ghost"></i>,
  type = 'text',
  placeholder = '',
  onChange = () => {},
  onKeyDown = () => {},
  errorMessage = ''
}) {
  return (
    <div className="w-full">
      <div
        className="w-full h-[45px] flex 
        text-zinc-700 dark:text-zinc-100
        bg-zinc-100 dark:bg-zinc-700"
      >
        {/* icon */}
        <div
          className="w-[45px] h-full bg-indigo-400 
            text-2xl text-white rounded-s-md
            flex justify-center items-center"
        >
          {icon}
        </div>

        {/* input */}
        <div
          className="w-[calc(100%-45px)] h-full rounded-e-md
            border border-s-0 border-zinc-300 dark:border-zinc-500"
        >
          <input
            onKeyDown={(e) => onKeyDown(e)}
            onChange={(e) => onChange(e.target.value)}
            type={type}
            placeholder={placeholder}
            className="w-full h-full outline-none px-2
            bg-white dark:bg-zinc-600 rounded-e-md"
          />
        </div>
      </div>

      {/* error message */}
      {errorMessage && <div className="text-xs text-red-500">{errorMessage}</div>}
    </div>
  );
}

export default IconInput;
