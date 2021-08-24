import homeIcon from "@iconify/icons-la/home";
import universityIcon from "@iconify/icons-la/university";
import slackIcon from "@iconify/icons-logos/slack-icon";
import youtubeIcon from "@iconify/icons-logos/youtube-icon";
import chalkboardTeacher from "@iconify/icons-la/chalkboard-teacher";
import flaskIcon from "@iconify/icons-la/flask";
import projectDiagram from "@iconify/icons-la/project-diagram";
import bookOpen from "@iconify/icons-la/book-open";
import moonIcon from "@iconify/icons-la/moon";
import { colours } from "./colours";
import barsIcon from "@iconify/icons-la/bars";
import gripVertical from "@iconify/icons-la/grip-vertical";
import gripHorizontal from "@iconify/icons-la/grip-horizontal";
import arrowLeft from '@iconify/icons-la/arrow-left';
import arrowRight from '@iconify/icons-la/arrow-right';
import digitalTachograph from '@iconify/icons-la/digital-tachograph';
import redoAlt from '@iconify/icons-la/redo-alt';
import arrowDown from '@iconify/icons-la/arrow-down';
import arrowsAlt from '@iconify/icons-la/arrows-alt';
import folderOpen from '@iconify/icons-la/folder-open';

export const LineAwesomeIconLib = {
  // Home Icons
  programHome: { icon: homeIcon, colour: colours.blue["500"] },
  moduleHome: { icon: homeIcon, colour: colours.blue["500"] },

  // companion Icons
  slack: { icon: slackIcon, colour: "error" },
  moodle: { icon: universityIcon, colour: "warning" },
  youtube: { icon: youtubeIcon, colour: "error" },
  video: { icon: youtubeIcon, colour: "error" },
  zoom: { icon: homeIcon, colour: "info" },

  // Lo icons
  course: { icon: bookOpen, colour: "info" },
  topic: { icon: projectDiagram, colour: "info" },
  unit: { icon: digitalTachograph, colour: "success" },
  talk: { icon: chalkboardTeacher, colour: "info" },

  reference: { icon: folderOpen, colour: "warning" },
  lab: { icon: flaskIcon, colour: "success" },
  archive: { icon: homeIcon, colour: "info" },
  web: { icon: folderOpen, colour: "info" },
  github: { icon: homeIcon, colour: "warning" },
  panelvideo: { icon: youtubeIcon, colour: "error" },

  // pdf reader icons
  left: { icon: arrowLeft, colour: "success" },
  right: { icon: arrowRight, colour: "success" },
  print: { icon: homeIcon, colour: "success" },
  rotate: { icon: redoAlt, colour: "success" },
  download: { icon: arrowDown, colour: "success" },
  fullScreen: { icon: arrowsAlt, colour: "success" },
  expand: { icon: homeIcon, colour: "success" },

  // tutors time icons
  tutorsTime: { icon: homeIcon, colour: "info" },
  timeExport: { icon: homeIcon, colour: "success" },
  live: { icon: homeIcon, colour: "success" },

  // app icons
  search: { icon: homeIcon, colour: "info" },
  tutors: { icon: homeIcon, colour: "info" },
  logout: { icon: homeIcon, colour: "error" },
  dark: { icon: moonIcon, colour: "warning" },
  toc: { icon: barsIcon },

  workshop: { icon: homeIcon },

  compacted: { icon: gripVertical },
  expanded: { icon: gripHorizontal },

  default: { icon: homeIcon }
};

