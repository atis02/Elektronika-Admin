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
export const getSubCategory = createAsyncThunk("getSubCategory", async () => {
  const response = await AxiosInstance.get(`/subCategory/all`);

  return response.data.subCategories;
});
export const deleteSubCategory = createAsyncThunk(
  "deleteSubCategory",
  async (body) => {
    try {
      const resp = await AxiosInstance.delete(
        `/subCategory/remove?id=${body.id}`
      );

      if (resp.data.message === "Üstünlikli!") {
        const response = await AxiosInstance.get("/subCategory/all");
        toast.success("Üstünlikli!");

        return response.data.subCategories;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.data);
    }
  }
);
export const createSubCategory = createAsyncThunk(
  "createSubCategory",
  async (body) => {
    try {
      const resp = await AxiosInstance.post("/subCategory/add", body);
      if (resp.data.message === "Subkategoriýa döredildi!") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/subCategory/all");
        return response.data.subCategories;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      return [];
    }
  }
);
export const updateSubCategory = createAsyncThunk(
  "updateSubCategory",
  async (body) => {
    try {
      const resp = await AxiosInstance.put("/subCategory/update", body);

      if (resp.data.message === "Üstünlikli!") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/subCategory/all");
        return response.data.subCategories;
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
  name: "subcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getSubCategory.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getSubCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meta = action.payload.meta;
        state.data = action.payload;
      })
      .addCase(getSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete

      .addCase(deleteSubCategory.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create

      .addCase(createSubCategory.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createSubCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createSubCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update

      .addCase(updateSubCategory.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // get
  },
});

export default dataSlice.reducer;
