import { faYoutube, faSlack, faGithub, faYoutubeSquare } from "@fortawesome/free-brands-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons/faAddressCard";
import {
  faClock as farClock,
  faEye as farEye,
  faCircle,
  faArrowAltCircleDown,
} from "@fortawesome/free-solid-svg-icons";

import type { Lo } from "../../services/lo";

import {
  faBook,
  faSitemap,
  faObjectGroup,
  faFlask,
  faFileArchive,
  faGraduationCap,
  faHome,
  faTh,
  faBars,
  faFilm,
  faBookmark,
  faChalkboardTeacher,
  faSearch,
  faFilePdf,
  faSignOutAlt,
  faHistory,
  faEye,
  faClock,
  faStopwatch,
  faFileExcel,
  faUserClock,
  faToggleOn,
  faToggleOff,
  faAngleDoubleRight,
  faMinusCircle,
  faPlusCircle,
  faArrowAltCircleUp,
  faArrowCircleDown,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

export interface IconNav {
  link: string;
  icon: string;
  tip: string;
  target: "";
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
};

export function getIcon(lo: Lo) {
  return faIcons[lo.type];
}
