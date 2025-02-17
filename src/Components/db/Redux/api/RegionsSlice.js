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
export const getDeliveryCityPrice = createAsyncThunk(
  "getDeliveryCityPrice",
  async () => {
    const response = await AxiosInstance.get(`/order/deliveryCity/all`);

    return response.data.deliveryPrice;
  }
);
export const deleteDeliveryCityPrice = createAsyncThunk(
  "deleteDeliveryCityPrice",
  async (body) => {
    try {
      const resp = await AxiosInstance.delete(
        `/order/deliveryCity/remove?id=${body}`
      );

      if (resp.data.message === "Üstünlikli!") {
        const response = await AxiosInstance.get("/order/deliveryCity/all");
        toast.success("Üstünlikli!");

        return response.data.deliveryPrice;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.data);
    }
  }
);
export const createDeliveryCityPrice = createAsyncThunk(
  "createDeliveryCityPrice",
  async (body) => {
    try {
      const resp = await AxiosInstance.post("/order/deliveryCity/add", body);
      if (resp.data.message === "Üstünlikli döredildi!") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/order/deliveryCity/all");
        return response.data.deliveryPrice;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      return [];
    }
  }
);
export const updateDeliveryCityPrice = createAsyncThunk(
  "updateDeliveryCityPrice",
  async (body) => {
    try {
      const resp = await AxiosInstance.put("/order/deliveryCity/update", body);

      if (resp.data.message === "Üstünlikli!") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/order/deliveryCity/all");
        return response.data.deliveryPrice;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
);
// Create the slice

const deliveryCitySlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getDeliveryCityPrice.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getDeliveryCityPrice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meta = action.payload.meta;
        state.data = action.payload;
      })
      .addCase(getDeliveryCityPrice.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete

      .addCase(deleteDeliveryCityPrice.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteDeliveryCityPrice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteDeliveryCityPrice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create

      .addCase(createDeliveryCityPrice.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createDeliveryCityPrice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createDeliveryCityPrice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update

      .addCase(updateDeliveryCityPrice.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateDeliveryCityPrice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateDeliveryCityPrice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // get
  },
});

export default deliveryCitySlice.reducer;
