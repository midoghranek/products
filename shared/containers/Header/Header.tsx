import { useLogout, useSwitchLang, useTranslate } from "@hooks";
import { Logout } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { userSelector } from "@store";
import { useSelector } from "react-redux";

const Header = () => {
  const { message } = useTranslate();
  const user = useSelector(userSelector);
  const logout = useLogout();
  const { switchLang, locale } = useSwitchLang();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: user ? "200px" : "100px",
        background: "white",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="h4">{message("SITE_NAME")}</Typography>
        </Box>
        <Box display="flex">
          {user && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 5,
              }}
            >
              <Avatar
                src={user?.avatar}
                sx={{ width: 50, height: 50, mr: 2 }}
                alt=""
              />
              <Box>
                <Typography variant="subtitle1">{user?.name}</Typography>
                <Typography variant="caption">{message(user?.role)}</Typography>
              </Box>
            </Box>
          )}
          <Button variant="outlined" color="primary" onClick={switchLang}>
            {locale === "ar" ? "English" : "عربى"}
          </Button>
          <Box width={5} />
          {user && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={logout}
              endIcon={<Logout />}
            >
              {message("LOGOUT")}
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
