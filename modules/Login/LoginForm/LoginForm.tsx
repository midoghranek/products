import { useToggleValue, useTranslate } from "@hooks";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "@validators";
import { LoginFormInputs, User } from "@types";
import { useLoginMutation } from "@services";
import { useEffect } from "react";
import { setCookies } from "cookies-next";
import { useRouter } from "next/router";
import { setUser } from "@store";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CenterBox } from "@components";
import { useDispatch } from "react-redux";

type LoginError = {
  data: {
    success: boolean;
    message: "USER_NOT_FOUND" | "INCORRECT_PASSWORD";
  };
};
const LoginForm = () => {
  const router = useRouter();
  const { message } = useTranslate();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });
  const [showPassword, toggleShowPassword] = useToggleValue();

  const [loginUser, { data, isLoading, isError, error, isSuccess }] =
    useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    loginUser(data);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/");
      setCookies("session", true);
      setCookies("user_role", data?.user?.role);
      localStorage.setItem("user", JSON.stringify(data?.user));
      dispatch(setUser(data?.user as User));
    }
  }, [data, dispatch, isSuccess, router]);

  return (
    <>
      {isLoading && (
        <CenterBox>
          <CircularProgress />
        </CenterBox>
      )}
      <form onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
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
              type={showPassword ? "text" : "password"}
              variant="outlined"
              label={message("PASSWORD")}
              error={!!errors?.password}
              helperText={message(errors?.password?.message) ?? ""}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      onMouseDown={toggleShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
        <Button data-testid="login-button" variant="contained" type="submit">
          {message("LOGIN_TITLE")}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
