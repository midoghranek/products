import { CenterBox } from "@components";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useGetProductsQuery } from "@services";
import SingleProduct from "./SingleProduct/SingleProduct";
import { Languages } from "@types";
import ProductForm from "./ProductForm/ProductForm";
import { useTranslate } from "@hooks";
import { Add } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { closeProductForm, openProductForm, productFormSelector } from "@store";

const Products = () => {
  const dispatch = useDispatch();
  const { message } = useTranslate();
  const { data, isLoading, isError } = useGetProductsQuery();
  const router = useRouter();

  const productFormState = useSelector(productFormSelector);

  const handleOpenProductForm = () => {
    dispatch(openProductForm());
  };

  const handleCloseProductForm = () => {
    dispatch(closeProductForm());
  };

  if (isError)
    return (
      <Alert severity="error">
        Something went wrong, please try again later
      </Alert>
    );

  if (isLoading)
    return (
      <CenterBox>
        <CircularProgress />
      </CenterBox>
    );

  return (
    <Box mt={5}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">{message("PRODUCTS_TITLE")}</Typography>
        <Button
          onClick={handleOpenProductForm}
          endIcon={<Add />}
          variant="outlined"
        >
          {message("NEW_PRODUCT")}
        </Button>
      </Box>
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
