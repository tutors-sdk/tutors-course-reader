import type { Topic } from "../course/topic";
import type { Lo } from "../course/lo";

export interface Metric {
  id: string;
  title: string;
  count: number;
  last: string;
  duration: number;
  metrics: Metric[];
}

export interface User {
  userId: string;
  email: string;
  picture: string;
  name: string;
  nickname: string;
  onlineStatus: string;
}

export interface DayMeasure {
  date: string;
  dateObj: number;
  metric: number;
}

export interface UserMetric extends User {
  title: string;
  count: number;
  last: string;
  duration: number;
  metrics: Metric[];
  labActivity: Metric[];
  calendarActivity: DayMeasure[];
}

export interface StudentMetric {
  name: string;
  img: string;
  nickname: string;
  topic: Topic;
  lab: Lo;
  time: number;
}

export type MetricUpdate = (user: User, topic: Topic, lab: Lo, time: number) => void;
export type MetricDelete = (user: User) => void;
