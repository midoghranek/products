import { confirmDialogSlice } from "@components";
import { loginService } from "@services";
import { categoriesService, productsService } from "@services";
import { productSlice } from "./product";
import { userSlice } from "./user";

export const producers = {
  slices: [userSlice, productSlice, confirmDialogSlice],
  services: [loginService, productsService, categoriesService],
};
