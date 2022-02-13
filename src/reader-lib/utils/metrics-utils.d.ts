import type { UserMetric } from "../types/metrics-types";
export declare function fetchUserById(courseUrl: string, userId: string, allLabs: any): Promise<any>;
export declare function fetchAllUsers(courseUrl: string, allLabs: any): Promise<Map<string, UserMetric>>;
