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
export const getBrand = createAsyncThunk(
  "getBrand",
  async () => {
    const response = await AxiosInstance.get(
      `/brand/all`
    );
    
    return response.data.brands;
  }
);
export const deleteBrand = createAsyncThunk("deleteBrand", async (body) => {
 try {
  
  const resp = await AxiosInstance.delete(`/brand/remove?id=${body.id}`);

  
  if(resp.data.message ==='Üstünlikli!'){

    const response = await AxiosInstance.get("/brand/all");
    toast.success("Üstünlikli!")
    
    return response.data.brands;
  }else{
    toast.error("Ýalňyşlyk!");

  }
 } catch (error) {
  toast.error(error.data);
  
 }
});
export const createBrand = createAsyncThunk(
  "createBrand",
  async (body) => {
    try {
      const resp = await AxiosInstance.post("/brand/add", body);
      if(resp.data.message === 'Brand döredildi!'){
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/brand/all");
        return response.data.brands;
      }else{
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.message)
    }
   
  }
);
export const updateBrand = createAsyncThunk(
  "updateBrand",  
  async (body) => {
    try {

      const resp = await AxiosInstance.put("/brand/update", body);
      if(resp.data.message === 'Üstünlikli!'){
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get("/brand/all");
        return response.data.brands;
      }else{
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.message)
    }
   
  }
);
// Create the slice

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get
      .addCase(getBrand.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meta = action.payload.meta;
        state.data = action.payload;
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.error.message;
      })
      //delete

      .addCase(deleteBrand.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //create

      .addCase(createBrand.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //update

      .addCase(updateBrand.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // get
  },
});

export default brandSlice.reducer;
