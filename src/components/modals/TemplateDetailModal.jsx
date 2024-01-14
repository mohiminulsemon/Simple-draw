import React from 'react';
import { IconButton, SimpleBorder } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { closeTemplateDetailModal } from '../../features/templateSlice';

function TemplateDetailModal() {
  const dispatch = useDispatch();
  const selectedTemplate = useSelector((state) => state.templateReducer.selectedTemplate);

  const handleModalClose = () => {
    dispatch(closeTemplateDetailModal());
  };

  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 z-50
    dark:bg-zinc-50/30 bg-zinc-700/30"
    >
      <div
        className="float-right animate-fade-in-right w-[350px] h-full
       bg-zinc-100 dark:bg-zinc-700 p-2 shadow-[-2px_1px_10px_1px] 
       shadow-zinc-500 dark:shadow-zinc-800"
      >
        {/* close button */}
        <div className="w-full flex justify-end">
          <IconButton
            onClick={handleModalClose}
            size="22px"
            icon={<i className="fa-solid fa-xmark"></i>}
          />
        </div>

        {/* border */}
        <div className="my-2">
          <SimpleBorder />
        </div>

        {/* data */}
        <div className="text-zinc-700 dark:text-zinc-100 space-y-2 overflow-auto no-scrollbar max-h-[calc(100vh-60px)]">
          <div>Raw Data</div>
          <div>
            サイズ : {selectedTemplate?.canvas.width} x {selectedTemplate?.canvas.height}
          </div>
          <div>ファイル名 : {selectedTemplate?.filename}</div>
          <div>
            画像：
            <img src={selectedTemplate?.thumbnail} alt="Img" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateDetailModal;
