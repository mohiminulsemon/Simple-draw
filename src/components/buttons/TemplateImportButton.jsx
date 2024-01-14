import React from 'react';

function TemplateImportButton() {
  return (
    <div
      className="w-[150px] h-[40px] rounded-md hover:scale-105 cursor-pointer ease-linear duration-100
      bg-gradient-to-br dark:from-green-300 dark:via-emerald-500 via-60%  dark:to-amber-300 
      from-green-200 via-emerald-400 to-amber-200"
    >
      <div className="w-full h-full flex items-center px-3">
        {/* icon */}
        <div className="text-lg w-[20%]">
          <i className="fa-solid fa-file-import"></i>
        </div>

        {/* text */}
        <div className="w-[80%]">インポート</div>
      </div>
    </div>
  );
}

export default TemplateImportButton;
