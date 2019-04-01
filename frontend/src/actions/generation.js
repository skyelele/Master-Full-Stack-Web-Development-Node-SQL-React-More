import { GENERATION_ACTION_TYPE } from "./types";

// FUNCTION that is RETURNING an action object :)
export const generationActionCreator = payload => {
  return {
    type: GENERATION_ACTION_TYPE,
    generation: payload
  };
};
