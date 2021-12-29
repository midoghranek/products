import { CenterBox, useConfirmDialog } from "@components";
import { useTranslate } from "@hooks";
import { Delete } from "@mui/icons-material";
import { Alert, Chip, CircularProgress, Stack } from "@mui/material";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "@services";
import { useRouter } from "next/router";

const CategoriesStack = () => {
  const router = useRouter();
  const { message } = useTranslate();
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const { setDialog, closeDialog } = useConfirmDialog();

  const handleDelete = (id: string) => {
    return () =>
      setDialog({
        title: message("DELETE_CATEGORY"),
        message: message("DELETE_CATEGORY_CONFIRM"),
        onConfirm: () => deleteCategory(id).then(() => closeDialog()),
      });
  };

  if (isError)
    return <Alert severity="error">{message("SOMETHING_WENT_WRONG")}</Alert>;

  if (isLoading)
    return (
      <CenterBox>
        <CircularProgress />
      </CenterBox>
    );

  return (
    <Stack direction="row" spacing={1}>
      {data?.map((category, index) => (
        <Chip
          key={index}
          color="info"
          label={
            router.locale === "ar"
              ? category.translations.ar.name
              : category.name
          }
          onDelete={handleDelete(category._id)}
          deleteIcon={<Delete />}
        />
      ))}
    </Stack>
  );
};

export default CategoriesStack;
