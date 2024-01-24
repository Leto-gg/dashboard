import PropTypes from "prop-types";
import { useRef, useState } from "react";

// material-ui
import {
  Avatar,
  Box,
  ButtonBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from "@mui/material";

// assets
import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import useAuth from "../../../../../hooks/useAuth";
import { useLetoUser } from "../../../../../hooks/useLetoUser";
import { useNavigate } from "react-router-dom";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

const Profile = () => {
  // const theme = useTheme();
  const { logout } = useAuth();
  const { user } = useLetoUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // logout
    logout();
  };

  const handleAccountDetails = () => {
    navigate("/account-details");
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = "grey.300";

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : "transparent",
          borderRadius: 1,
          "&:hover": { bgcolor: "secondary.lighter" },
        }}
        id="profile-button"
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? "profile-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Typography variant="body1">{user?.name}</Typography>
          <Avatar alt="profile user" sx={{ width: 32, height: 32 }} />
        </Stack>
      </ButtonBase>
      <Menu
        id="profile-menu"
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        MenuListProps={{
          "aria-labelledby": "profile-button",
        }}
      >
        <MenuList>
          <MenuItem onClick={handleAccountDetails}>
            <ListItemIcon>
              <SettingOutlined />
            </ListItemIcon>
            <ListItemText primary="Account details" />
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutOutlined />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default Profile;
