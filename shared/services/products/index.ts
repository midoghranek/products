import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Product } from "@types";

export const productsService = createApi({
  reducerPath: "products/service",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(
                (product) =>
                  ({
                    type: "Products",
                    id: product._id,
                  } as const)
              ),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/product/${id}`,
      providesTags: (_, __, id) => [{ type: "Products", id }],
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: "/product",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "Products", id: "LIST" }],
    }),
    updateProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: `/product/${product._id}`,
        method: "PATCH",
        body: product,
      }),
      invalidatesTags: (_, __, { _id }) => [{ type: "Products", id: _id }],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Products", id }],
    }),
  }),
});

// export service hooks
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsService;
