import { loginService } from "@services";
import { categoriesService, productsService } from "@services";
import { userSlice } from "./user";

export const producers = {
  slices: [userSlice],
  services: [loginService, productsService, categoriesService],
};
