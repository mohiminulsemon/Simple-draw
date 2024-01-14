import React, { useRef, useEffect, useState, useCallback } from 'react';
import { addPoints, diffPoints } from '../../utils/canvas';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateCanvasOffset,
  updateCanvasScale,
  setIsSpaceKeyHeld,
  deleteSelectedElement
} from '../../features/canvasSlice';
import { CanvasText } from '..';
import { canvasElementType } from '../../utils/constants';
import CanvasCircle from './CanvasCircle';
import Line from '../shapes/Line';
import Square from '../shapes/Square';
import { retry } from '@reduxjs/toolkit/query';
import Triangle from '../shapes/Triangle';
import Pentagon from '../shapes/Pentagon';

function CanvasV2({ width, height }) {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------

  const ZOOM_SENSITIVITY = 0.03;
  const ORIGIN = { x: 0, y: 0 };

  const dispatch = useDispatch();
  const selectedCanvas = useSelector((state) => state.persist.canvasReducer.selectedCanvas);
  const isSpaceKeyHeld = useSelector((state) => state.persist.canvasReducer.isSpaceKeyHeld);

  const mainRef = useRef(null);
  const lastMousePosRef = useRef(ORIGIN);

  const [offset, setOffset] = useState(selectedCanvas.offset);

  // const [isSpaceKeyHeld, setIsSpaceKeyHeld] = useState(false);
  const [isCanvasPan, setIsCanvasPan] = useState(false);

  // ------------------------------------------------------------------------------
  // function
  // ------------------------------------------------------------------------------

  // function for panning
  const handleMouseMove = useCallback(
    (event) => {
      // event.preventDefault();
      if (isSpaceKeyHeld) {
        setIsCanvasPan(true);
        console.log('mouse move');
        const lastMousePos = lastMousePosRef.current;
        const currentMousePos = { x: event.pageX, y: event.pageY };
        lastMousePosRef.current = currentMousePos;

        const mouseDiff = diffPoints(currentMousePos, lastMousePos);
        setOffset((prevOffset) => addPoints(prevOffset, mouseDiff));
      }
    },
    [isSpaceKeyHeld]
  );

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    setIsCanvasPan(false);
  }, [handleMouseMove]);

  const handlePan = useCallback(
    (event) => {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      lastMousePosRef.current = { x: event.pageX, y: event.pageY };
    },
    [handleMouseMove, handleMouseUp]
  );

  // set up wheel event
  useEffect(() => {
    const mainElem = mainRef.current;
    if (mainElem === null) return;

    const handleWheel = (event) => {
      event.preventDefault();

      if (event.ctrlKey) {
        if (event.deltaY > 0) {
          // scale up
          // console.log(selectedCanvas.scale);
          let newScale = selectedCanvas.scale - ZOOM_SENSITIVITY;
          newScale = newScale < 0.1 ? 0.1 : newScale;

          dispatch(updateCanvasScale(newScale));
        } else {
          // scale down
          const newScale = selectedCanvas.scale + ZOOM_SENSITIVITY;
          dispatch(updateCanvasScale(newScale));
        }
      }

      //   console.log(event.deltaY);
      //   const zoom = 1 - event.deltaY / ZOOM_SENSITIVITY;
      //   setScale(scale * zoom);
    };

    mainElem.addEventListener('wheel', handleWheel);
    return () => {
      mainElem.removeEventListener('wheel', handleWheel);
    };
  }, [selectedCanvas.scale]);

  // set up key down event
  useEffect(() => {
    const handleKeyDown = (event) => {
      // check space key is down

      if (event.keyCode === 32) {
        dispatch(setIsSpaceKeyHeld(true));
      }
    };
    const handleKeyUp = (event) => {
      if (event.keyCode === 32) {
        dispatch(setIsSpaceKeyHeld(false));
      } else if (event.keyCode === 46) {
        // delete key up
        // delete selected canvas element
        dispatch(deleteSelectedElement());
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isSpaceKeyHeld]);

  useEffect(() => {
    if (offset.x != null && offset.y != null) {
      dispatch(updateCanvasOffset(offset));
    }
  }, [offset]);

  useEffect(() => {
    setOffset(selectedCanvas.offset);
  }, [selectedCanvas]);

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div
      onMouseDown={handlePan}
      ref={mainRef}
      style={{ width: width + 'px', height: height + 'px' }}
      className={
        (isSpaceKeyHeld && 'cursor-grab ') +
        (isCanvasPan && 'cursor-grabbing ') +
        ' relative ease-in-out duration-300 overflow-auto no-scrollbar'
      }
    >
      {/* <div className="bg-blue-500  w-full">
        offset : x : {selectedCanvas.offset.x} y : {selectedCanvas.offset.y}
        <br />
        isSpaceHeld : {isSpaceKeyHeld ? 'true' : 'false'}
        <br />
        width : {width / scale}
        <br />
        height : {height / scale}
        <br />
        scale : {scale}
      </div> */}

      <div
        style={{
          scale: selectedCanvas?.scale?.toString(),
          top: selectedCanvas?.offset?.y + 'px',
          left: selectedCanvas?.offset?.x + 'px'
        }}
        className="origin-center  absolute "
      >
        {/* main content */}
        <div
          style={{
            top: '0px',
            left: '0px',
            width: selectedCanvas?.width,
            height: selectedCanvas?.height
          }}
          className="bg-white absolute "
        >
          {/* render all element */}
          {selectedCanvas?.elements.map((element) => {
            if (element.type == canvasElementType.text) {
              return <CanvasText key={element.id} element={element} />;
            } else if (element.type == canvasElementType.circle) {
              return <CanvasCircle key={element.id} element={element} />;
            } 
            else if (element.type == canvasElementType.line) {
              return <Line key={element.id} element={element} />;
            }
            else if (element.type == canvasElementType.square) {
              return<Square key={element.id} element={element} />;
            }
            else if (element.type == canvasElementType.triangle) {
              return <Triangle key={element.id} element={element} />;
            }
            else if (element.type == canvasElementType.pentagon) {
              < Pentagon key={element.id} element={element} />;
            }
          })}
          {/* circle */}
          {/* <div
            style={{
              top: 200 + 'px',
              left: 100 + 'px'
            }}
            className="w-[100px] h-[100px] bg-green-500 rounded-full absolute "
          ></div> */}
          {/* <CanvasText width={500} height={300} top={50} left={100} /> */}
        </div>
      </div>
    </div>
  );
}

export default CanvasV2;
