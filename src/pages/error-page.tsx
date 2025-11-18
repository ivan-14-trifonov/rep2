import { useRouteError } from "react-router-dom";
import { Container, Typography } from "@mui/material";

interface RouteError {
  statusText?: string;
  message?: string;
  [key: string]: any;
}

export default function ErrorPage() {

  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <Typography variant="h5" component="div" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body1" component="div" gutterBottom>
        <i>{error.statusText || error.message}</i>
      </Typography>
    </Container>
  );
}
