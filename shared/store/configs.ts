import { loginService } from "@services";
import { categoriesService, productsService } from "@services";
import { productSlice } from "./product";
import { userSlice } from "./user";

export const producers = {
  slices: [userSlice, productSlice],
  services: [loginService, productsService, categoriesService],
};
