export const windowSize = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536
};

export const canvasSidebarItem = {
  template: 0,
  shape: 1,
  media: 2,
  text: 3,
  table: 4,
  layout: 5,
  project: 6,
  mapping: 7,
  other: 8
};

export const canvasHeaderMenu = {
  unselect: -1,
  file: 0,
  edit: 1,
  view: 2,
  other: 3
};

export const canvasHeaderFileMenu = {
  unselect: -1,
  new: 0,
  open: 1,
  share: 2,
  save: 3,
  saveAsTemplate: 4,
  saveAsFormat: 5,
  saveOther: 6,
  print: 7,
  clearCanvas: 8,
  resizeCanvas: 9
};

export const canvasHeaderOtherMenu = {
  unselect: -1,
  lang: 0,
  theme: 1,
  addMember: 2
};

export const canvasLayout = {
  headerHeight: 36,
  canvasHeaderHeight: 25,
  sidebarWidth: 60,
  sidebarDetailDragWidth: 25
};

export const canvasUnit = {
  inch: 'in',
  mm: 'mm',
  percent: '%',
  px: 'px',
  cm: 'cm'
};

export const canvasDetails = [
  {
    id: 0,
    name: 'A3',
    width: 297,
    height: 420,
    unit: canvasUnit.mm,
    dpi: 300,
    thumbnailScale: 0.23
  },
  {
    id: 1,
    name: 'A4',
    width: 210,
    height: 297,
    unit: canvasUnit.mm,
    dpi: 300,
    thumbnailScale: 0.3
  },
  {
    id: 2,
    name: 'A5',
    width: 148,
    height: 210,
    unit: canvasUnit.mm,
    dpi: 300,
    thumbnailScale: 0.35
  },
  {
    id: 3,
    name: 'B3',
    width: 353,
    height: 500,
    unit: canvasUnit.mm,
    dpi: 300,
    thumbnailScale: 0.2
  },
  {
    id: 4,
    name: 'B4',
    width: 250,
    height: 353,
    unit: canvasUnit.mm,
    dpi: 300,
    thumbnailScale: 0.21
  },
  {
    id: 5,
    name: 'B5',
    width: 176,
    height: 250,
    unit: canvasUnit.mm,
    dpi: 300,
    thumbnailScale: 0.25
  },
  {
    id: 6,
    name: 'Letter',
    width: 8.5,
    height: 11,
    unit: canvasUnit.inch,
    dpi: 300,
    thumbnailScale: 5
  },
  {
    id: 7,
    name: 'Ledger',
    width: 11,
    height: 17,
    unit: canvasUnit.inch,
    dpi: 300,
    thumbnailScale: 5
  },
  {
    id: 8,
    name: 'Bussiness Card',
    width: 3.5,
    height: 2,
    unit: canvasUnit.inch,
    dpi: 300,
    thumbnailScale: 20
  }
];

export const canvasElementType = {
  text: 0,
  circle: 1,
  rectangle: 2,
  line: 3,
  square: 4,
  triangle: 5,
  pentagon: 6
};
