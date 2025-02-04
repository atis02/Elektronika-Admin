import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  onProductData: [],
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
    minPrice: "",
    maxPrice: "",
    sortBy: "createdAt",
    sortOrder: "DESC",
    startDateAuction: "",
    endDateAuction: "",
    page: 1,
    limit: 10,
  },
};

// Create an async thunk for the GET request
// Action to fetch products with query parameters
export const getAuctions = createAsyncThunk(
  "getAuctions",
  async ({
    minPrice,
    maxPrice,
    sortByreatedAt,
    sortOrderESC,
    startDateAuction,
    endDateAuction,
    nameTm,
    page,
    limit,
  }) => {
    // Make sure to pass query params in the URL
    const response = await AxiosInstance.get("/auction/all", {
      params: {
        minPrice,
        maxPrice,
        sortByreatedAt,
        sortOrderESC,
        startDateAuction,
        nameTm,
        endDateAuction,
        page,
        limit,
      },
    });

    return response.data; // Return the data from the API
  }
);
export const createAuction = createAsyncThunk("createAuction", async (body) => {
  try {
    const resp = await AxiosInstance.post("/auction/add", body);
    if (resp.data.id) {
      toast.success("Üstünlikli!");
      const response = await AxiosInstance.get("/auction/all");
      return response.data;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    toast.error(error.message);
  }
});
export const getAuctionById = createAsyncThunk("getAuctionById", async (id) => {
  const response = await AxiosInstance.get(`/auction/getOne?auctionId=${id}`);
  return response.data;
});

export const updateAuction = createAsyncThunk("updateAuction", async (body) => {
  try {
    const resp = await AxiosInstance.put("/auction/update", body);

    if (resp.data.message === "Auction updated successfully") {
      toast.success("Üstünlikli!");
      const response = await AxiosInstance.get("/auction/all");
      return response.data;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    if (
      error.response.data.message == "Auction has already ended, cannot update."
    ) {
      toast.error("Auksion tamamlanan üýtgetmek mümkin däl!");
    } else if (
      error.response.data.message ==
      "Auction has already started, cannot update."
    ) {
      toast.error("Auksion başlandy üýtgetmek mümkin däl!");
    }
  }
});

export const deleteAuction = createAsyncThunk("deleteAuction", async (body) => {
  try {
    const resp = await AxiosInstance.delete(
      `/auction/delete?auctionId=${body}`
    );

    if (resp.data.message === "Auction deleted successfully") {
      const response = await AxiosInstance.get("/auction/all");
      toast.success("Üstünlikli!");

      return response.data;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    toast.error(error.data);
  }
});

// Create the slice

const AuctionSlice = createSlice({
  name: "auction",
  initialState,
  reducers: {
    // Action to set the filters from the UI (e.g., form inputs)
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the getAuctions async thunk
      .addCase(getAuctions.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getAuctions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.data = action.payload.auctions; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(getAuctions.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getAuctionById.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getAuctionById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.onProductData = action.payload; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(getAuctionById.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createAuction.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createAuction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.data = action.payload.auctions; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(createAuction.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteAuction.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(deleteAuction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.data = action.payload.auctions; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(deleteAuction.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateAuction.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateAuction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.data = action.payload.auctions; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(updateAuction.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      });

    // You can add additional cases for delete, create, and update if needed
  },
});

export default AuctionSlice.reducer;
