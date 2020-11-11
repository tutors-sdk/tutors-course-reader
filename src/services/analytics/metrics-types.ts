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

export type MetricUpdate = (user: User, loTitle: string) => void;
