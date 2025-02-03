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
export const getPartner = createAsyncThunk("getPartner", async () => {
  const response = await AxiosInstance.get(`/partner/all`);

  return response.data.partner;
});
export const deletePartner = createAsyncThunk("deletePartner", async (body) => {
  try {
    const resp = await AxiosInstance.delete(`/partner/remove?id=${body.id}`);

    if (resp.data.message === "Üstünlikli!") {
      const response = await AxiosInstance.get("/partner/all");
      toast.success("Üstünlikli!");

      return response.data.partner;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    toast.error(error.data);
  }
});
export const createPartner = createAsyncThunk("createPartner", async (body) => {
  try {
    const resp = await AxiosInstance.post("/partner/add", body);
    if (resp.data.message === "Partner üstünlikli döredildi!") {
      toast.success("Üstünlikli!");
      const response = await AxiosInstance.get("/partner/all");
      return response.data.partner;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    toast.error(error.message);
  }
});
export const updatePartner = createAsyncThunk("updatePartner", async (body) => {
  try {
    const resp = await AxiosInstance.put("/partner/update", body);
    if (resp.data.message === "Üstünlikli!") {
      toast.success("Üstünlikli!");
      const response = await AxiosInstance.get("/partner/all");
      return response.data.partner;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    toast.error(error.message);
  }
});
// Create the slice

const PartnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getPartner.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getPartner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meta = action.payload.meta;
        state.data = action.payload;
      })
      .addCase(getPartner.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete

      .addCase(deletePartner.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deletePartner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deletePartner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create

      .addCase(createPartner.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createPartner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createPartner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update

      .addCase(updatePartner.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updatePartner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // get
  },
});

export default PartnerSlice.reducer;
