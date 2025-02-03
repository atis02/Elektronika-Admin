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
export const getBanner = createAsyncThunk("getBanner", async () => {
  const response = await AxiosInstance.get(`/banner/all`);

  return response.data.banners;
});
export const deleteBanner = createAsyncThunk("deleteBanner", async (body) => {
  try {
    const resp = await AxiosInstance.delete(`/banner/remove?id=${body.id}`);

    if (resp.data.message === "Üstünlikli!") {
      const response = await AxiosInstance.get("/banner/all");
      toast.success("Üstünlikli!");

      return response.data.banners;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    toast.error(error.data);
  }
});
export const createBanner = createAsyncThunk("createBanner", async (body) => {
  try {
    const resp = await AxiosInstance.post("/banner/add", body);
    if (resp.data.message === "Banner üstünlikli döredildi!") {
      toast.success("Üstünlikli!");
      const response = await AxiosInstance.get("/banner/all");
      return response.data.banners;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    toast.error(error.message);
  }
});
export const updateBanner = createAsyncThunk("updateBanner", async (body) => {
  try {
    const resp = await AxiosInstance.put("/banner/update", body);
    if (resp.data.message === "Üstünlikli!") {
      toast.success("Üstünlikli!");
      const response = await AxiosInstance.get("/banner/all");
      return response.data.banners;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    toast.error(error.message);
  }
});
// Create the slice

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getBanner.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meta = action.payload.meta;
        state.data = action.payload;
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete

      .addCase(deleteBanner.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create

      .addCase(createBanner.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update

      .addCase(updateBanner.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // get
  },
});

export default bannerSlice.reducer;
