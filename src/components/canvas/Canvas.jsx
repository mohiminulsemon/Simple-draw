import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { addPoints, diffPoints, scalePoint } from '../../utils/canvas';

function Canvas({ width, height }) {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const ORIGIN = { x: 0, y: 0 };
  const ZOOM_SENSITIVITY = 500;
  // adjust to device to avoid blur
  const { devicePixelRatio: ratio = 1 } = window;

  const [context, setContext] = useState(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState(ORIGIN);
  const [mousePos, setMousePos] = useState(ORIGIN);
  const [viewportTopLeft, setViewportTopLeft] = useState(ORIGIN);

  const canvasRef = useRef(null);
  const isResetRef = useRef(false);
  const lastMousePosRef = useRef(ORIGIN);
  const lastOffsetRef = useRef(ORIGIN);

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  // reset
  const reset = useCallback(
    (newContext) => {
      if (newContext && !isResetRef.current) {
        console.log('reset');
        // adjust for device pixel density
        newContext.canvas.width = width * ratio;
        newContext.canvas.height = height * ratio;
        newContext.scale(ratio, ratio);
        setScale(1);

        // reset state and refs
        setContext(newContext);
        setOffset(ORIGIN);
        setMousePos(ORIGIN);
        setViewportTopLeft(ORIGIN);
        lastOffsetRef.current = ORIGIN;
        lastMousePosRef.current = ORIGIN;

        // this thing is so multiple resets in a row don't clear canvas
        isResetRef.current = true;
      }
    },
    [width, height]
  );

  // function for panning
  const handleMouseMove = useCallback(
    (event) => {
      if (context) {
        const lastMousePos = lastMousePosRef.current;
        const currentMousePos = { x: event.pageX, y: event.pageY };
        lastMousePosRef.current = currentMousePos;

        const mouseDiff = diffPoints(currentMousePos, lastMousePos);
        setOffset((prevOffset) => addPoints(prevOffset, mouseDiff));
      }
    },
    [context]
  );

  const handleMouseUp = useCallback(() => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handlePan = useCallback(
    (event) => {
      console.log('handle pan');
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      lastMousePosRef.current = { x: event.pageX, y: event.pageY };
    },
    [handleMouseMove, handleMouseUp]
  );

  // setup canvas and set context
  useLayoutEffect(() => {
    if (canvasRef.current) {
      console.log('setup canvas');
      // get new drawing context
      const renderCtx = canvasRef.current.getContext('2d');
      console.log(renderCtx);

      if (renderCtx) {
        reset(renderCtx);
      }
    }
  }, [reset, width, height]);

  // pan when offset or scale change
  useLayoutEffect(() => {
    if (context && lastOffsetRef.current) {
      const offsetDiff = scalePoint(diffPoints(offset, lastOffsetRef.current), scale);
      context.translate(offsetDiff.x, offsetDiff.y);
      setViewportTopLeft((pervVal) => diffPoints(pervVal, offsetDiff));
      isResetRef.current = false;
    }
  }, [context, offset, scale]);

  // draw
  useLayoutEffect(() => {
    if (context) {
      console.log('draw');
      const squareSize = 20;

      // clear canvas but maintain transform
      const storedTransform = context.getTransform();
      context.canvas.width = context.canvas.width;
      context.setTransform(storedTransform);

      context.fillStyle = 'red';
      context.fillRect(
        width / 2 - squareSize / 2,
        height / 2 - squareSize / 2,
        squareSize,
        squareSize
      );
      context.arc(viewportTopLeft.x, viewportTopLeft.y, 5, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fill();
    }
  }, [width, height, context, scale, offset, viewportTopLeft]);

  // update last offset
  useEffect(() => {
    lastOffsetRef.current = offset;
  }, [offset]);

  // add event listener on canas for mouse position
  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem === null) return;

    const handleUpdateMouse = (event) => {
      event.preventDefault();
      // console.log('mouse move');
      if (canvasRef.current) {
        const viewportMousePos = { x: event.clientX, y: event.clientY };
        const topLeftCanvasPos = {
          x: canvasRef.current.offsetLeft,
          y: canvasRef.current.offsetTop
        };
        setMousePos(diffPoints(viewportMousePos, topLeftCanvasPos));
      }
    };

    canvasElem.addEventListener('mousemove', handleUpdateMouse);
    canvasElem.addEventListener('wheel', handleUpdateMouse);

    return () => {
      canvasElem.removeEventListener('mousemove', handleUpdateMouse);
      canvasElem.removeEventListener('wheel', handleUpdateMouse);
    };
  }, []);

  // add event listener on canvas for zoom
  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem === null) return;

    // this is tricky. Update the viewport's "origin" such that
    // the mouse doesn't move during scale - the 'zoom point' of the mouse
    // before and after zoom is relatively the same position on the viewport
    const handleWheel = (event) => {
      event.preventDefault();
      console.log('wheel');
      if (context) {
        const zoom = 1 - event.deltaY / ZOOM_SENSITIVITY;
        const viewportTopLeftDelta = {
          x: (mousePos.x / scale) * (1 - 1 / zoom),
          y: (mousePos.y / scale) * (1 - 1 / zoom)
        };
        const newViewportTopLeft = addPoints(viewportTopLeft, viewportTopLeftDelta);

        context.translate(viewportTopLeft.x, viewportTopLeft.y);
        context.scale(zoom, zoom);
        context.translate(-newViewportTopLeft.x, -newViewportTopLeft.y);

        setViewportTopLeft(newViewportTopLeft);
        setScale(scale * zoom);
        isResetRef.current = false;
      }
    };
    canvasElem.addEventListener('wheel', handleWheel);
    return () => canvasElem.removeEventListener('wheel', handleWheel);
  }, [context, mousePos.x, mousePos.y, viewportTopLeft, scale]);

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div className="">
      {/* <button onClick={() => context && reset(context)}>Reset</button>
      <pre>scale: {scale}</pre>
      <pre>offset: {JSON.stringify(offset)}</pre>
      <pre>viewportTopLeft: {JSON.stringify(viewportTopLeft)}</pre> */}
      <canvas
        onMouseDown={handlePan}
        ref={canvasRef}
        height={height * ratio}
        width={width * ratio}
        style={{
          border: '2px solid #000',
          backgroundColor: 'white',
          width: `${width}px`,
          height: `${height}px`
        }}
      ></canvas>
    </div>
  );
}

export default Canvas;
