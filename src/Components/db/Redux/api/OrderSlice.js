import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  oneOrderData: [],
  orderStasuses: [],
  status: "idle", // Loading status
  meta: {
    limit: 10,
    itemCount: 0,
    pageCount: 1,
    page: 1,
    hasPrevPage: false,
    hasNextPage: false,
  },
  error: null,
  loading: false,
  filters: {
    // Store current filters
    // categoryId: null,
    // subCategoryId: null,
    // segmentId: null,
    // brandId: null,
    // minPrice: null,
    // maxPrice: null,
    // nameTm: null,
    // sortBy: "createdAt",
    // sortOrder: "DESC",
    orderNumber: null,
    page: 1,
    limit: 10,
  },
};

// Create an async thunk for the GET request
// Action to fetch products with query parameters
export const getOrders = createAsyncThunk(
  "getOrders",
  async ({
    // categoryId,
    // subCategoryId,
    // segmentId,
    // brandId,
    // minPrice,
    // maxPrice,
    // nameTm,
    // sortBy,
    // sortOrder,
    page,
    limit,
    orderNumber,
  }) => {
    // Make sure to pass query params in the URL
    const response = await AxiosInstance.get("/order/orders/all", {
      params: {
        // categoryId,
        // subCategoryId,
        // minPrice,
        // maxPrice,
        // nameTm,
        // sortBy,
        // sortOrder,
        page,
        limit,
        orderNumber,
        // segmentId,
        // brandId,
      },
    });

    return response.data; // Return the data from the API
  }
);
export const getOrderById = createAsyncThunk("getOrderById", async (id) => {
  const response = await AxiosInstance.get(`/order/orders/one?id=${id}`);
  return response.data; // Return the data from the API
});
export const getOrderStatuses = createAsyncThunk(
  "getOrderStatuses",
  async () => {
    const response = await AxiosInstance.get(`/order/status/all`);
    return response.data.status; // Return the data from the API
  }
);
export const changeOrderStatus = createAsyncThunk(
  "changeOrderStatus",
  async (body) => {
    const response = await AxiosInstance.post(
      `/order/update/status?orderId=${body.orderId}&newStatusId=${body.newStatusId}`
    );
    if (response.data.message === "Order status updated successfully") {
      toast.success("Üstünlikli!");
    } else {
      toast.error("Şowsuz!");
    }
    const resp = await AxiosInstance.get(
      `/order/orders/one?id=${body.orderId}`
    );

    return resp.data; // Return the data from the API
  }
);
// Create the slice

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Action to set the filters from the UI (e.g., form inputs)
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the getOrders async thunk
      .addCase(getOrders.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.data = action.payload.orders; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderById.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.oneOrderData = action.payload; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderStatuses.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getOrderStatuses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.orderStasuses = action.payload; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(getOrderStatuses.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changeOrderStatus.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.oneOrderData = action.payload; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default OrderSlice.reducer;
