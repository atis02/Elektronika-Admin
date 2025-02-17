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
export const getUsersAdminPage = createAsyncThunk(
  "getUsersAdminPage",
  async () => {
    const response = await AxiosInstance.get(`/user/allUsersAdminPage`);

    return response.data.users;
  }
);
export const deleteUsersAdminPage = createAsyncThunk(
  "deleteUsersAdminPage",
  async (body) => {
    try {
      const resp = await AxiosInstance.delete(
        `/order/deliveryCity/remove?id=${body}`
      );
      if (resp.data.message === "Üstünlikli!") {
        const response = await AxiosInstance.get("/order/allUsersAdminPage");
        toast.success("Üstünlikli!");
        return response.data.users;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.data);
    }
  }
);
export const createUsersAdminPage = createAsyncThunk(
  "createUsersAdminPage",
  async (body) => {
    try {
      const resp = await AxiosInstance.post("/user/registerAdminPage", body);
      if (resp.data.token) {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/order/allUsersAdminPage");
        return response.data.users;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      return [];
    }
  }
);
export const updateUsersAdminPage = createAsyncThunk(
  "updateUsersAdminPage",
  async (body) => {
    try {
      const resp = await AxiosInstance.put("/order/deliveryCity/update", body);

      if (resp.data.message === "Üstünlikli!") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/order/allUsersAdminPage");
        return response.data.users;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
);
// Create the slice

const adminUsersSlice = createSlice({
  name: "adminUsersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getUsersAdminPage.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getUsersAdminPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meta = action.payload.meta;
        state.data = action.payload;
      })
      .addCase(getUsersAdminPage.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete

      .addCase(deleteUsersAdminPage.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteUsersAdminPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteUsersAdminPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create

      .addCase(createUsersAdminPage.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createUsersAdminPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createUsersAdminPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update

      .addCase(updateUsersAdminPage.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateUsersAdminPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateUsersAdminPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // get
  },
});

export default adminUsersSlice.reducer;
