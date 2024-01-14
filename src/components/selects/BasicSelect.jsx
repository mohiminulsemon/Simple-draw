import React, { useState } from 'react';
import ClickAwayListener from 'react-click-away-listener';

function BasicSelect({
  selectedOption = 'test',
  options = ['123', '222', '333'],
  onSelect = () => {}
}) {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const [isFocus, setIsFocus] = useState(false);
  const [isOpenSelectList, setIsOpenSelectList] = useState(false);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleOptionClick = (event, option) => {
    event.preventDefault();
    onSelect(option);
    setIsOpenSelectList(false);
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div>
      <div
        className={
          (isFocus ? 'ring-[2px] ring-indigo-400 ' : 'hover:ring-[2px] hover:ring-indigo-400 ') +
          'p-1 dark:bg-zinc-700 bg-white border rounded-sm dark:border-0 ease-out duration-300 relative prevent-select'
        }
      >
        <div
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onClick={(e) => setIsOpenSelectList(!isOpenSelectList)}
          className="flex justify-between items-center space-x-2 min-w-[50px]"
        >
          <div>{selectedOption}</div>
          <div className="text-xs">
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>

        {isOpenSelectList && (
          <ClickAwayListener onClickAway={() => setIsOpenSelectList(false)}>
            <div className="absolute top-[32px] left-0 dark:bg-zinc-700 bg-white rounded-sm p-1 w-full animate-fade-in">
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={(e) => handleOptionClick(e, option)}
                  className="cursor-pointer hover:text-indigo-400"
                >
                  {option}
                </div>
              ))}
            </div>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
}

export default BasicSelect;
