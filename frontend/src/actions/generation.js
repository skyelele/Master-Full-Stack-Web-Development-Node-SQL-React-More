import { GENERATION } from "./types";
import { BACKEND } from "../config";

// applyMiddleware and thunk will handle this
// action creator in such a way that
// the function itself is returned
// and not an object.

export const fetchGeneration = () => dispatch => {
  dispatch({ type: GENERATION.FETCH });

  return fetch(`${BACKEND.ADDRESS}/generation`)
    .then(response => response.json())
    .then(json => {
      if (json.type === "error") {
        dispatch({
          type: GENERATION.FETCH_ERROR,
          message: json.message
        });
      } else {
        dispatch({
          type: GENERATION.FETCH_SUCCESS,
          generation: json.generation
        });
      }
    })
    .catch(error =>
      dispatch({
        type: GENERATION.FETCH_ERROR,
        message: error.message
      })
    );
};
