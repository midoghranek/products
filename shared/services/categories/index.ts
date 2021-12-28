import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Category } from "@types";

export const categoriesService = createApi({
  reducerPath: "categories/service",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
    }),
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
    }),
    updateCategory: builder.mutation<Category, Partial<Category>>({
      query: (category) => ({
        url: `/categories`,
        method: "PATCH",
        params: {
          _id: category._id,
        },
        body: category,
      }),
    }),
    deleteCategory: builder.mutation<string, {}>({
      query: (id) => ({
        url: `/categories`,
        params: {
          _id: id,
        },
        method: "DELETE",
      }),
    }),
  }),
});

// export service hooks
export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesService;
