import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export default function NotFound() {
  return (
    <Container>
      <Typography variant="overline" aria-label="">
        Oops! <br />
        You seem to have stumbled upon a page that does not exist
      </Typography>
      <Typography variant="caption">Wanna fix? Press this button</Typography>
      <Link to="/">
        <Button variant="contained">Home</Button>
      </Link>
    </Container>
  );
}
