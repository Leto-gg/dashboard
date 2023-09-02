import PropTypes from "prop-types";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Stack, Typography } from "@mui/material";

// material-ui
import { styled as muiStyled } from "@mui/material/styles";
import styled from "styled-components";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import useImageBaseURL from "../../../hooks/useImageBaseURL";

// ==============================|| DRAWER HEADER - STYLED ||============================== //

const DrawerHeaderStyled = muiStyled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  ...theme.mixins.toolbar,
  display: "flex",
  alignItems: "center",
  justifyContent: open ? "flex-start" : "center",
  paddingLeft: theme.spacing(open ? 3 : 0),
}));

const StyledLink = muiStyled(Link)`
  align-items: center;
  display: flex;
  gap: 4px;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  &:active,
  &:hover {
    color: inherit;
  }
`;

const Image = styled.img`
  height: 35px;
  width: 35px;
`;

// ==============================|| DRAWER HEADER ||============================== //

export function DrawerHeader({ open }) {
  const theme = useTheme();

  const logoUrl = useImageBaseURL("/littleleto.png");

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="h4">
          <StyledLink aria-label="app logo home link" to="/" variant="text">
            <Image src={logoUrl} loading="lazy" alt="leto logo" />
            <span>Leto Dashboard</span>
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
