
import homeIcon from '@iconify/icons-la/home';

import universityIcon from '@iconify/icons-la/university';
import slackIcon from '@iconify/icons-logos/slack-icon';
import youtubeIcon from '@iconify/icons-logos/youtube-icon';
import youtube from '@iconify/icons-logos/youtube';
import chalkboardTeacher from '@iconify/icons-la/chalkboard-teacher';
import filePdf from '@iconify/icons-la/file-pdf';
import codeIcon from '@iconify/icons-la/code';
import flaskIcon from '@iconify/icons-la/flask';
import projectDiagram from '@iconify/icons-la/project-diagram';
import bookOpen from '@iconify/icons-la/book-open';
import moonIcon from '@iconify/icons-la/moon';
import { colours } from "./colours";
import barsIcon from '@iconify/icons-la/bars';

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

export const LaIconLib = {
  // Home Icons
  programHome: { icon: homeIcon, colour: colours.blue["500"] },
  moduleHome: { icon: homeIcon, colour: colours.blue["500"] },

  // companion Icons
  slack: { icon: slackIcon, colour: "error" },
  moodle: { icon: universityIcon , colour: "warning" },
  youtube: { icon: youtubeIcon, colour: "error" },
  video: { icon: youtubeIcon, colour: "error" },
  zoom: { icon: homeIcon, colour: "info" },

  // Lo icons
  course: { icon: bookOpen, colour: "info" },
  topic: { icon: projectDiagram, colour: "info" },
  unit: { icon: homeIcon, colour: "success" },
  talk: { icon: chalkboardTeacher, colour: "info" },

  reference: { icon: homeIcon, colour: "warning" },
  lab: { icon: flaskIcon, colour: "success" },
  archive: { icon: homeIcon, colour: "info" },
  web: { icon: homeIcon, colour: "info" },
  github: { icon: homeIcon, colour: "warning" },
  panelvideo: { icon: homeIcon, colour: "error" },

  // pdf reader icons
  left: { icon: homeIcon, colour: "success" },
  right: { icon: homeIcon, colour: "success" },
  print: { icon: homeIcon, colour: "success" },
  rotate: { icon: homeIcon, colour: "success" },
  download: { icon: homeIcon, colour: "success" },
  fullScreen: { icon: homeIcon, colour: "success" },
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
  toc: { icon:barsIcon },

  workshop: { icon: homeIcon },

  compacted : {icon: homeIcon},
  expanded : {icon:homeIcon},

  default : {icon: homeIcon},
};

export function getIcon(type: string): IconType {
  return LaIconLib[type];
}
