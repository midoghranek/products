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
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
  useUpdateProductMutation,
} from "@services";
import { productFormSelector } from "@store";
import { Category, Product } from "@types";
import { productFormSchema } from "@validators";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

type ProductFormProps = {
  readonly onClose: () => void;
};

const ProductForm: React.FC<ProductFormProps> = ({ onClose }) => {
  const router = useRouter();
  const { message } = useTranslate();

  const { open, edit } = useSelector(productFormSelector);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Product>({
    resolver: yupResolver(productFormSchema),
  });

  const [createProduct, { isLoading }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdateLoading }] =
    useUpdateProductMutation();

  const onSubmit: SubmitHandler<Product> = (data) => {
    if (edit) {
      updateProduct({
        ...data,
        _id: edit._id,
      }).then(() => {
        onClose();
      });
    } else {
      createProduct(data).then(() => {
        onClose();
      });
    }
  };

  const { data: categories } = useGetCategoriesQuery();

  useEffect(() => {
    if (open && !edit) {
      reset();
    }
  }, [open, edit, reset]);

  useEffect(() => {
    if (edit) {
      setValue("name", edit.name);
      setValue("category", edit.category);
      setValue("thumbnail", edit.thumbnail);
      setValue("weight", edit.weight);
      setValue("translations.ar.name", edit.translations.ar.name);
    }
  }, [edit, setValue]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {message(edit ? "EDIT_PRODUCT" : "NEW_PRODUCT")}
      </DialogTitle>
      <DialogContent>
        {isLoading ||
          (isUpdateLoading && (
            <CenterBox>
              <CircularProgress />
            </CenterBox>
          ))}
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
            defaultValue={edit ? edit.category : undefined}
            options={categories ?? []}
            getOptionLabel={(option: Category) =>
              router?.locale === "ar"
                ? option.translations.ar.name
                : option.name
            }
            fullWidth
            onChange={(_, value) => {
              setValue("category", value as Category);
              console.log(value, edit);
            }}
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
                  !!errors?.thumbnail
                    ? message(errors?.thumbnail?.message as LOCALES) ?? ""
                    : message("IMAGES_MESSAGE")
                }
                fullWidth
              />
            )}
          />
          <Box mb={3} />
          <Box display="flex" justifyContent="flex-end">
            <Button variant="outlined" onClick={onClose}>
              {message("CANCEL")}
            </Button>
            <Box ml="10px" />
            <Button variant="contained" type="submit">
              {message(edit ? "EDIT_PRODUCT" : "ADD_PRODUCT")}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
