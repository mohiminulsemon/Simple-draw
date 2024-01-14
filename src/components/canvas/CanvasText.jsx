import { React } from 'react';
import { CanvasElementContainer } from '..';
import { useDispatch } from 'react-redux';
import { setAllElementSelected, updateCanvasElement } from '../../features/canvasSlice';

function CanvasText({ element }) {
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
        className={
          (element.selected ? '' : 'prevent-select') + ' w-full h-full bg-red-300 text-9xl'
        }
      >
        Text
      </div>
    </CanvasElementContainer>
  );
}

export default CanvasText;
