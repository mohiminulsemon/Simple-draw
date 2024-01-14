import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import { useDispatch } from 'react-redux'; // Import useDispatch
import {
  openSidebarDetail,
  updateSidbarDetailWidth,
  setSidebarIsResizing,
  updateSelectedSidebarItem,
  addCanvasElement
} from '../../features/canvasSlice'; // Import actions from your canvasSlice

import Square from '../../components/shapes/Square';
import Triangle from '../../components/shapes/Triangle';
import Pentagon from '../../components/shapes/Pentagon';
import Line from '../../components/shapes/Line';

const CanvasShapeModal = () => {
  const fixedShapeSize = 60;

  const [shapes, setShapes] = useState([
    { id: 1, type: 'Square', gridPosition: { row: 1, col: 1 }, size: fixedShapeSize, x: 0, y: 0 },
    { id: 2, type: 'Triangle', gridPosition: { row: 1, col: 2 }, size: fixedShapeSize, x: 0, y: 0 },
    { id: 3, type: 'Pentagon', gridPosition: { row: 2, col: 1 }, size: fixedShapeSize, x: 0, y: 0 },
    { id: 4, type: 'Line', gridPosition: { row: 2, col: 2 }, size: fixedShapeSize, x: 0, y: 0 },
  ]);

  // Step 1: Get the dispatch function
  const dispatch = useDispatch();

  const handleDragStart = (index) => {
    const updatedShapes = [...shapes];
    updatedShapes[index] = {
      ...updatedShapes[index],
      x: 0,
      y: 0,
    };
    setShapes(updatedShapes);
  };

  const handleDrag = (index, e, { x, y }) => {
    const updatedShapes = [...shapes];
    const draggedShape = updatedShapes[index];

    if (draggedShape) {
      const newGridX = Math.round((draggedShape.x + x) / (fixedShapeSize + 20)); // Adjust for padding
      const newGridY = Math.round((draggedShape.y + y) / (fixedShapeSize + 10));

      updatedShapes[index] = {
        ...draggedShape,
        x: draggedShape.x + x,
        y: draggedShape.y + y,
        gridPosition: { row: newGridY + 1, col: newGridX + 1 },
      };

      setShapes(updatedShapes);

      // -------------------------------------------------------------------
       // Check for a significant move and create a canvas element
       const movedSignificantly =
       Math.abs(x) > 5 || Math.abs(y) > 5;

     if (movedSignificantly) {
       const canvasElement = {
         type: draggedShape.type,
         width: fixedShapeSize,
         height: fixedShapeSize,
         top: draggedShape.y + y,
         left: draggedShape.x + x,
         selected: false,
       };

       dispatch(addCanvasElement(canvasElement));
     }
// --------------------------------------------------------------------


      // Step 2: Dispatch the openSidebarDetail action
      dispatch(openSidebarDetail(true));
    }
  };


  const handleResize = (index, { size }) => {
    const updatedShapes = [...shapes];
    const { width, height } = size;

    const numericWidth = parseFloat(width);
    const numericHeight = parseFloat(height);

    if (updatedShapes[index].type !== 'Line') {
      updatedShapes[index].size = Math.max(numericWidth, numericHeight);
    }

    setShapes(updatedShapes);

    // Step 3: Dispatch the updateSidbarDetailWidth action
    dispatch(updateSidbarDetailWidth(400));
  };

  return (
    <div className="w-full h-full bg-zinc-200 relative">
      <h3 className='text-lg font-semibold text-gray-700 px-2 mt-3'>Line and Shapes</h3>
      <hr className='border-gray-400 mx-2 mt-1' />
      <div className="flex flex-wrap gap-3 px-2 py-5 ">
        {shapes.map((shape, index) => (
          <Draggable
            key={shape.id}
            defaultPosition={{ x: 0, y: 0 }}
            // position={{ x: shape.x, y: shape.y }}
            onStart={() => handleDragStart(index)}
            onStop={(e, data) => handleDrag(index, e, data)}
          >
            <Resizable
              width={fixedShapeSize}
              height={fixedShapeSize}
              onResize={(e, data) => handleResize(index, data)}
              draggableOpts={{ grid: [10, 10] }}
            >
              <div
                className={`shape-${shape.type.toLowerCase()} `}
                style={{
                  width: `${fixedShapeSize}px`,
                  height: `${fixedShapeSize}px`,
                }}
              >
                {(() => {
                  switch (shape.type) {
                    case 'Square':
                      return <Square element={shape} />;
                    case 'Triangle':
                      return <Triangle element={shape} />;
                    case 'Pentagon':
                      return <Pentagon element={shape} />;
                    case 'Line':
                      return <Line element={shape} />;
                    default:
                      return null;
                  }
                })()}
              </div>
            </Resizable>
          </Draggable>
        ))}
      </div>
    </div>
  );
};

export default CanvasShapeModal;
