import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import HistoryIcon from "@mui/icons-material/History";
import { Link } from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidenav = () => {
    const { collapseSidebar, collapsed } = useProSidebar();

    return (
        <Box height="100vh" display="flex">
            <Sidebar height="100vh">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p="10px"
                    ml="10px"
                >
                    {!collapsed && (
                        <Typography variant="h6">Dashboard</Typography>
                    )}
                    <IconButton onClick={() => collapseSidebar()}>
                        <MenuIcon />
                    </IconButton>
                </Box>
                <Menu>
                    <MenuItem component={<Link to="/" />} icon={<HomeIcon />}>
                        <Typography>Dashboard</Typography>
                    </MenuItem>
                    <MenuItem
                        component={<Link to="/report-history" />}
                        icon={<HistoryIcon />}
                    >
                        Report History
                    </MenuItem>
                    <MenuItem
                        component={<Link to="/users" />}
                        icon={<GroupIcon />}
                    >
                        Users
                    </MenuItem>
                    <MenuItem
                        component={<Link to="/reports" />}
                        icon={<AssessmentIcon />}
                    >
                        Reports
                    </MenuItem>
                    <MenuItem
                        component={<Link to="/logout" />}
                        icon={<LogoutIcon />}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </Sidebar>
        </Box>
    );
};

export default Sidenav;
