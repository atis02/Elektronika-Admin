import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./ReduxSlice";
import SubCategoryReducer from "./SubCategorySlice";
import ProductReducer from "./ProductSlice";
import SizeReducer from "./SizeSlice";
import StatusReducer from "./StatusSlice";
import SegmentReducer from "./SegmentSlice";
import BrandReducer from "./BrandSlice";
import bannerReducer from "./BannerSlice";
import PartnerReducer from "./PartnerSlice";
import OrderReducer from "./OrderSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    subcategory: SubCategoryReducer,
    product: ProductReducer,
    size: SizeReducer,
    status: StatusReducer,
    segment: SegmentReducer,
    brand: BrandReducer,
    banner: bannerReducer,
    partner: PartnerReducer,
    order: OrderReducer,
  },
});
