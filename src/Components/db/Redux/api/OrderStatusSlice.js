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
export const getStatusOrder = createAsyncThunk("getStatusOrder", async () => {
  const response = await AxiosInstance.get(`/order/status/all`);

  return response.data.status;
});
export const deleteStatusOrder = createAsyncThunk(
  "deleteStatusOrder",
  async (body) => {
    try {
      const resp = await AxiosInstance.delete(
        `/order/status/remove?id=${body}`
      );

      if (resp.data.message === "Üstünlikli!") {
        const response = await AxiosInstance.get("/order/status/all");
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
export const createStatusOrder = createAsyncThunk(
  "createStatusOrder",
  async (body) => {
    try {
      const resp = await AxiosInstance.post("/order/status/add", body);
      if (resp.data.message === "Sargyt status döredildi!") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/order/status/all");
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
export const updateStatusOrder = createAsyncThunk(
  "updateStatusOrder",
  async (body) => {
    try {
      const resp = await AxiosInstance.put("/order/status/update", body);

      if (resp.data.message === "Üstünlikli!") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/order/status/all");
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

const orderStatusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getStatusOrder.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getStatusOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meta = action.payload.meta;
        state.data = action.payload;
      })
      .addCase(getStatusOrder.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete

      .addCase(deleteStatusOrder.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteStatusOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteStatusOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create

      .addCase(createStatusOrder.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createStatusOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createStatusOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update

      .addCase(updateStatusOrder.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateStatusOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateStatusOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // get
  },
});

export default orderStatusSlice.reducer;
