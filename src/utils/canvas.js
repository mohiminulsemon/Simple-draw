import { canvasUnit } from './constants';

export const diffPoints = (p1, p2) => {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
};

export const addPoints = (p1, p2) => {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
};

export const scalePoint = (p, scale) => {
  return { x: p.x / scale, y: p.y / scale };
};

export const mm2cm = (mm) => {
  return (mm / 10).toFixed(2);
};

export const cm2mm = (cm) => {
  return (cm * 10).toFixed(2);
};

export const mm2inch = (mm) => {
  return (mm * 0.0393701).toFixed(2);
};

export const cm2inch = (cm) => {
  return mm2inch(cmtomm(cm));
};

export const inch2mm = (inch) => {
  return (inch / 0.0393701).toFixed(2);
};

export const inch2cm = (inch) => {
  return mm2cm(inch2mm(inch));
};

export const mm2px = (mm) => {
  return parseInt(mm / (25.4 / 300));
};

export const px2mm = (px) => {
  return parseInt(px * (25.4 / 300));
};

export const cm2px = (cm) => {
  return mm2px(cm2mm(cm));
};

export const px2cm = (px) => {
  return mm2cm(px2mm(px));
};

export const inch2px = (inch) => {
  return mm2px(inch2mm(inch));
};

export const px2inch = (px) => {
  return mm2inch(px2mm(px));
};

export const convertCanvasUnit = (value, from, to) => {
  if (from == to) {
    return value;
  }

  if (from == canvasUnit.mm) {
    // console.log('from is mm');
    if (to == canvasUnit.cm) {
      // console.log('to is cm');
      return mm2cm(value);
    } else if (to == canvasUnit.inch) {
      // console.log('to is inch');
      return mm2inch(value);
    } else if (to == canvasUnit.px) {
      // console.log('to is px');
      return mm2px(value);
    }
  } else if (from == canvasUnit.cm) {
    // console.log('from is cm');
    if (to == canvasUnit.mm) {
      // console.log('to is mm');
      return cm2mm(value);
    } else if (to == canvasUnit.inch) {
      // console.log('to is inch');
      return cm2inch(value);
    } else if (to == canvasUnit.px) {
      // console.log('to is px');
      return cm2px(value);
    }
  } else if (from == canvasUnit.inch) {
    // console.log('from is inch');
    if (to == canvasUnit.cm) {
      // console.log('to is cm');
      return inch2cm(value);
    } else if (to == canvasUnit.mm) {
      // console.log('to is mm');
      return inch2mm(value);
    } else if (to == canvasUnit.px) {
      // console.log('to is px');
      return inch2px(value);
    }
  } else if (from == canvasUnit.px) {
    // console.log('from is px');
    if (to == canvasUnit.mm) {
      // console.log('to is mm');
      return px2mm(value);
    } else if (to == canvasUnit.cm) {
      // console.log('to is cm');
      return px2cm(value);
    } else if (to == canvasUnit.inch) {
      // console.log('to is inch');
      return px2inch(value);
    }
  }
  return value;
};
