// components/shapes/Triangle.jsx
import React from 'react';
import CanvasElementContainer from '../canvas/CanvasElementContainer';
import { useDispatch } from 'react-redux';
import { setAllElementSelected, updateCanvasElement } from '../../features/canvasSlice';

function Triangle({ element }) {
  const dispatch = useDispatch();

  const handleSelect = (value) => {
    console.log('Triangle element clicked');
    let updatedElement = { ...element };

    dispatch(setAllElementSelected(false));

    updatedElement.selected = value;
    dispatch(updateCanvasElement(updatedElement));
  };

  return (
    <CanvasElementContainer element={element}>
      <div
        onClick={() => handleSelect(true)}
        className=' flex justify-center items-baseline'
        style={{
          width: '0',
          height: '0',
          borderBottom: `${element.size}px solid #9ca3af`, // Set all three borders
          borderTop: '0', // Remove the bottom border
          borderLeft: `${element.size / 2}px solid transparent`, // Set the left border
          borderRight: `${element.size / 2}px solid transparent`,
        }}
      />
    </CanvasElementContainer>
  );
}

Triangle.defaultConfig = {
  type: 'Triangle',
  size: 100, // Set a default size
  left: 10,
  top: 480,
};

export default Triangle;
