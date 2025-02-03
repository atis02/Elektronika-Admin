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
export const getCategory = createAsyncThunk("getCategory", async () => {
  const response = await AxiosInstance.get(`/category/all`);
  return response.data;
});
export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (body) => {
    try {
      const resp = await AxiosInstance.delete(`/category/remove?id=${body.id}`);
      if (resp.data.message === "Üstünlikli!") {
        const response = await AxiosInstance.get("/category/all");
        toast.success("Üstünlikli!");

        return response.data;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.data);
    }
  }
);
export const createCategory = createAsyncThunk(
  "createCategory",
  async (body) => {
    try {
      const resp = await AxiosInstance.post("/category/add", body);
      if (resp.data.message === "Kategoriýa döredildi!") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/category/all");
        return response.data;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      return [];
    }
  }
);
export const updateCategory = createAsyncThunk(
  "updateCategory",
  async (body) => {
    try {
      const resp = await AxiosInstance.patch("/category/update", body);

      if (resp.data.message === "Üstünlikli!") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/category/all");
        return response.data;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
);
// Create the slice

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getCategory.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meta = action.payload.meta;
        state.data = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete

      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create

      .addCase(createCategory.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update

      .addCase(updateCategory.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // get
  },
});

export default dataSlice.reducer;
