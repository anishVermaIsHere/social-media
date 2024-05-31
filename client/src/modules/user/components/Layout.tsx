import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Item from "../../../components/Item";
import { mainListItems } from "./sidebar/ListItem";
import Divider from "@mui/material/Divider";
import useMediaQuery from "@mui/material/useMediaQuery";

const Layout = () => {
  const matches = useMediaQuery("(min-width:900px)");
  return (
    <Box sx={{ flexGrow: 1, background: "#fff" }}>
      <Grid container sx={{ my: 2 }}>
        <Grid item xs={12} md={3}>
          {matches && (
            <Item>
              {mainListItems}
              <Divider sx={{ my: 1 }} />
            </Item>
          )}
        </Grid>
        <Outlet />
      </Grid>
    </Box>
  );
};

export default Layout;
