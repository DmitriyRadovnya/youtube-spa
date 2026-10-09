import { createListenerMiddleware } from "@reduxjs/toolkit";
import { saveQuery } from "./searchSlice";

export const saveListener = createListenerMiddleware();

saveListener.startListening({
  actionCreator: saveQuery,
  effect: (action, currentState) => {},
});
