import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../../features/appSlice';
import { SimpleTooltip, IconButton } from '..';

function ThemeModeButton() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const moonIcon = <i className="fa-solid fa-moon"></i>;
  const sunIcon = <i className="fa-solid fa-sun"></i>;

  const isDarkMode = useSelector((state) => state.persist.appReducer.isDarkMode);
  const dispatch = useDispatch();

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleClick = () => {
    dispatch(setDarkMode(!isDarkMode));
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------

  return (
    <SimpleTooltip label="テーマ変更">
      <IconButton
        size="18px"
        width="32px"
        height="32px"
        icon={isDarkMode ? moonIcon : sunIcon}
        onClick={handleClick}
      />
    </SimpleTooltip>
  );
}

export default ThemeModeButton;
