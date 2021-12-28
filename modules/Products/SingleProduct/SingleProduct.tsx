import { useTranslate } from "@hooks";
import { Delete, Edit } from "@mui/icons-material";
import { Typography, Box, IconButton } from "@mui/material";
import { useDeleteProductMutation, useGetProductsQuery } from "@services";
import { Languages, Product } from "@types";
import Image from "next/image";
import { useEffect } from "react";

type SingleProductProps = {
  readonly product: Product;
  readonly lang: Languages;
};

const SingleProduct: React.FC<SingleProductProps> = ({ product, lang }) => {
  const { message } = useTranslate();
  const [deleteProduct] = useDeleteProductMutation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "white",
        height: "200px",
        pr: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ position: "relative", width: "200px", height: "200px" }}>
          <Image
            src={product.thumbnail}
            title={product.name}
            alt={product.name}
            objectFit="cover"
            layout="fill"
          />
        </Box>

        <Box width="20px" />

        <Box>
          <Typography variant="h6">
            {lang === "ar" ? product.translations.ar.name : product.name}
          </Typography>
          <Box mt="10px" />
          <Typography variant="subtitle2">
            {message("PRODUCT_WEIGHT")}: {product.weight}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IconButton>
          <Edit />
        </IconButton>
        <IconButton onClick={() => deleteProduct(product?._id)}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SingleProduct;
