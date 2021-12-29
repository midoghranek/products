import { Category } from "@types";
import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
  username: yup.string().required("USERNAME_REQUIRED"),
  password: yup
    .string()
    .required("PASSWORD_REQUIRED")
    .min(4, "PASSWORD_MIN_LENGTH"),
});

export const productFormSchema = yup.object().shape({
  name: yup.string().required("PRODUCT_NAME_REQUIRED"),
  weight: yup.string().required("PRODUCT_WEIGHT_REQUIRED"),
  category: yup.object().shape({
    name: yup.string().required("CATEGORY_REQUIRED"),
  }),
  translations: yup.object().shape({
    ar: yup.object().shape({
      name: yup.string().required("ARABIC_NAME_REQUIRED"),
    }),
  }),
  thumbnail: yup
    .string()
    .required("THUMBNAIL_REQUIRED")
    .url("THUMBNAIL_URL")
    .matches(/images.unsplash.com/g, "IMAGES_MESSAGE"),
});
