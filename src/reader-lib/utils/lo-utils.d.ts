import type { Lo } from '../course/lo';
export declare function injectCourseUrl(lo: Lo, url: any): void;
export declare function removeLeadingHashes(str: string): string;
export declare function findCourseUrls(labUrl: string): string[];
export declare function lastSegment(url: string): string;
export declare function threadLos(parent: Lo): void;
export declare function findLos(los: Lo[], lotype: string): Lo[];
export declare function findVideoLos(los: Lo[]): Lo[];
export declare function allLos(lotype: string, los: Lo[]): Lo[];
export declare function allVideoLos(los: Lo[]): Lo[];
export declare function fixRoutes(lo: Lo): void;
export declare function getSortedUnits(los: Lo[]): Lo[];
