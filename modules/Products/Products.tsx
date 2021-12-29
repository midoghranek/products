import { CenterBox } from "@components";
import { Alert, Box, CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useGetProductsQuery } from "@services";
import SingleProduct from "./SingleProduct/SingleProduct";
import { Languages } from "@types";
import ProductForm from "./ProductForm/ProductForm";
import { useTranslate } from "@hooks";
import { useDispatch } from "react-redux";
import { closeProductForm } from "@store";
import ProductsHeader from "./ProductsHeader/ProductsHeader";

const Products = () => {
  const dispatch = useDispatch();
  const { message } = useTranslate();
  const { data, isLoading, isError } = useGetProductsQuery();
  const router = useRouter();

  const handleCloseProductForm = () => {
    dispatch(closeProductForm());
  };

  if (isError)
    return <Alert severity="error">{message("SOMETHING_WENT_WRONG")}</Alert>;

  if (isLoading)
    return (
      <CenterBox>
        <CircularProgress />
      </CenterBox>
    );

  if (data?.length === 0)
    return <Alert severity="error">{message("NO_PRODUCTS")}</Alert>;

  return (
    <Box my={5}>
      <ProductsHeader />
      <ProductForm onClose={handleCloseProductForm} />
      <Grid container spacing={3} mt={2}>
        {data?.map((product, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <SingleProduct
              product={product}
              lang={router.locale as Languages}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
