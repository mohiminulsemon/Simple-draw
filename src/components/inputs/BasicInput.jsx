import React, { useState } from 'react';

function BasicInput({ label = 'label', type = 'text', width, value = '', onChange = () => {} }) {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [isFocus, setIsFocus] = useState(false);
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div className="flex items-center">
      {/* label */}
      <div className="w-[50px] text-xs">{label}</div>

      {/* input */}
      <input
        onChange={(e) => onChange(e.target.value)}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        style={{ width: width ? width : 'auto' }}
        className={
          (isFocus ? 'ring-[2px] ring-indigo-400 ' : 'hover:ring-[2px] hover:ring-indigo-400 ') +
          ' outline-none dark:bg-zinc-700 p-1 ease-out duration-300 ' +
          'border rounded-sm dark:border-0'
        }
        type={type}
      />
    </div>
  );
}

export default BasicInput;
