import { useTranslate } from "@hooks";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "@validators";
import { LoginFormInputs, User } from "@types";
import { useLoginMutation } from "@services";
import { CenterBox } from "@components";
import { useEffect } from "react";
import { setCookies } from "cookies-next";
import { useRouter } from "next/router";
import { setUser, useAppDispatch } from "@store";

type LoginError = {
  data: {
    success: boolean;
    message: "USER_NOT_FOUND" | "INCORRECT_PASSWORD";
  };
};
const LoginForm = () => {
  const router = useRouter();
  const { message } = useTranslate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const [loginUser, { data, isLoading, isError, error, isSuccess }] =
    useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    loginUser(data);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
      setCookies("session", true);
      localStorage.setItem("user", JSON.stringify(data?.user));
      dispatch(setUser(data?.user as User));
    }
  }, [data, dispatch, isSuccess, router]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Paper
        sx={{
          padding: 5,
          width: "100%",
          maxWidth: "500px",
          mt: "200px",
          position: "relative",
        }}
      >
        {isLoading && (
          <CenterBox>
            <CircularProgress />
          </CenterBox>
        )}
        <Typography variant="h3">{message("LOGIN_TITLE")}</Typography>
        <Box mt={5} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                variant="outlined"
                label={message("USERNAME")}
                error={!!errors?.username}
                helperText={message(errors?.username?.message) ?? ""}
                fullWidth
              />
            )}
          />

          <Box mt={3} />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="outlined"
                label={message("PASSWORD")}
                error={!!errors?.password}
                helperText={message(errors?.password?.message) ?? ""}
                fullWidth
              />
            )}
          />
          <Box mt={3} />
          {isError && (
            <>
              <Typography variant="body2" color="error">
                {message((error as LoginError).data.message)}
              </Typography>
              <Box mt={3} />
            </>
          )}
          <Button variant="contained" type="submit">
            {message("LOGIN_TITLE")}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
