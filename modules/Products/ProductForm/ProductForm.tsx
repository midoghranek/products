import { CenterBox } from "@components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslate } from "@hooks";
import { LOCALES } from "@locales";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useCreateProductMutation, useGetCategoriesQuery } from "@services";
import { Category, Product } from "@types";
import { productFormSchema } from "@validators";
import { useRouter } from "next/router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type ProductFormProps = {
  readonly open: boolean;
  readonly onClose: () => void;
};

const ProductForm: React.FC<ProductFormProps> = ({ open, onClose }) => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>({
    resolver: yupResolver(productFormSchema),
  });

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onSubmit: SubmitHandler<Product> = (data) => {
    createProduct(data);
  };

  const { data: categories } = useGetCategoriesQuery();

  const { message } = useTranslate();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{message("NEW_PRODUCT")}</DialogTitle>
      <DialogContent>
        {isLoading && (
          <CenterBox>
            <CircularProgress />
          </CenterBox>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "600px",
            maxWidth: "100%",
          }}
        >
          <Box mb={3} />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                variant="outlined"
                label={message("PRODUCT_NAME")}
                error={!!errors?.name}
                helperText={message(errors?.name?.message as LOCALES) ?? ""}
                fullWidth
              />
            )}
          />
          <Box mb={3} />
          <Controller
            name="weight"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                variant="outlined"
                label={message("PRODUCT_WEIGHT")}
                error={!!errors?.weight}
                helperText={message(errors?.weight?.message as LOCALES) ?? ""}
                fullWidth
              />
            )}
          />
          <Box mb={3} />
          <Autocomplete
            options={categories ?? []}
            getOptionLabel={(option: Category) =>
              router?.locale === "ar"
                ? option.translations.ar.name
                : option.name
            }
            fullWidth
            onChange={(_, value) => setValue("category", value as Category)}
            renderInput={(params) => (
              <TextField
                {...params}
                type="text"
                variant="outlined"
                label={message("CATEGORY")}
                error={!!errors?.category?.name}
                helperText={
                  message(errors?.category?.name?.message as LOCALES) ?? ""
                }
              />
            )}
          />
          <Box mb={3} />
          <Controller
            name="translations.ar.name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                variant="outlined"
                label={message("ARABIC_NAME")}
                error={!!errors?.translations?.ar?.name}
                helperText={
                  message(errors?.translations?.ar?.name?.message as LOCALES) ??
                  ""
                }
                fullWidth
              />
            )}
          />
          <Box mb={3} />
          <Controller
            name="thumbnail"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                variant="outlined"
                label={message("THUMBNAIL")}
                error={!!errors?.thumbnail}
                helperText={
                  message(errors?.thumbnail?.message as LOCALES) ?? ""
                }
                fullWidth
              />
            )}
          />
          <Box mb={3} />
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" type="submit">
              {message("ADD_PRODUCT")}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
