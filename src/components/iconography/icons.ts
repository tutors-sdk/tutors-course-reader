import { faGithub, faSlack, faYoutube, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons/faAddressCard";
import {
  faAngleDoubleRight,
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faBars,
  faBook,
  faBookmark,
  faChalkboardTeacher,
  faChevronLeft,
  faClock as farClock,
  faClock,
  faExchangeAlt,
  faExpand,
  faEye as farEye,
  faEye,
  faFileArchive,
  faFileExcel,
  faFilePdf,
  faFilm,
  faFlask,
  faGraduationCap,
  faHistory,
  faHome,
  faMinusCircle,
  faMoon,
  faObjectGroup,
  faPlusCircle,
  faPrint,
  faSearch,
  faSignOutAlt,
  faSitemap,
  faSync,
  faTh,
  faToggleOff,
  faToggleOn,
  faUserClock,
  faVideo,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";

import type { Lo } from "../../services/course/lo";

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

export const faIcons = {
  course: faBook,
  topic: faSitemap,
  talk: faObjectGroup,
  reference: faObjectGroup,
  lab: faFlask,
  archive: faFileArchive,
  panelvideo: faYoutube,
  video: faYoutube,
  adobeconnect: faAddressCard,
  slack: faSlack,
  moodle: faGraduationCap,
  github: faGithub,
  youtube: faYoutubeSquare,
  moduleHome: faHome,
  programHome: faTh,
  toc: faBars,
  film: faFilm,
  web: faBookmark,
  unit: faBookmark,
  tutors: faChalkboardTeacher,
  search: faSearch,
  pdf: faFilePdf,
  logout: faSignOutAlt,
  tutorsTime: faHistory,
  labViewDetail: faEye,
  labViewSummary: farEye,
  labTimeDetail: faClock,
  labTimeSummary: farClock,
  timeExport: faFileExcel,
  timeLive: faUserClock,
  switchOn: faToggleOn,
  switchOff: faToggleOff,
  topicNavigator: faAngleDoubleRight,
  zoomOut: faMinusCircle,
  zoomIn: faPlusCircle,
  up: faArrowAltCircleUp,
  down: faArrowAltCircleDown,
  zoom: faVideo,
  close: faWindowClose,
  left: faArrowLeft,
  right: faArrowRight,
  print: faPrint,
  rotate: faSync,
  download: faArrowDown,
  fullScreen: faExpand,
  expand: faExchangeAlt,
  contract: faChevronLeft,
  dark: faMoon,
};

export function getIcon(lo: Lo) {
  return faIcons[lo.type];
}

export function getIconFromType(type: string) {
  return faIcons[type];
}
