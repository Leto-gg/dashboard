import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";

// material-ui
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

// ==============================|| DRAWER HEADER - STYLED ||============================== //

const DrawerHeaderStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  ...theme.mixins.toolbar,
  display: "flex",
  alignItems: "center",
  justifyContent: open ? "flex-start" : "center",
  paddingLeft: theme.spacing(open ? 3 : 0),
}));

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:active,
  &:hover {
    color: inherit;
  }
`;

// ==============================|| DRAWER HEADER ||============================== //

export function DrawerHeader({ open }) {
  const theme = useTheme();

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h4">
          <StyledLink aria-label="app logo home link" to="/" variant="text">
            Leto Dashboard
          </StyledLink>
        </Typography>
      </Stack>
    </DrawerHeaderStyled>
  );
}

DrawerHeader.propTypes = {
  open: PropTypes.bool,
};

export default DrawerHeader;
