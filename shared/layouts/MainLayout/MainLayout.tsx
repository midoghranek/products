import { Header } from "@containers";
import { Box } from "@mui/material";

const MainLayout: React.FC = ({ children }) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};

export default MainLayout;
