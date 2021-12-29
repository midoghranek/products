import { confirmDialogSlice } from "@components";
import { categoriesService, productsService, loginService } from "@services";
import { productSlice } from "./product";
import { userSlice } from "./user";

export const producers = {
  slices: [userSlice, productSlice, confirmDialogSlice],
  services: [loginService, productsService, categoriesService],
};
