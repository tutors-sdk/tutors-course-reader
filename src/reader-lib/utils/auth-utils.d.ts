export interface User {
    userId: string;
    email: string;
    picture: string;
    name: string;
    nickname: string;
    onlineStatus: string;
}
export declare function isAuthenticated(): boolean;
export declare function getUserId(): string;
export declare function hasId(): boolean;
export declare function toLocalStorage(user: User): void;
export declare function fromLocalStorage(): User;
export declare function clearLocalStorage(): void;
export declare function setSession(authResult: URLSearchParams): void;
export declare function getUserEmail(): string;
export declare function logout(): void;
export declare function encrypt(str: string): string;
export declare function decrypt(str: string): string;
export declare function formatDate(date: any): string;
