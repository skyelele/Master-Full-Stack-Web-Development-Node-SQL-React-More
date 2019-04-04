import { ACCOUNT } from "./types";
import { BACKEND } from "../config";

export const signup = ({ username, password }) => dispatch => {
  dispatch({ type: ACCOUNT.FETCH });

  return fetch(`${BACKEND.ADDRESS}/account/signup`, {
    method: "POST",
    // Info sending to the backend
    // must send JSON data in the string format :)
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
    // Enables cookies to be sent to browser
    credentials: "include"
  })
    .then(response => response.json())
    .then(json => {
      if (json.type === "error") {
        dispatch({ type: ACCOUNT.FETCH_ERROR, message: json.message });
      } else {
        dispatch({ type: ACCOUNT.FETCH_SUCCESS, ...json });
      }
    })
    .catch(error => {
      dispatch({
        type: ACCOUNT.FETCH_ERROR,
        message: error.message
      });
    });
};
