import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Category } from "@types";

export const categoriesService = createApi({
  reducerPath: "categories/service",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                (category) =>
                  ({
                    type: "Category",
                    id: category._id,
                  } as const)
              ),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
    createCategory: builder.mutation<Category, Partial<Category>>({
      query: (category) => ({
        url: "/categories",
        method: "POST",
        body: category,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
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
      invalidatesTags: (_, __, { _id }) => [{ type: "Category", id: _id }],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/categories`,
        params: {
          _id: id,
        },
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Category", id }],
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
