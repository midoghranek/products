import CategoriesForm from "./CategoriesForm/CategoriesForm";
import CategoriesStack from "./CategoriesStack/CategoriesStack";
import CategoriesHeader from "./CategoriesHeader/CategoriesHeader";
import { Box } from "@mui/system";

const Categories = () => {
  return (
    <Box py="50px">
      <CategoriesHeader />
      <CategoriesForm />
      <CategoriesStack />
    </Box>
  );
};

export default Categories;
