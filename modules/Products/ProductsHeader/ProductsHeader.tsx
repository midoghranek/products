import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslate } from "@hooks";
import { Add, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { openProductForm, userSelector } from "@store";

const ProductsHeader = () => {
  const dispatch = useDispatch();
  const { message } = useTranslate();
  const router = useRouter();
  const user = useSelector(userSelector);

  const handleOpenProductForm = () => {
    dispatch(openProductForm());
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h5">{message("PRODUCTS_TITLE")}</Typography>
      <Box display="flex">
        {user?.role === "manager" && (
          <>
            <Button
              onClick={() => router.push("/categories")}
              endIcon={<Edit />}
              variant="outlined"
            >
              {message("MANAGE_CATEGORIES")}
            </Button>
            <Box ml="10px" />
          </>
        )}
        <Button
          onClick={handleOpenProductForm}
          endIcon={<Add />}
          variant="outlined"
        >
          {message("NEW_PRODUCT")}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductsHeader;
