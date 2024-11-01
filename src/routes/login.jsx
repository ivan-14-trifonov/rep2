import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button, Container, Snackbar, Alert } from "@mui/material";

export default function Login() {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const errorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };

  const provider = new GoogleAuthProvider();

  const auth = getAuth();
  auth.languageCode = "ru";

  const handleAuth = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then(() => {
        navigate("/user");
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={error}
        autoHideDuration={6000}
        onClose={errorClose}
      >
        <Alert onClose={errorClose} severity="error">
          Ошибка авторизации!
        </Alert>
      </Snackbar>

      <h1>Войдите через Google для начала работы</h1>
      <Button variant="contained" loading={isLoading} onClick={handleAuth} sx={{mt: 3}} fullWidth>
        Войти через Google
      </Button>
    </Container>
  )

}
