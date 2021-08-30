
export interface IconType {
  icon: any;
  colour: string;
}

export interface IconNav {
  link: string;
  icon: string;
  tip: string;
  target: string;
}

export interface IconNavBar {
  show: boolean;
  bar: IconNav[];
}

export interface IconRef {
  icon : IconType;
  colour : string;
}

export function getIcon(iconLib:any, type: string): IconType {
  return iconLib[type];
}
