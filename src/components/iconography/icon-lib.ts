import {
  AcademicCap,
  Archive,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowsExpand,
  Beaker,
  Bookmark,
  BookOpen,
  ChatAlt2,
  Clock,
  Collection,
  DocumentDuplicate,
  Home,
  Logout,
  MenuAlt2,
  Moon,
  Play,
  Printer,
  Refresh,
  SaveAs,
  Search,
  SwitchHorizontal,
  Terminal,
  UserGroup,
  Users,
  VideoCamera,
  ViewBoards,
  VolumeUp
} from "svelte-hero-icons";
import { colours } from "./colours";

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
  programHome: { icon: Home, colour: colours.blue["500"] },
  moduleHome: { icon: Home, colour: colours.blue["500"] },

  // companion Icons
  slack: { icon: ChatAlt2, colour: "error" },
  moodle: { icon: AcademicCap, colour: "warning" },
  youtube: { icon: Play, colour: "error" },
  video: { icon: Play, colour: "error" },
  zoom: { icon: VideoCamera, colour: "info" },

  // Lo icons
  course: { icon: BookOpen, colour: "info" },
  topic: { icon: ViewBoards, colour: "info" },
  unit: { icon: Collection, colour: "success" },
  talk: { icon: VolumeUp, colour: "info" },

  reference: { icon: DocumentDuplicate, colour: "warning" },
  lab: { icon: Beaker, colour: "success" },
  archive: { icon: Archive, colour: "info" },
  web: { icon: Bookmark, colour: "info" },
  github: { icon: Terminal, colour: "warning" },
  panelvideo: { icon: Play, colour: "error" },

  // pdf reader icons
  left: { icon: ArrowLeft, colour: "success" },
  right: { icon: ArrowRight, colour: "success" },
  print: { icon: Printer, colour: "success" },
  rotate: { icon: Refresh, colour: "success" },
  download: { icon: ArrowDown, colour: "success" },
  fullScreen: { icon: ArrowsExpand, colour: "success" },
  expand: { icon: SwitchHorizontal, colour: "success" },

  // tutors time icons
  tutorsTime: { icon: Clock, colour: "info" },
  timeExport: { icon: SaveAs, colour: "success" },
  live: { icon: Users, colour: "success" },

  // app icons
  search: { icon: Search, colour: "info" },
  tutors: { icon: AcademicCap, colour: "info" },
  logout: { icon: Logout, colour: "error" },
  dark: { icon: Moon, colour: "warning" },
  toc: { icon: MenuAlt2 },

  workshop: { icon: UserGroup }
};

export function getIcon(type: string): IconType {
  return IconLib[type];
}
