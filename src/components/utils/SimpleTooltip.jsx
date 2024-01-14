import React, { useState } from 'react';

function SimpleTooltip({ children, label = 'tooltip' }) {
  return (
    <span className="group relative">
      <span
        className="pointer-events-none absolute -bottom-10 left-1/2 
        -translate-x-1/2 whitespace-nowrap rounded text-sm
        bg-zinc-600 dark:bg-zinc-800 px-2 py-1 text-white opacity-0 
        transition before:absolute 
        before:left-1/2 before:bottom-full
        before:-translate-x-1/2 before:border-4 
        before:rotate-180
        before:border-transparent 
        before:border-t-zinc-600 before:dark:border-t-zinc-800 
        group-hover:opacity-100 z-[100]"
      >
        {label}
      </span>

      {children}
    </span>
  );
}

export default SimpleTooltip;
