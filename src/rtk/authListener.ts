import { createListenerMiddleware } from "@reduxjs/toolkit";
import { signIn, signUp, signOut } from "./authSlice";

export const authListener = createListenerMiddleware();

authListener.startListening({
  matcher: signIn.fulfilled.match,
  effect: (action) => {
    localStorage.setItem("token", action.payload);
  },
});

authListener.startListening({
  matcher: signUp.fulfilled.match,
  effect: (action) => {
    localStorage.setItem("token", action.payload);
  },
});

authListener.startListening({
  actionCreator: signOut,
  effect: () => {
    localStorage.removeItem("token");
  },
});
