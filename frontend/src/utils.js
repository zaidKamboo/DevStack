import { createSelector } from "reselect";
const AUTH_ROUTES = "/auth";
export const LOGIN_ROUTE = AUTH_ROUTES + "/login";
export const LOGOUT_ROUTE = AUTH_ROUTES + "/logout";
export const SIGNUP_ROUTE = AUTH_ROUTES + "/signup";

const USER_ROUTES = "/user";
export const GET_PROFILE_ROUTE = USER_ROUTES + "/profile";

const cache = new Map();
export const select = (path) => {
  if (cache.has(path)) return cache.get(path);

  const selector = createSelector(
    (state) => state,
    (state) => path.split(".").reduce((acc, key) => acc?.[key], state)
  );

  cache.set(path, selector);
  return selector;
};
