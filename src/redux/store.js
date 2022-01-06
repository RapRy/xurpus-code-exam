import { configureStore } from "@reduxjs/toolkit";

import reminderReducers from "./reminderReducers";

export default configureStore({
  reducer: {
    reminder: reminderReducers,
  },
});
