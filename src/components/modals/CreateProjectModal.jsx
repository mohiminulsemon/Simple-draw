import React, { useState } from 'react';
import { BasicInput, BasicSelect, IconButton, SimpleBorder } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeCreateProjectModal } from '../../features/projectSlice';
import { canvasDetails, canvasUnit } from '../../utils/constants';
import { convertCanvasUnit } from '../../utils/canvas';
import { routes } from '../../utils/routes';
import { addCanvas } from '../../features/canvasSlice';

function CreateProjectModal() {
  // ------------------------------------------------------------------------------
  // variables
  // ------------------------------------------------------------------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const canvasContentWidth = useSelector((state) => state.persist.canvasReducer.canvasContentWidth);
  const canvasContentHeight = useSelector(
    (state) => state.persist.canvasReducer.canvasContentHeight
  );

  const [name, setName] = useState('新規プロジェクト');
  const [width, setWidth] = useState(canvasDetails[1].width);
  const [height, setHeight] = useState(canvasDetails[1].height);
  const [dpi, setDpi] = useState(canvasDetails[1].dpi);

  const [selectedCanvasDetail, setSelectedCanvasDetail] = useState(canvasDetails[1]);
  const [selectedCanvasUnit, setSelectedCanvasUnit] = useState(canvasDetails[1].unit);

  const canvasUintOptions = [canvasUnit.cm, canvasUnit.inch, canvasUnit.mm, canvasUnit.px];

  // ------------------------------------------------------------------------------
  // functions
  // ------------------------------------------------------------------------------
  const handleModalClose = () => {
    dispatch(closeCreateProjectModal());
  };

  const handleCanvasDetailSelect = (detail) => {
    setSelectedCanvasDetail(detail);
    setWidth(detail.width);
    setHeight(detail.height);
    setDpi(detail.dpi);
    setSelectedCanvasUnit(detail.unit);
  };

  const handleCanvasUnitSelect = (option) => {
    setSelectedCanvasUnit(option);
    const convertedWidth = convertCanvasUnit(
      selectedCanvasDetail.width,
      selectedCanvasDetail.unit,
      option
    );
    const convertedHeight = convertCanvasUnit(
      selectedCanvasDetail.height,
      selectedCanvasDetail.unit,
      option
    );
    setWidth(convertedWidth);
    setHeight(convertedHeight);
  };

  const handleCreateProject = () => {
    console.log('create project');
    const widthPx = convertCanvasUnit(width, selectedCanvasUnit, canvasUnit.px);
    const heightPx = convertCanvasUnit(height, selectedCanvasUnit, canvasUnit.px);

    const scale = parseFloat(window.innerWidth) / parseFloat(widthPx) / 4;

    const offset = {
      x: canvasContentWidth / 2 - (widthPx / 2) * scale,
      y: canvasContentHeight / 2 - (heightPx / 2) * scale
    };

    let newCanvas = {
      width: widthPx,
      height: heightPx,
      scale: scale,
      offset: offset,
      name: name
    };
    dispatch(addCanvas(newCanvas));
    dispatch(closeCreateProjectModal());

    navigate(routes.canvas);
  };

  // ------------------------------------------------------------------------------
  // render
  // ------------------------------------------------------------------------------
  return (
    <div
      className="w-screen h-screen fixed top-0 left-0 z-50 
        dark:bg-zinc-50/30 bg-zinc-700/30 flex justify-center items-center"
    >
      <div
        className="animate-fade-in max-h-screen w-[500px] 
        overflow-auto p-2 bg-zinc-100 dark:bg-zinc-600 
        shadow-[0px_0px_5px_1px] shadow-zinc-400 dark:shadow-zinc-800 
        text-zinc-700 dark:text-zinc-100 text-sm"
      >
        {/* header */}
        <div className="w-full flex justify-between items-center">
          <div>新規プロジェクト</div>
          <IconButton
            onClick={handleModalClose}
            size="22px"
            icon={<i className="fa-solid fa-xmark"></i>}
          />
        </div>

        {/* border */}
        <div className="my-2">
          <SimpleBorder />
        </div>

        {/* name */}
        <div className="w-full my-[6px]">
          <BasicInput value={name} onChange={setName} label="名前:" />
        </div>

        {/* wdith */}
        <div className="w-full my-[6px] flex space-x-2">
          <BasicInput value={width} onChange={setWidth} label="幅:" type="number" width="80px" />
          <BasicSelect
            selectedOption={selectedCanvasUnit}
            options={canvasUintOptions}
            onSelect={handleCanvasUnitSelect}
          />
        </div>

        {/* height */}
        <div className="w-full my-[6px]">
          <BasicInput
            value={height}
            onChange={setHeight}
            label="高さ:"
            type="number"
            width="80px"
          />
        </div>

        {/* dpi */}
        {/* <div className="w-full my-[6px]">
          <BasicInput value={dpi} onChange={setDpi} label="DPI:" type="number" width="80px" />
        </div> */}

        {/* background */}
        {/* <div className="w-full flex my-1">
          <div className="w-[50px]">背景:</div>
          <input type="text" />
        </div> */}

        {/* create button  */}
        <div
          onClick={() => handleCreateProject()}
          className="w-full my-1 text-center bg-zinc-300 dark:bg-zinc-800
          py-1 cursor-pointer rounded-sm
         hover:bg-zinc-400 hover:dark:bg-zinc-900 hover:shadow-md"
        >
          作成
        </div>

        {/* template size */}
        <div className="w-full h-[400px] p-1 overflow-auto">
          <div className="flex flex-wrap gap-2">
            {canvasDetails.map((detail) => (
              <div
                key={detail.id}
                onClick={() => handleCanvasDetailSelect(detail)}
                className={
                  (selectedCanvasDetail.id == detail.id
                    ? 'ring-[2px] ring-indigo-500'
                    : 'ring-[1px] ring-zinc-400 ') +
                  ' w-[150px] h-[150px] flex flex-col justify-end items-center cursor-pointer'
                }
              >
                <div
                  style={{
                    width: detail.width * detail.thumbnailScale + 'px',
                    height: detail.height * detail.thumbnailScale + 'px'
                  }}
                  className="border border-zinc-700 dark:border-zinc-100 "
                ></div>
                <div>{detail.name}</div>
                <div>{detail.width + ' x ' + detail.height + ' ' + detail.unit}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectModal;
