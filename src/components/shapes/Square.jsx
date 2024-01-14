// components/shapes/Square.jsx
import React from 'react';
import CanvasElementContainer from '../canvas/CanvasElementContainer';
import { useDispatch } from 'react-redux';
import { setAllElementSelected, updateCanvasElement } from '../../features/canvasSlice';

function Square({ element }) {
  const dispatch = useDispatch();

  const handleSelect = (value) => {
    console.log('Square element clicked');
    let updatedElement = { ...element };

    dispatch(setAllElementSelected(false));

    updatedElement.selected = value;
    dispatch(updateCanvasElement(updatedElement));
  };

  return (
    <CanvasElementContainer element={element}>
      <div
        onClick={() => handleSelect(true)}
        className='relative'
        style={{
          width: `${element.size}px`,
          height: `${element.size}px`,
        }}
      >
        <div
          className='absolute top-0 right-0 bottom-0 left-0 '
          style={{
            backgroundColor: ' #9ca3af',
          }}
        ></div>
        {/* Square */}
      </div>
    </CanvasElementContainer>
  );
}

Square.defaultConfig = {
  type: 'Square',
  size: 60,
  left: 10,
  top: 10,
};

export default Square;
