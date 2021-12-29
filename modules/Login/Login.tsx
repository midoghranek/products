import { useTranslate } from "@hooks";
import { Box, Paper, Typography } from "@mui/material";
import LoginForm from "./LoginForm/LoginForm";

const LoginModule = () => {
  const { message } = useTranslate();

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
        <Typography variant="h3">{message("LOGIN_TITLE")}</Typography>
        <Box mt={5} />
        <LoginForm />
      </Paper>
    </Box>
  );
};

export default LoginModule;
