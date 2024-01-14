import React from 'react';
import { IconButton } from '..';
import { routes } from '../../utils/routes';
import { Link } from 'react-router-dom';

function CanvasLogoModal() {
  return (
    <div className="w-[180px]  bg-zinc-200 dark:bg-zinc-800 relative animate-scale-in-hor-left rounded-sm ">
      <div className="bg-inherit w-3 h-3 absolute -top-[4px] rotate-45 left-[10px]"></div>
      <div className="py-3 px-2 space-y-1">
        <Link to={routes.home}>
          <IconButton label="ホームに戻る" icon={<i className="fa-solid fa-arrow-left"></i>} />
        </Link>

        {/* <IconButton label="テーマ変更" icon={<i className="fa-solid fa-circle-half-stroke"></i>} /> */}
      </div>
    </div>
  );
}

export default CanvasLogoModal;
