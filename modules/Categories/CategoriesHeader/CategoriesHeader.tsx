import { useTranslate } from "@hooks";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";

const CategoriesHeader = () => {
  const { message } = useTranslate();
  return (
    <>
      <Link href="/">{message("BACK_TO_PRODUCTS")}</Link>
      <Box mt="10px" />
      <Typography variant="h5">{message("MANAGE_CATEGORIES")}</Typography>
      <Box mt="20px" />
    </>
  );
};

export default CategoriesHeader;
