import { Role } from "@/types";
import {
  accessToken,
  placeholder,
  privateRoutes,
  publicRoutes,
  restrictedRoutes,
} from "../constants";

export function getToken() {
  return localStorage.getItem(accessToken);
}

export function setToken(token: string) {
  localStorage.setItem(accessToken, token);
}

export function deleteToken() {
  localStorage.removeItem(accessToken);
}

export function getUrlFromObject(url?: string | null, file?: File) {
  if (file) return URL.createObjectURL(file);
  if (url) return url;
  return placeholder;
}

export function formateWord(word: string) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}

export function formatePath(path: string) {
  if (path === "/") return "Home";
  const word = path.replace("/", "");
  return formateWord(word);
}

export function getRoutes(isAuth: boolean, userRole?: Role) {
  let links = isAuth ? privateRoutes : publicRoutes;

  if (isAuth && userRole === Role.SuperAdmin) links = restrictedRoutes;

  return links;
}

export function coordsParser(coords: string) {
  const arr = coords.split(", ");
  return { lat: parseFloat(arr[0]), lng: parseFloat(arr[1]) };
}

export function getFormData(
  data: object,
  files: File[],
  fileFieldName: string
) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  if (files.length) {
    formData.append(fileFieldName, files[0]);
  }

  return formData;
}

export function formatText(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .join(" ")
    .toLowerCase();
}

export function createQueryParams(data: Array<[string, unknown]>) {
  const params: Record<string, unknown> = {};

  data.forEach(([key, value]) => {
    if (value) params[key] = value;
  });

  return params;
}

export function getTextFromMeta(meta: Record<string, string>) {
  return Object.values(meta).join("; ");
}
