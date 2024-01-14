import React from 'react';
import CanvasElementContainer from './CanvasElementContainer';
import { useDispatch } from 'react-redux';
import { setAllElementSelected, updateCanvasElement } from '../../features/canvasSlice';

function CanvasCircle({ element }) {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------

  const dispatch = useDispatch();

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleSelect = (value) => {
    let updatedElement = {
      ...element
    };

    dispatch(setAllElementSelected(false));

    updatedElement.selected = value;
    dispatch(updateCanvasElement(updatedElement));
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <CanvasElementContainer element={element}>
      <div
        onClick={() => handleSelect(true)}
        style={{
          width: element.width,
          height: element.height
        }}
        className="rounded-full bg-green-500"
      ></div>
    </CanvasElementContainer>
  );
}

export default CanvasCircle;
