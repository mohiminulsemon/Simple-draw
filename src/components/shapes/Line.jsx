// components/shapes/Line.jsx
import React from 'react';
import CanvasElementContainer from '../canvas/CanvasElementContainer';
import { useDispatch } from 'react-redux';
import { setAllElementSelected, updateCanvasElement } from '../../features/canvasSlice';

function Line({ element }) {
  const dispatch = useDispatch();

  const handleSelect = (value) => {
    console.log('Line element clicked');
    let updatedElement = { ...element };

    dispatch(setAllElementSelected(false));

    updatedElement.selected = value;
    dispatch(updateCanvasElement(updatedElement));
  };

  return (
    <CanvasElementContainer element={element}>
      <div
        onClick={() => handleSelect(true)}
        className='flex justify-center items-center'
        style={{
          width: element.size || '50%',
          height: element.size || '10px',
        }}
      >
        <div className='w-full h-[5px] bg-gray-400'></div>
      </div>
    </CanvasElementContainer>
  );
}

Line.defaultConfig = {
  type: 'Line',
  length: '50%', // Set a default length
  thickness: '10px',
  left: 10,
  top: 480,
};

export default Line;
