import type { AnalyticsService } from "./analytics-service";
import { WebAuth } from "auth0-js";
import type { Course } from "../course/course";
import { decrypt, encrypt } from "../utils/utils";
import { replace } from "svelte-spa-router";
import { getKeys } from "../../environment";
import type { IconNavBar } from "../../components/iconography/icon-lib";
import { profile } from "../course/stores";

export interface User {
  userId: string;
  email: string;
  picture: string;
  name: string;
  nickname: string;
  onlineStatus: string;
}

const auth0 = new WebAuth({
  domain: getKeys().auth0.domain,
  clientID: getKeys().auth0.clientId,
  redirectUri: getKeys().auth0.redirectUri,
  audience: `https://${getKeys().auth0.domain}/userinfo`,
  responseType: "token id_token",
  scope: "openid",
});

export function checkAuth(course: Course, loType: string, analytics: AnalyticsService) {
  let status = true;
  if (course.authLevel > 0) {
    if (!isAuthenticated()) {
      status = false;
      localStorage.setItem("course_url", course.url);
      login();
    } else {
      const user = fromLocalStorage();
      analytics.reportLogin(user, course.url);
    }
  }
  return status;
}

export function handleAuthentication(result: string, analytics: AnalyticsService): void {
  let authResult = new URLSearchParams(result);
  const accessToken = authResult.get("access_token");
  const idToken = authResult.get("id_token");
  if (accessToken && idToken) {
    auth0.client.userInfo(accessToken, function (err, user) {
      if (err) {
        console.log("Error loading the Profile", err);
      }
      toLocalStorage(user);
      const url = localStorage.getItem("course_url");
      user.userId = encrypt(user.email);
      analytics.reportLogin(user, url);
      setSession(authResult);
      replace(`/course/${url}`);
    });
  }
}

export function logout() {
  clearLocalStorage();
}

export function isAuthenticated() {
  if (!hasId()) {
    return false;
  }
  let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
  if (expiresAt) {
    return new Date().getTime() < expiresAt;
  }
  return false;
}

export function getUserId() {
  const user = fromLocalStorage();
  return user.userId;
}

function login() {
  auth0.authorize({ prompt: "login", scope: "openid profile email" });
}

function setSession(authResult: URLSearchParams) {
  const hour = 3600000;
  const expireAtTime = hour * 24 * 7 + new Date().getTime();
  let expiresAt = JSON.stringify(expireAtTime);
  localStorage.setItem("access_token", authResult.get("acces_token"));
  localStorage.setItem("id_token", authResult.get("id_token"));
  localStorage.setItem("expires_at", expiresAt);
}

export function getUserEmail() {
  const user = fromLocalStorage();
  return user.email;
}

function hasId(): boolean {
  const id = localStorage.getItem("id");
  if (id) {
    return true;
  }
  return false;
}

function toLocalStorage(user: User) {
  const id = encrypt(user.email);
  const info = encrypt(user.name);
  const picture = encrypt(user.picture);
  const nickname = encrypt(user.nickname);
  localStorage.setItem("id", id);
  localStorage.setItem("info", info);
  localStorage.setItem("infoextra", picture);
  localStorage.setItem("infoextraplus", nickname);
}

function fromLocalStorage() {
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

export function clearLocalStorage() {
  localStorage.removeItem("id");
  localStorage.removeItem("info");
  localStorage.removeItem("infoextra");
  localStorage.removeItem("infoextraplus");
  localStorage.removeItem("course_url");
  localStorage.removeItem("access_token");
  localStorage.removeItem("id_token");
  localStorage.removeItem("expires_at");
}
