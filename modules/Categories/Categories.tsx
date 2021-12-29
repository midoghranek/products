import { CenterBox, useConfirmDialog } from "@components";
import { useTranslate } from "@hooks";
import { Delete } from "@mui/icons-material";
import {
  Alert,
  Button,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@services";
import { useRouter } from "next/router";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryFormSchema } from "@validators";
import { Category } from "@types";
import { LOCALES } from "@locales";
import Link from "next/link";

const Categories = () => {
  const router = useRouter();
  const { message } = useTranslate();
  const { data, isLoading, isError } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [addCategory, { error }] = useCreateCategoryMutation();

  const { setDialog, closeDialog } = useConfirmDialog();

  const handleDelete = (id: string) => {
    return () =>
      setDialog({
        title: message("DELETE_CATEGORY"),
        message: message("DELETE_CATEGORY_CONFIRM"),
        onConfirm: () => deleteCategory(id).then(() => closeDialog()),
      });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>({
    resolver: yupResolver(categoryFormSchema),
  });

  const onSubmit: SubmitHandler<Category> = (data) => {
    addCategory(data);
    console.log(error);
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
    <Box py="50px">
      <Link href="/">{message("BACK_TO_PRODUCTS")}</Link>
      <Box mt="10px" />
      <Typography variant="h5">{message("MANAGE_CATEGORIES")}</Typography>
      <Box mt="20px" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={1} mb="20px">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                variant="filled"
                label={message("CATEGORY_NAME")}
                error={!!errors?.name}
                helperText={message(errors?.name?.message as LOCALES) ?? ""}
              />
            )}
          />
          <Controller
            name="translations.ar.name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                variant="filled"
                label={message("ARABIC_NAME")}
                error={!!errors?.translations?.ar?.name}
                helperText={
                  message(errors?.translations?.ar?.name?.message as LOCALES) ??
                  ""
                }
              />
            )}
          />
          <Button type="submit" variant="contained">
            {message("ADD_CATEGORY")}
          </Button>
        </Stack>
      </form>

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
    </Box>
  );
};

export default Categories;
