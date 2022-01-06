import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

export const fetch_reminders = createAsyncThunk(
  "reminder/fetch_reminders",
  async () => {
    const { data, status } = await API.get();

    if (status === 200) return data;
  }
);

export const fetch_single_reminder = createAsyncThunk(
  "reminder/fetch_single_reminder",
  async (id) => {
    const { data, status } = await API.get(`?id=${id}`);

    if (status === 200) return data[0];
  }
);

export const filter_reminders = createAsyncThunk(
  "reminder/filter_reminders",
  async (filter) => {
    if (filter === 3) {
      const { data, status } = await API.get();
      if (status === 200) return data;
    } else {
      const { data, status } = await API.get(`?status.code=${filter}`);

      if (status === 200) return data;
    }
  }
);

export const search_reminder = createAsyncThunk(
  "reminder/search_reminder",
  async (keyword) => {
    if (keyword === "") {
      const { data, status } = await API.get();
      if (status === 200) return data;
    } else {
      const { data, status } = await API.get(`?title=${keyword}`);

      if (status === 200) return data;
    }
  }
);

export const delete_reminder = createAsyncThunk(
  "reminder/delete_reminder",
  async (id) => {
    const { status } = await API.delete(`/${id}`);

    if (status === 200) {
      return id;
    }
  }
);

export const reminderSlice = createSlice({
  name: "reminder",
  initialState: {
    status: "idle",
    reminders: [],
    selected: {},
  },
  extraReducers: {
    [fetch_reminders.pending]: (state) => {
      state.status = "loading";
    },
    [fetch_reminders.fulfilled]: (state, action) => {
      state.reminders = action.payload;
      state.status = "idle";
    },
    [fetch_reminders.rejected]: (state) => {
      state.status = "failed";
    },
    [filter_reminders.pending]: (state) => {
      state.status = "loading";
    },
    [filter_reminders.fulfilled]: (state, action) => {
      state.reminders = action.payload;
      state.status = "idle";
    },
    [filter_reminders.rejected]: (state) => {
      state.status = "failed";
    },
    [fetch_single_reminder.pending]: (state) => {
      state.status = "loading";
    },
    [fetch_single_reminder.fulfilled]: (state, action) => {
      state.status = "idle";
      state.selected = action.payload;
    },
    [fetch_single_reminder.rejected]: (state) => {
      state.status = "failed";
    },
    [delete_reminder.pending]: (state) => {
      state.status = "loading";
    },
    [delete_reminder.fulfilled]: (state, action) => {
      state.status = "idle";
      state.reminders = state.reminders.filter(
        (item) => item.id !== action.payload
      );
    },
    [delete_reminder.rejected]: (state) => {
      state.status = "failed";
    },
    [search_reminder.pending]: (state) => {
      state.status = "loading";
    },
    [search_reminder.fulfilled]: (state, action) => {
      state.status = "idle";
      state.reminders = action.payload;
    },
    [search_reminder.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default reminderSlice.reducer;
