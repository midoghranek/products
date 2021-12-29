import { useConfirmDialog } from "@components";
import { useTranslate } from "@hooks";
import { Delete, Edit } from "@mui/icons-material";
import { Typography, Box, IconButton, Chip } from "@mui/material";
import { useDeleteProductMutation, useGetProductsQuery } from "@services";
import { openEditProduct } from "@store";
import { Languages, Product } from "@types";
import Image from "next/image";
import { useDispatch } from "react-redux";

type SingleProductProps = {
  readonly product: Product;
  readonly lang: Languages;
};

const SingleProduct: React.FC<SingleProductProps> = ({ product, lang }) => {
  const { message } = useTranslate();
  const [deleteProduct] = useDeleteProductMutation();

  const dispatch = useDispatch();

  const handleEditProduct = () => {
    dispatch(openEditProduct(product));
  };

  const { setDialog, closeDialog } = useConfirmDialog();

  const handleDeleteProduct = () => {
    setDialog({
      title: message("DELETE_PRODUCT"),
      message: message("DELETE_PRODUCT_CONFIRM"),
      onConfirm: () => deleteProduct(product?._id).then(() => closeDialog()),
    });
  };

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
          <Box mt="10px" />
          <Chip
            label={
              lang === "ar"
                ? product.category.translations.ar.name
                : product.category.name
            }
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IconButton onClick={handleEditProduct}>
          <Edit />
        </IconButton>
        <IconButton onClick={handleDeleteProduct}>
          <Delete />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SingleProduct;
