import { WebAuth } from "auth0-js";
import type { Course } from "./course";
import { decrypt, encrypt } from "./utils/utils";
import { replace } from "svelte-spa-router";

import { getKeys } from "../environment";

const authLevels = {
  course: 4,
  topic: 3,
  talk: 2,
  wall: 2,
  lab: 1,
};

export interface User {
  userId: string;
  email: string;
  picture: string;
  name: string;
  nickname: string;
  onlineStatus: string;
}

export class AuthService {
  auth0 = new WebAuth({
    domain: getKeys().auth0.domain,
    clientID: getKeys().auth0.clientId,
    redirectUri: getKeys().auth0.redirectUri,
    audience: `https://${getKeys().auth0.domain}/userinfo`,
    responseType: "token id_token",
    scope: "openid",
  });

  constructor() {}

  isProtected(course: Course, loType: string) {
    return course.authLevel >= authLevels[loType];
  }

  checkAuth(course: Course, loType: string) {
    let status = true;
    if (this.isProtected(course, loType)) {
      if (!this.isAuthenticated()) {
        status = false;
        localStorage.setItem("course_url", course.url);
        this.login();
      } else {
        const user = this.fromLocalStorage();
        //this.eb.emitLogin(user, course.url);
      }
    }
    return status;
  }

  handleAuthentication(result: string): void {
    console.log(result);
    let authResult = new URLSearchParams(result);
    const accessToken = authResult.get("access_token");
    const idToken = authResult.get("id_token");
    if (accessToken && idToken) {
      let that = this;
      this.auth0.client.userInfo(accessToken, function (err, user) {
        if (err) {
          console.log("Error loading the Profile", err);
        }
        that.toLocalStorage(user);
        const url = localStorage.getItem("course_url");
        user.userId = encrypt(user.email);
      });
      this.setSession(authResult);
      const url = localStorage.getItem("course_url");
      replace(`/course/${url}`);
    }
  }

  login() {
    this.auth0.authorize({ prompt: "login", scope: "openid profile email" });
  }

  setSession(authResult: URLSearchParams) {
    const hour = 3600000;
    const expireAtTime = hour * 24 * 7 + new Date().getTime();
    let expiresAt = JSON.stringify(expireAtTime);
    localStorage.setItem("access_token", authResult.get("acces_token"));
    localStorage.setItem("id_token", authResult.get("id_token"));
    localStorage.setItem("expires_at", expiresAt);
  }

  logout() {
    this.clearLocalStorage();
    //this.authNotifier.emit("authChange", false);
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    if (expiresAt) {
      return new Date().getTime() < expiresAt;
    }
    return false;
  }

  getUserEmail() {
    const user = this.fromLocalStorage();
    return user.email;
  }

  hasId(): boolean {
    const id = localStorage.getItem("id");
    if (id) {
      return true;
    }
    return false;
  }

  getUserId() {
    const user = this.fromLocalStorage();
    return user.userId;
  }

  toLocalStorage(user: User) {
    const id = encrypt(user.email);
    const info = encrypt(user.name);
    const picture = encrypt(user.picture);
    const nickname = encrypt(user.nickname);
    localStorage.setItem("id", id);
    localStorage.setItem("info", info);
    localStorage.setItem("infoextra", picture);
    localStorage.setItem("infoextraplus", nickname);
  }

  fromLocalStorage() {
    const id = localStorage.getItem("id");
    const user = {
      userId: localStorage.getItem("id"),
      email: decrypt(id),
      picture: decrypt(localStorage.getItem("infoextra")),
      name: decrypt(localStorage.getItem("info")),
      nickname: decrypt(localStorage.getItem("infoextraplus")),
      onlineStatus: "",
    };
    return user;
  }

  clearLocalStorage() {
    localStorage.removeItem("id");
    localStorage.removeItem("info");
    localStorage.removeItem("infoextra");
    localStorage.removeItem("infoextraplus");
    localStorage.removeItem("course_url");
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }
}
