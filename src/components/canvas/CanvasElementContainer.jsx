import React, { useState, useEffect, useCallback, useRef } from 'react';
import { diffPoints, scalePoint } from '../../utils/canvas';
import { useSelector, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import { setAllElementSelected, updateCanvasElement } from '../../features/canvasSlice';
import ClickAwayListener from 'react-click-away-listener';

function CanvasElementContainer({ children, element }) {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const resizeMode = {
    topLeft: 0,
    topRight: 1,
    bottomLeft: 2,
    bottomRight: 3,
    top: 4,
    bottom: 5,
    left: 6,
    right: 7
  };

  const dispatch = useDispatch();

  const mouse = useSelector((state) => state.persist.appReducer.mouse);
  const isSpaceKeyHeld = useSelector((state) => state.persist.canvasReducer.isSpaceKeyHeld);
  const scale = useSelector((state) => state.persist.canvasReducer.selectedCanvas.scale);

  const [anchorCircleSize, setAnchorCircleSize] = useState(16.0 / scale);
  const [anchorRectSize, setAnchorRectSize] = useState({
    x: 16.0 / scale,
    y: 32.0 / scale
  });
  const [elementWidth, setElementWidth] = useState(element.width);
  const [elementHeight, setElementHeight] = useState(element.height);
  const [elementTop, setElementTop] = useState(element.top);
  const [elementLeft, setElementLeft] = useState(element.left);
  const [elementBottom, setElementBottom] = useState(element.top + element.height);
  const [elementRight, setElementRight] = useState(element.left + element.width);

  const lastMousePosRef = useRef({ x: 0, y: 0 });
  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleMouseMove = useCallback((event) => {
    lastMousePosRef.current = mouse;
  });

  const handleElementMove = useCallback(
    (event) => {
      event.preventDefault();
      if (isSpaceKeyHeld) return;

      const lastMousePos = lastMousePosRef.current;
      const currentMousePos = mouse;
      lastMousePosRef.current = currentMousePos;
      let mouseDiff = diffPoints(currentMousePos, lastMousePos);
      mouseDiff = scalePoint(mouseDiff, scale);

      setElementTop(elementTop + mouseDiff.y);
      setElementBottom(elementBottom + mouseDiff.y);
      setElementLeft(elementLeft + mouseDiff.x);
      setElementRight(elementRight + mouseDiff.x);

      let updatedElement = {
        ...element
      };
      updatedElement.top = elementTop + mouseDiff.y;
      updatedElement.left = elementLeft + mouseDiff.x;

      dispatch(updateCanvasElement(updatedElement));
    },
    [
      isSpaceKeyHeld,
      mouse,
      elementHeight,
      elementWidth,
      elementTop,
      elementLeft,
      elementRight,
      elementBottom
    ]
  );

  const handleElementResize = useCallback(
    (event, mode) => {
      event.preventDefault();
      if (isSpaceKeyHeld) return;

      const lastMousePos = lastMousePosRef.current;
      const currentMousePos = mouse;
      lastMousePosRef.current = currentMousePos;
      let mouseDiff = diffPoints(currentMousePos, lastMousePos);
      mouseDiff = scalePoint(mouseDiff, scale);

      const minWidth = 100;
      const minHeight = 100;
      let newWidth, newHeight, newTop, newLeft, newRight, newBottom;
      let maxTop, maxLeft, minBottom, minRight;

      // top left resize
      if (mode == resizeMode.topLeft) {
        newWidth = elementWidth - mouseDiff.x;
        newWidth = newWidth < minWidth ? minWidth : newWidth;
        setElementWidth(newWidth);

        newHeight = elementHeight - mouseDiff.y;
        newHeight = newHeight < minHeight ? minHeight : newHeight;
        setElementHeight(newHeight);

        newTop = elementTop + mouseDiff.y;
        maxTop = elementBottom - newHeight;
        setElementTop(newTop > maxTop ? maxTop : newTop);

        newLeft = newLeft = elementLeft + mouseDiff.x;
        maxLeft = elementRight - newWidth;
        setElementLeft(newLeft > maxLeft ? maxLeft : newLeft);

        let updatedElement = {
          ...element
        };
        updatedElement.top = newTop > maxTop ? maxTop : newTop;
        updatedElement.left = newLeft > maxLeft ? maxLeft : newLeft;
        updatedElement.width = newWidth;
        updatedElement.height = newHeight;

        dispatch(updateCanvasElement(updatedElement));
      }
      // top right resize
      else if (mode == resizeMode.topRight) {
        newWidth = elementWidth + mouseDiff.x;
        newWidth = newWidth < minWidth ? minWidth : newWidth;
        setElementWidth(newWidth);

        newHeight = elementHeight - mouseDiff.y;
        newHeight = newHeight < minHeight ? minHeight : newHeight;
        setElementHeight(newHeight);

        newTop = elementTop + mouseDiff.y;
        maxTop = elementBottom - newHeight;
        setElementTop(newTop > maxTop ? maxTop : newTop);

        newRight = elementRight + mouseDiff.x;
        minRight = elementLeft + newWidth;
        setElementRight(newRight < minRight ? minRight : newRight);

        let updatedElement = {
          ...element
        };
        updatedElement.top = newTop > maxTop ? maxTop : newTop;
        updatedElement.width = newWidth;
        updatedElement.height = newHeight;

        dispatch(updateCanvasElement(updatedElement));
      }
      // bottom left resize
      else if (mode == resizeMode.bottomLeft) {
        newWidth = elementWidth - mouseDiff.x;
        newWidth = newWidth < minWidth ? minWidth : newWidth;
        setElementWidth(newWidth);

        newHeight = elementHeight + mouseDiff.y;
        newHeight = newHeight < minHeight ? minHeight : newHeight;
        setElementHeight(newHeight);

        newBottom = elementBottom + mouseDiff.y;
        minBottom = elementTop + newHeight;
        setElementBottom(newBottom < minBottom ? minBottom : newBottom);

        newLeft = elementLeft + mouseDiff.x;
        maxLeft = elementRight - newWidth;
        setElementLeft(newLeft > maxLeft ? maxLeft : newLeft);

        let updatedElement = {
          ...element
        };
        updatedElement.left = newLeft > maxLeft ? maxLeft : newLeft;
        updatedElement.width = newWidth;
        updatedElement.height = newHeight;

        dispatch(updateCanvasElement(updatedElement));
      }
      // bottom right resize
      else if (mode == resizeMode.bottomRight) {
        newWidth = elementWidth + mouseDiff.x;
        newWidth = newWidth < minWidth ? minWidth : newWidth;
        setElementWidth(newWidth);

        newHeight = elementHeight + mouseDiff.y;
        newHeight = newHeight < minHeight ? minHeight : newHeight;
        setElementHeight(newHeight);

        newBottom = elementBottom + mouseDiff.y;
        minBottom = elementTop + newHeight;
        setElementBottom(newBottom < minBottom ? minBottom : newBottom);

        newRight = elementRight + mouseDiff.x;
        minRight = elementLeft + newWidth;
        setElementRight(newRight < minRight ? minRight : newRight);

        let updatedElement = {
          ...element
        };
        updatedElement.width = newWidth;
        updatedElement.height = newHeight;

        dispatch(updateCanvasElement(updatedElement));
      }
      // top resize
      else if (mode == resizeMode.top) {
        newHeight = elementHeight - mouseDiff.y;
        newHeight = newHeight < minHeight ? minHeight : newHeight;
        setElementHeight(newHeight);

        newTop = elementTop + mouseDiff.y;
        maxTop = elementBottom - newHeight;
        setElementTop(newTop > maxTop ? maxTop : newTop);

        let updatedElement = {
          ...element
        };
        updatedElement.height = newHeight;
        updatedElement.top = newTop > maxTop ? maxTop : newTop;

        dispatch(updateCanvasElement(updatedElement));
      }
      // bottom resize
      else if (mode == resizeMode.bottom) {
        newHeight = elementHeight + mouseDiff.y;
        newHeight = newHeight < minHeight ? minHeight : newHeight;
        setElementHeight(newHeight);

        newBottom = elementBottom + mouseDiff.y;
        minBottom = elementTop + newHeight;
        setElementBottom(newBottom < minBottom ? minBottom : newBottom);

        let updatedElement = {
          ...element
        };
        updatedElement.height = newHeight;

        dispatch(updateCanvasElement(updatedElement));
      }
      // left resize
      else if (mode == resizeMode.left) {
        newWidth = elementWidth - mouseDiff.x;
        newWidth = newWidth < minWidth ? minWidth : newWidth;
        setElementWidth(newWidth);

        newLeft = newLeft = elementLeft + mouseDiff.x;
        maxLeft = elementRight - newWidth;
        setElementLeft(newLeft > maxLeft ? maxLeft : newLeft);

        let updatedElement = {
          ...element
        };
        updatedElement.width = newWidth;
        updatedElement.left = newLeft > maxLeft ? maxLeft : newLeft;

        dispatch(updateCanvasElement(updatedElement));
      }
      // right resize
      else if (mode == resizeMode.right) {
        newWidth = elementWidth + mouseDiff.x;
        newWidth = newWidth < minWidth ? minWidth : newWidth;
        setElementWidth(newWidth);

        newRight = elementRight + mouseDiff.x;
        minRight = elementLeft + newWidth;
        setElementRight(newRight < minRight ? minRight : newRight);

        let updatedElement = {
          ...element
        };
        updatedElement.width = newWidth;

        dispatch(updateCanvasElement(updatedElement));
      }
    },
    [
      isSpaceKeyHeld,
      mouse,
      elementWidth,
      elementHeight,
      elementTop,
      elementLeft,
      elementRight,
      elementBottom
    ]
  );

  const handleElementClickAway = () => {
    dispatch(setAllElementSelected(false));
  };

  useEffect(() => {
    setAnchorCircleSize(16.0 / scale);
    setAnchorRectSize({
      x: 16.0 / scale,
      y: 32.0 / scale
    });
  }, [scale]);
  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  if (!element.selected || isSpaceKeyHeld) {
    return (
      <div
        style={{
          top: elementTop + 'px',
          left: elementLeft + 'px',
          width: elementWidth + 'px',
          height: elementHeight + 'px'
        }}
        className="absolute"
      >
        {children}
      </div>
    );
  }

  return (
    <ClickAwayListener onClickAway={handleElementClickAway}>
      <div
        onMouseMove={(e) => handleMouseMove(e)}
        style={{ top: elementTop + 'px', left: elementLeft + 'px' }}
        className="absolute"
      >
        <div className="w-full h-full absolute top-0 left-0">{children}</div>
        <div
          style={{
            width: elementWidth + 'px',
            height: elementHeight + 'px',
            borderWidth: 3.0 / scale + 'px'
          }}
          className=" border-indigo-400 relative "
        >
          {/* top drag area */}
          <div
            style={{
              height: 14 / scale + 'px',
              top: -7 / scale + 'px'
            }}
            className=" absolute w-full cursor-pointer"
          >
            <Draggable onDrag={handleElementMove} bounds="parent">
              <div className="w-full h-full "></div>
            </Draggable>
          </div>

          {/* bottom drag area */}
          <div
            style={{
              height: 14 / scale + 'px',
              bottom: -7 / scale + 'px'
            }}
            className=" absolute w-full cursor-pointer"
          >
            <Draggable onDrag={handleElementMove} bounds="parent">
              <div className="w-full h-full "></div>
            </Draggable>
          </div>

          {/* left drag area */}
          <div
            style={{
              width: 14 / scale + 'px',
              left: -7 / scale + 'px'
            }}
            className=" absolute h-full cursor-pointer"
          >
            <Draggable onDrag={handleElementMove} bounds="parent">
              <div className="w-full h-full "></div>
            </Draggable>
          </div>

          {/* right drag area */}
          <div
            style={{
              width: 14 / scale + 'px',
              right: -7 / scale + 'px'
            }}
            className="  absolute h-full cursor-pointer"
          >
            <Draggable onDrag={handleElementMove} bounds="parent">
              <div className="w-full h-full "></div>
            </Draggable>
          </div>

          {/* top left circle anchor */}
          <div
            style={{
              width: anchorCircleSize + 'px',
              height: anchorCircleSize + 'px',
              top: anchorCircleSize / -2 + 'px',
              left: anchorCircleSize / -2 + 'px',
              borderWidth: 3.0 / scale + 'px'
            }}
            className=" rounded-full border-indigo-400 bg-white absolute cursor-nw-resize"
          >
            <Draggable
              onDrag={(e) => handleElementResize(e, resizeMode.topLeft)}
              bounds="parent"
              position={{ x: anchorCircleSize / -2, y: anchorCircleSize / -2 }}
            >
              <div className="w-[200%] h-[200%] "></div>
            </Draggable>
          </div>

          {/* top right circle anchor */}
          <div
            style={{
              width: anchorCircleSize + 'px',
              height: anchorCircleSize + 'px',
              top: anchorCircleSize / -2 + 'px',
              right: anchorCircleSize / -2 + 'px',
              borderWidth: 3.0 / scale + 'px'
            }}
            className=" rounded-full border-indigo-400  bg-white absolute cursor-ne-resize"
          >
            <Draggable
              onDrag={(e) => handleElementResize(e, resizeMode.topRight)}
              bounds="parent"
              position={{ x: anchorCircleSize / -2, y: anchorCircleSize / -2 }}
            >
              <div className="w-[200%] h-[200%] "></div>
            </Draggable>
          </div>

          {/* bottom left circle anchor */}
          <div
            style={{
              width: anchorCircleSize + 'px',
              height: anchorCircleSize + 'px',
              bottom: anchorCircleSize / -2 + 'px',
              left: anchorCircleSize / -2 + 'px',
              borderWidth: 3.0 / scale + 'px'
            }}
            className=" rounded-full border-indigo-400 bg-white absolute cursor-sw-resize"
          >
            <Draggable
              onDrag={(e) => handleElementResize(e, resizeMode.bottomLeft)}
              bounds="parent"
              position={{ x: anchorCircleSize / -2, y: anchorCircleSize / -2 }}
            >
              <div className="w-[200%] h-[200%] "></div>
            </Draggable>
          </div>

          {/* bottom right circle anchor */}
          <div
            style={{
              width: anchorCircleSize + 'px',
              height: anchorCircleSize + 'px',
              bottom: anchorCircleSize / -2 + 'px',
              right: anchorCircleSize / -2 + 'px',
              borderWidth: 3.0 / scale + 'px'
            }}
            className=" rounded-full border-indigo-400 bg-white absolute cursor-se-resize"
          >
            <Draggable
              onDrag={(e) => handleElementResize(e, resizeMode.bottomRight)}
              bounds="parent"
              position={{ x: anchorCircleSize / -2, y: anchorCircleSize / -2 }}
            >
              <div className="w-[200%] h-[200%] "></div>
            </Draggable>
          </div>

          {/* top rect anchor */}
          <div
            style={{
              width: anchorRectSize.y + 'px',
              height: anchorRectSize.x + 'px',
              top: anchorRectSize.x / -2 + 'px',
              left: elementWidth / 2 - anchorRectSize.y / 2 + 'px',
              borderWidth: 3.0 / scale + 'px'
            }}
            className="rounded-full border-indigo-400 bg-white absolute cursor-n-resize"
          >
            <Draggable onDrag={(e) => handleElementResize(e, resizeMode.top)} bounds="parent">
              <div className="w-full h-full "></div>
            </Draggable>
          </div>

          {/* bottom rect anchor */}
          <div
            style={{
              width: anchorRectSize.y + 'px',
              height: anchorRectSize.x + 'px',
              bottom: anchorRectSize.x / -2 + 'px',
              left: elementWidth / 2 - anchorRectSize.y / 2 + 'px',
              borderWidth: 3.0 / scale + 'px'
            }}
            className="rounded-full border-indigo-400 bg-white absolute cursor-s-resize"
          >
            <Draggable onDrag={(e) => handleElementResize(e, resizeMode.bottom)} bounds="parent">
              <div className="w-full h-full "></div>
            </Draggable>
          </div>

          {/* left rect anchor */}
          <div
            style={{
              width: anchorRectSize.x + 'px',
              height: anchorRectSize.y + 'px',
              top: elementHeight / 2 - anchorRectSize.y / 2 + 'px',
              left: anchorRectSize.x / -2 + 'px',
              borderWidth: 3.0 / scale + 'px'
            }}
            className="rounded-full border-indigo-400 bg-white absolute cursor-w-resize"
          >
            <Draggable onDrag={(e) => handleElementResize(e, resizeMode.left)} bounds="parent">
              <div className="w-full h-full "></div>
            </Draggable>
          </div>

          {/* right rect anchor */}
          <div
            style={{
              width: anchorRectSize.x + 'px',
              height: anchorRectSize.y + 'px',
              top: elementHeight / 2 - anchorRectSize.y / 2 + 'px',
              right: anchorRectSize.x / -2 + 'px',
              borderWidth: 3.0 / scale + 'px'
            }}
            className="rounded-full border-indigo-400 bg-white absolute cursor-e-resize"
          >
            <Draggable onDrag={(e) => handleElementResize(e, resizeMode.right)} bounds="parent">
              <div className="w-full h-full "></div>
            </Draggable>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
}

export default CanvasElementContainer;
