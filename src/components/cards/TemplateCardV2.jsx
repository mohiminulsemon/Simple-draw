import React, { useState } from 'react';
import TemplateMenuModal from '../modals/TemplateMenuModal';
import ClickAwayListener from 'react-click-away-listener';
import { useDispatch } from 'react-redux';
import { setSelectedTemplate } from '../../features/templateSlice';

function TemplateCardV2({ templateData }) {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [isHover, setIsHover] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const dispatch = useDispatch();

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleOpenMenu = (value) => {
    if (value) {
      dispatch(setSelectedTemplate(templateData));
    } else {
      dispatch(setSelectedTemplate({}));
    }
    setOpenMenu(value);
  };

  const handleMenuItemClick = () => {
    setIsHover(false);
    setOpenMenu(false);
  };

  // ------------------------------------------------------------------------------
  // renders
  // ------------------------------------------------------------------------------
  return (
    <div
      onMouseEnter={(e) => setIsHover(true)}
      onMouseLeave={(e) => setIsHover(false)}
      className="w-full h-full relative"
    >
      {/* thumbnail image */}
      <div className="flex justify-center items-center h-full">
        <img className="h-[290px]" src={templateData?.thumbnail} alt="Img" />
      </div>

      {/* template details */}
      <div
        className="w-full h-full absolute top-0 left-0
                bg-gradient-to-b from-transparent via-75% via-transparent 
                to-cyan-100 dark:to-zinc-900 rounded-md"
      >
        <div className="w-full h-full flex flex-col-reverse p-2">
          <div className="text-xs font-medium">
            サイズ：{templateData?.canvas.width} x {templateData?.canvas.height}
          </div>
          <div className="text-md font-medium">名前：{templateData?.name}</div>
        </div>
      </div>

      {/* menu icon */}
      {(isHover || openMenu) && (
        <div
          onClick={(e) => handleOpenMenu(!openMenu)}
          className="w-[36px] h-[36px] rounded-full bg-zinc-300 dark:bg-zinc-600
                absolute top-0 right-0 m-1 cursor-pointer hover:bg-zinc-200 hover:dark:bg-zinc-500
                flex justify-center items-center text-xl"
        >
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      )}

      {/* menu modal */}
      {openMenu && (
        <ClickAwayListener onClickAway={(e) => setOpenMenu(false)}>
          <div className="w-[100px] h-auto absolute top-[40px] right-0 m-1">
            <TemplateMenuModal onClose={handleMenuItemClick} />
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

export default TemplateCardV2;
