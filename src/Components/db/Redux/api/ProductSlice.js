import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "./AxiosHelper";
import { toast } from "react-toastify";

const initialState = {
  data: [],
  onProductData: [],
  productProperties: [],
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
    categoryId: null,
    subCategoryId: null,
    segmentId: null,
    brandId: null,
    minPrice: null,
    maxPrice: null,
    nameTm: null,
    sortBy: "createdAt",
    sortOrder: "DESC",
    page: 1,
    limit: 10,
  },
};

// Create an async thunk for the GET request
// Action to fetch products with query parameters
export const getProducts = createAsyncThunk(
  "getProducts",
  async ({
    categoryId,
    subCategoryId,
    segmentId,
    brandId,
    minPrice,
    maxPrice,
    nameTm,
    sortBy,
    sortOrder,
    page,
    limit,
  }) => {
    // Make sure to pass query params in the URL
    const response = await AxiosInstance.get("/product/all", {
      params: {
        categoryId,
        subCategoryId,
        minPrice,
        maxPrice,
        nameTm,
        sortBy,
        sortOrder,
        page,
        limit,
        segmentId,
        brandId,
      },
    });
    return response.data; // Return the data from the API
  }
);
export const getProductById = createAsyncThunk("getProductById", async (id) => {
  // Make sure to pass query params in the URL
  const response = await AxiosInstance.get(`/product/getOne?id=${id}`);
  return response.data; // Return the data from the API
});
export const deleteProduct = createAsyncThunk("deleteProduct", async (body) => {
  try {
    const resp = await AxiosInstance.delete(`/product/remove?id=${body}`);

    if (
      resp.data.message === "Product and color details deleted successfully"
    ) {
      const response = await AxiosInstance.get("/product/all");
      toast.success("Üstünlikli!");

      return response.data;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    toast.error(error.data);
  }
});
export const deleteProductColor = createAsyncThunk(
  "deleteProductColor",
  async (body) => {
    try {
      const resp = await AxiosInstance.delete(
        `/product/removeColorDetails?id=${body.body}`
      );

      if (resp.data.message === "Color detail deleted successfully") {
        const response = await AxiosInstance.get(
          `/product/getOne?id=${body.id}`
        );
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
export const createProduct = createAsyncThunk("createProduct", async (body) => {
  try {
    const resp = await AxiosInstance.post("/product/add", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (resp.data.message === "Product and properties created successfully") {
      toast.success("Üstünlikli!");
      const response = await AxiosInstance.get("/product/all");
      return response.data;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    toast.error(error.message);
  }
});
export const createProductColor = createAsyncThunk(
  "createProductColor",
  async (body) => {
    try {
      const resp = await AxiosInstance.post(
        "/product/add/newColor",
        body.body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (resp.data.message === "Color detail added successfully") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get(
          `/product/getOne?id=${body.id}`
        );
        return response.data;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
);
export const updateProduct = createAsyncThunk("updateProduct", async (body) => {
  try {
    const resp = await AxiosInstance.put("/product/update", body);

    if (resp.data.message === "Product details updated successfully") {
      toast.success("Üstünlikli!");
      const response = await AxiosInstance.get("/product/all");
      return response.data;
    } else {
      toast.error("Ýalňyşlyk!");
    }
  } catch (error) {
    toast.error(error.message);
  }
});
export const createProperty = createAsyncThunk(
  "createProperty",
  async (body) => {
    try {
      const resp = await AxiosInstance.post(`/product/addProperty`, body.body);
      if (resp.data.message === "New product property added successfully") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get(
          `/product/productProperties?productId=${body.productId}`
        );
        return response.data;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
);
export const getProductProperties = createAsyncThunk(
  "getProductProperties",
  async (id) => {
    try {
      const resp = await AxiosInstance.get(
        `/product/productProperties?productId=${id}`
      );

      return resp.data;
    } catch (error) {
      toast.error(error.message);
    }
  }
);
export const updateProductProperty = createAsyncThunk(
  "updateProductProperty",
  async (body) => {
    try {
      const resp = await AxiosInstance.patch(
        "/product/updateProperty",
        body.body
      );

      if (resp.data.message === "Product property updated successfully") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get(
          `/product/productProperties?productId=${body.productId}`
        );
        return response.data;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
);
export const deleteProductProperty = createAsyncThunk(
  "deleteProductProperty",
  async (body) => {
    try {
      const resp = await AxiosInstance.delete(
        `/product/removeProperty?productPropertyId=${body.productPropertyId}`
      );

      if (resp.data.message === "Product property deleted successfully") {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get(
          `/product/productProperties?productId=${body.productId}`
        );
        return response.data;
      } else {
        toast.error("Ýalňyşlyk!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
);
export const updateProductColor = createAsyncThunk(
  "updateProductColor",
  async (body) => {
    try {
      const resp = await AxiosInstance.put("/product/update", body.body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (
        resp.data.message ===
        "Product color detail and sizes updated successfully"
      ) {
        toast.success("Üstünlikli!");
        const response = await AxiosInstance.get(
          `/product/getOne?id=${body.id}`
        );
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

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Action to set the filters from the UI (e.g., form inputs)
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle the getProducts async thunk
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.data = action.payload.products; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProductById.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.onProductData = action.payload; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProductProperty.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateProductProperty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.productProperties = action.payload;
      })
      .addCase(updateProductProperty.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProductProperties.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getProductProperties.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.productProperties = action.payload;
      })
      .addCase(getProductProperties.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProperty.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.productProperties = action.payload;
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProductProperty.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(deleteProductProperty.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.productProperties = action.payload;
      })
      .addCase(deleteProductProperty.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.data = action.payload.products; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProductColor.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(createProductColor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.onProductData = action.payload; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(createProductColor.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProductColor.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateProductColor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.onProductData = action.payload; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(updateProductColor.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.data = action.payload.products; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProductColor.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(deleteProductColor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.onProductData = action.payload; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(deleteProductColor.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.data = action.payload.products; // Assuming the response has a 'products' field
        state.meta = action.payload; // Assuming the response has 'meta' for pagination info
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
      });

    // You can add additional cases for delete, create, and update if needed
  },
});

export default ProductSlice.reducer;
