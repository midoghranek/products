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
import { useToggleValue, useTranslate } from "@hooks";
import { Add } from "@mui/icons-material";

const Products = () => {
  const { message } = useTranslate();
  const [productForm, toggleProductForm] = useToggleValue();
  const { data, isLoading, isError } = useGetProductsQuery();
  const router = useRouter();

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
          onClick={toggleProductForm}
          endIcon={<Add />}
          variant="outlined"
        >
          {message("NEW_PRODUCT")}
        </Button>
      </Box>
      <ProductForm open={productForm} onClose={toggleProductForm} />
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
