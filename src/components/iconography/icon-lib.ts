import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faBars,
  faBook,
  faBookmark,
  faChalkboardTeacher,
  faExchangeAlt,
  faExpand,
  faFileArchive,
  faFileExcel,
  faFlask,
  faGraduationCap,
  faHistory,
  faHome,
  faMoon,
  faObjectGroup,
  faPrint,
  faSearch,
  faSignOutAlt,
  faSitemap,
  faSync,
  faTh,
  faVideo,
  faProjectDiagram,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { colours } from "./colours";
import { faGithub, faSlack, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";

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

const IconLib = {
  // Home Icons
  programHome: { icon: faTh, colour: colours.blue["600"] },
  moduleHome: { icon: faHome, colour: colours.blue["600"] },

  // companion Icons
  slack: { icon: faSlack, colour: colours.red["900"] },
  moodle: { icon: faGraduationCap, colour: colours.amber["500"] },
  youtube: { icon: faYoutubeSquare, colour: colours.red["500"] },
  video: { icon: faYoutubeSquare, colour: colours.red["500"] },
  zoom: { icon: faVideo, colour: colours.blue["500"] },

  // Lo icons
  course: { icon: faBook, colour: colours.blue["500"] },
  topic: { icon: faSitemap, colour: colours.emerald["500"] },
  unit: { icon: faProjectDiagram, colour: colours.green["700"] },
  talk: { icon: faObjectGroup, colour: colours.emerald["500"] },
  reference: { icon: faObjectGroup, colour: colours.indigo["500"] },
  lab: { icon: faFlask, colour: colours.teal["600"] },
  archive: { icon: faFileArchive, colour: colours.indigo["500"] },
  web: { icon: faBookmark, colour: colours.blue["500"] },
  github: { icon: faGithub, colour: colours.blue["500"] },
  panelvideo: { icon: faYoutubeSquare, colour: colours.red["500"] },

  // pdf reader icons
  left: { icon: faArrowLeft, colour: colours.emerald["500"] },
  right: { icon: faArrowRight, colour: colours.emerald["500"] },
  print: { icon: faPrint, colour: colours.emerald["500"] },
  rotate: { icon: faSync, colour: colours.emerald["500"] },
  download: { icon: faArrowDown, colour: colours.emerald["500"] },
  fullScreen: { icon: faExpand, colour: colours.emerald["500"] },
  expand: { icon: faExchangeAlt, colour: colours.emerald["500"] },

  // tutors time icons
  tutorsTime: { icon: faHistory, colour: colours.rose["700"] },
  timeExport: { icon: faFileExcel, colour: colours.green["600"] },
  live: { icon: faUsers, colour: colours.cyan["500"] },

  // app icons
  search: { icon: faSearch, colour: colours.blue["500"] },
  tutors: { icon: faChalkboardTeacher, colour: colours.blue["700"] },
  logout: { icon: faSignOutAlt, colour: colours.green["700"] },
  dark: { icon: faMoon, colour: colours.blueGray["500"] },
  toc: { icon: faBars, colour: colours.blue["500"] },
};

export function getIcon(type: string): IconType {
  return IconLib[type];
}
