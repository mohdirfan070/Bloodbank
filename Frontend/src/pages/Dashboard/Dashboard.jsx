import React, { useContext,  useState } from "react";
import UsersTable from "../../components/DataTable";
import OrganizationsTable from "../../components/OrganizationTable";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import RequestTable from "../../components/RequestTable";
import ErrorBoundary from "../../components/ErrorBoundary";
import { userContext } from "../../App";
export default function Dashboard() {

  const { userRole, updateSetUserRole } = useContext(userContext);
  const [item, setItem] = useState("donor");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <div>
      <Typography className="text-center p-4 bg-blue-800 text-xl text-white select-none">Dashboard</Typography>
      <List>
        <ListItem className="hover:cursor-pointer"  button onClick={() => { setItem("donor"); setDrawerOpen(false); }}>
          <ListItemText primary="Donor" />
        </ListItem>
        <ListItem className="hover:cursor-pointer" button onClick={() => { setItem("org"); setDrawerOpen(false); }}>
          <ListItemText primary="Organization" />
        </ListItem>
       { userRole=="admin" && <ListItem className="hover:cursor-pointer" button onClick={() => { setItem("requests"); setDrawerOpen(false); }}>
          <ListItemText primary="Requests" />
        </ListItem>}
      </List>
    </div>
  );

  return (
    <div className="h-full w-full flex">
      <AppBar position="fixed" className="md:hidden">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap>
            Dashboard
          </Typography> */}
          <Link className="absolute right-12" to={"/"} >Home</Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        className="md:hidden"
      >
        {drawer}
      </Drawer>
      <div className="left-dash bg-blue-300 flex-1 hidden md:block">
        {drawer}
      </div>
      <div className="w-full mt-16 md:mt-0">
        {item === "donor" ? <UsersTable /> : item === "org" ? <OrganizationsTable /> : item=="requests" ? <ErrorBoundary> <RequestTable /> </ErrorBoundary>  : " "}
      </div>
    </div>
  );
}
