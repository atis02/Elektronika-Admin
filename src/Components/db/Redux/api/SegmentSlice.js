import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  status: "idle",
  error: null,
  loading: false,
};
// Create an async thunk for the GET request
export const getSegment = createAsyncThunk("getSegment", async () => {
  const response = await AxiosInstance.get(`/segment/all`);

  return response.data.segments;
});
export const deleteSegment = createAsyncThunk("deleteSegment", async (body) => {
  try {
    const resp = await AxiosInstance.delete(`/segment/remove?id=${body.id}`);

    if (resp.data.message === "Üstünlikli!") {
      const response = await AxiosInstance.get("/segment/all");
      toast.success("Üstünlikli!");

      return response.data.segments;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    toast.error(error.data);
  }
});
export const createSegment = createAsyncThunk("createSegment", async (body) => {
  try {
    const resp = await AxiosInstance.post("/segment/add", body);
    if (resp.data.message === "Segment döredildi!") {
      toast.success("Üstünlikli!");
      const response = await AxiosInstance.get("/segment/all");
      return response.data.segments;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    toast.error(error.response?.data?.message);
    return [];
  }
});
export const updateSegment = createAsyncThunk("updateSegment", async (body) => {
  try {
    const resp = await AxiosInstance.put("/segment/update", body);
    if (resp.data.message === "Üstünlikli!") {
      toast.success("Üstünlikli!");
      const response = await AxiosInstance.get("/segment/all");
      return response.data.segments;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    toast.error(error.message);
  }
});
// Create the slice

const segmentSlice = createSlice({
  name: "segment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getSegment.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getSegment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meta = action.payload.meta;
        state.data = action.payload;
      })
      .addCase(getSegment.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete

      .addCase(deleteSegment.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteSegment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteSegment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create

      .addCase(createSegment.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createSegment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createSegment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update

      .addCase(updateSegment.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateSegment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateSegment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // get
  },
});

export default segmentSlice.reducer;
