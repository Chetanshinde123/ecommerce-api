// const { createAsyncThunk } = require("@reduxjs/toolkit");
import { createAsyncThunk } from "@reduxjs/toolkit";

// reset error Action
export const resetErrAction = createAsyncThunk("resetErr-Action", () => {
  return {};
});

// Success error Action
export const resetSuccessAction = createAsyncThunk(
  "resetSuccess-Action",
  () => {
    return {};
  }
);
