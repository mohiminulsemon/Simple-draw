import React from 'react';

function CreateTemplateButton() {
  return (
    <div
      className="w-[200px] h-[40px] rounded-md hover:scale-105 cursor-pointer ease-linear duration-100
    bg-gradient-to-br dark:from-cyan-300 dark:via-sky-500 via-60%  dark:to-amber-300 
  from-cyan-200 via-sky-400 to-amber-200"
    >
      <div className="w-full h-full flex items-center px-3">
        {/* icon */}
        <div className="text-lg w-[20%]">
          <i className="fa-solid fa-plus"></i>
        </div>

        {/* text */}
        <div className="w-[80%]">テンプレート登録</div>
      </div>
    </div>
  );
}

export default CreateTemplateButton;
