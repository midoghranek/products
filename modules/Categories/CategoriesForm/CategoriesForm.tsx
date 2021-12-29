import { useTranslate } from "@hooks";
import { Button, Stack, TextField } from "@mui/material";
import { useCreateCategoryMutation } from "@services";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { categoryFormSchema } from "@validators";
import { Category } from "@types";
import { LOCALES } from "@locales";

const CategoriesForm = () => {
  const { message } = useTranslate();
  const [addCategory] = useCreateCategoryMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>({
    resolver: yupResolver(categoryFormSchema),
  });

  const onSubmit: SubmitHandler<Category> = (data) => {
    addCategory(data);
  };

  return (
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
  );
};

export default CategoriesForm;
