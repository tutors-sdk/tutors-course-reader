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
  faUsersCog
} from "@fortawesome/free-solid-svg-icons";

import Icon,{
  AcademicCap,
  Archive,
  ArrowLeft,
  Bookmark,
  BookOpen,
  Beaker,
  ChatAlt2,
  Collection,
  Home,
  Logout,
  MenuAlt2,
  Moon,
  Play,
  PresentationChartBar,
  Terminal,
  UserGroup,
  VideoCamera,
  ViewBoards,
  VolumeUp
} from "svelte-hero-icons";
import { colours } from "./colours";
import { faGithub, faSlack, faYoutube, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";

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
  programHome: { icon: faTh, colour: colours.blue["500"] },
  moduleHome: { icon: faHome, colour: colours.blue["500"] },

  // companion Icons
  slack: { icon: ChatAlt2 },
  moodle: { icon: AcademicCap },
  youtube: { icon: Play },
  video: { icon: Play },
  zoom: { icon: VideoCamera },

  // Lo icons
  course: { icon: BookOpen },
  topic: { icon: ViewBoards },
  unit: { icon: faProjectDiagram, colour: colours.green["700"] },
  talk: { icon: VolumeUp },
  reference: { icon: faObjectGroup, colour: colours.indigo["500"] },
  lab: { icon: Beaker },
  archive: { icon: Archive },
  web: { icon: Bookmark },
  github: { icon: Terminal },
  panelvideo: { icon: Play },

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
  tutors: { icon: faChalkboardTeacher, colour: colours.blue["500"] },
  logout: { icon: Logout },
  dark: { icon: Moon },
  toc: { icon: MenuAlt2 },

  workshop: { icon: UserGroup },
};

export function getIcon(type: string): IconType {
  return IconLib[type];
}
