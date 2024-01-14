// components/shapes/Pentagon.jsx
import React from 'react';
import CanvasElementContainer from '../canvas/CanvasElementContainer';
import { useDispatch } from 'react-redux';
import { setAllElementSelected, updateCanvasElement } from '../../features/canvasSlice';

function Pentagon({ element }) {
  const dispatch = useDispatch();

  const handleSelect = (value) => {
    console.log('Pentagon element clicked');
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
          className='bg-gray-400'
          style={{
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            width: '100%',
            height: '100%',
          }}
        ></div>
      </div>
    </CanvasElementContainer>
  );
}

Pentagon.defaultConfig = {
  type: 'Pentagon',
  size: 100,
  left: 10,
  top: 340,
};

export default Pentagon;
