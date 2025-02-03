import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  status: "idle",
  // meta: {
  //   limit: 20,
  //   itemCount: 0,
  //   pageCount: 1,
  //   page: 1,
  //   hasPrevPage: false,
  //   hasNextPage: false,
  // },
  error: null,
  loading: false,
};
// Create an async thunk for the GET request
export const getStatusProduct = createAsyncThunk(
  "getStatusProduct",
  async () => {
    const response = await AxiosInstance.get(`/status/all`);

    return response.data.status;
  }
);
export const deleteStatusProduct = createAsyncThunk(
  "deleteStatusProduct",
  async (body) => {
    try {
      const resp = await AxiosInstance.delete(`/status/remove?id=${body}`);

      if (resp.data.message === "Üstünlikli!") {
        const response = await AxiosInstance.get("/status/all");
        toast.success("Üstünlikli!");

        return response.data.status;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.data);
    }
  }
);
export const createStatusProduct = createAsyncThunk(
  "createStatusProduct",
  async (body) => {
    try {
      const resp = await AxiosInstance.post("/status/add", body);
      if (resp.data.message === "status döredildi!") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/status/all");
        return response.data.status;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      return [];
    }
  }
);
export const updateStatusProduct = createAsyncThunk(
  "updateStatusProduct",
  async (body) => {
    try {
      const resp = await AxiosInstance.put("/status/update", body);

      if (resp.data.message === "Üstünlikli!") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/status/all");
        return response.data.status;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
);
// Create the slice

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getStatusProduct.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getStatusProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meta = action.payload.meta;
        state.data = action.payload;
      })
      .addCase(getStatusProduct.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete

      .addCase(deleteStatusProduct.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteStatusProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteStatusProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create

      .addCase(createStatusProduct.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createStatusProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createStatusProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update

      .addCase(updateStatusProduct.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateStatusProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateStatusProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // get
  },
});

export default statusSlice.reducer;
