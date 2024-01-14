import React from 'react';
import { canvasLayout } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCanvas, updateSelectedCanvas } from '../../features/canvasSlice';

function CanvasContentHeader() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const canvas = useSelector((state) => state.persist.canvasReducer.canvas);
  const selectedCanvas = useSelector((state) => state.persist.canvasReducer.selectedCanvas);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleTagSelect = (data) => {
    dispatch(updateSelectedCanvas(data));
  };

  const handleCanvasDelete = (id) => {
    dispatch(deleteCanvas(id));
  };
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div
      style={{ height: canvasLayout.canvasHeaderHeight + 'px' }}
      className="w-full text-zinc-700 dark:text-zinc-200 dark:bg-zinc-700 bg-cyan-50 prevent-select"
    >
      <div className="w-full h-full inline-flex space-x-1 ">
        {canvas?.map((canvas) => (
          <div
            key={canvas.id}
            className={
              (canvas.id == selectedCanvas.id
                ? 'dark:bg-zinc-900 bg-zinc-300'
                : ' dark:bg-zinc-600 bg-indigo-100 ') +
              ' max-w-[120px] w-full h-full hover:dark:bg-zinc-900 hover:bg-indigo-300 ' +
              'rounded-tl-md rounded-tr-3xl inline-flex justify-between items-center px-3'
            }
          >
            {/* label */}
            <div
              onClick={() => handleTagSelect(canvas)}
              className="w-[80%] h-full truncate text-[16px]"
            >
              {canvas.name}
            </div>
            {/* icon */}
            <div
              onClick={() => handleCanvasDelete(canvas.id)}
              className="w-[10%] truncate cursor-pointer text-xs"
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CanvasContentHeader;
