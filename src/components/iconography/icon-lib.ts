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
  Clock,
  Collection,
  Home,
  Logout,
  MenuAlt2,
  Moon,
  Play,
  PresentationChartBar,
  SaveAs,
  Terminal,
  UserGroup,
  Users,
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
  slack: { icon: ChatAlt2, colour: 'error' },
  moodle: { icon: AcademicCap, colour: 'warning' },
  youtube: { icon: Play, colour: 'error' },
  video: { icon: Play, colour: 'error' },
  zoom: { icon: VideoCamera, colour: 'info' },

  // Lo icons
  course: { icon: BookOpen, colour: 'info' },
  topic: { icon: ViewBoards, colour: 'info' },
  unit: { icon: faProjectDiagram, colour: colours.green["700"] },
  talk: { icon: VolumeUp, colour: 'info' },
  reference: { icon: faObjectGroup, colour: colours.indigo["500"] },
  lab: { icon: Beaker, colour: 'success' },
  archive: { icon: Archive, colour: 'info' },
  web: { icon: Bookmark, colour: 'info' },
  github: { icon: Terminal, colour: 'warning' },
  panelvideo: { icon: Play, colour: 'error' },

  // pdf reader icons
  left: { icon: faArrowLeft, colour: colours.emerald["500"] },
  right: { icon: faArrowRight, colour: colours.emerald["500"] },
  print: { icon: faPrint, colour: colours.emerald["500"] },
  rotate: { icon: faSync, colour: colours.emerald["500"] },
  download: { icon: faArrowDown, colour: colours.emerald["500"] },
  fullScreen: { icon: faExpand, colour: colours.emerald["500"] },
  expand: { icon: faExchangeAlt, colour: colours.emerald["500"] },

  // tutors time icons
  tutorsTime: { icon: Clock, colour: 'info' },
  timeExport: { icon: SaveAs, colour: 'success' },
  live: { icon: Users, colour: 'success' },

  // app icons
  search: { icon: faSearch, colour: colours.blue["500"] },
  tutors: { icon: AcademicCap, colour: 'info' },
  logout: { icon: Logout, colour: 'error' },
  dark: { icon: Moon, colour: 'warning' },
  toc: { icon: MenuAlt2 },

  workshop: { icon: UserGroup },
};

export function getIcon(type: string): IconType {
  return IconLib[type];
}
