import React from 'react';
import appIcon from '/icon.svg';

function AppLogo() {
  return (
    <div className="flex items-center">
      <img className="w-[30px] h-[30px]" src={appIcon} alt="Logo" />
      <div className="ms-2 font-bold text-lg text-zinc-600 dark:text-zinc-100">Simple Draw</div>
    </div>
  );
}

export default AppLogo;
