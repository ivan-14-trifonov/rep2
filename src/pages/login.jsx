import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Container, Snackbar, Alert, TextField, Box, Typography, Link } from "@mui/material";

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);

  const provider = new GoogleAuthProvider();

  const auth = getAuth();
  auth.languageCode = "ru";

  const handleGoogleAuth = () => {
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

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
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

      {!showEmailForm ? (
        <>
          <h1>Войдите для начала работы</h1>
          <Button variant="contained" loading={isLoading} onClick={handleGoogleAuth} sx={{mt: 3, mb: 2}} fullWidth>
            Войти через Google
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => setShowEmailForm(true)} 
            sx={{mt: 1, mb: 2}} 
            fullWidth
          >
            Войти по email и паролю
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => navigate("/register")} 
            sx={{mt: 1, mb: 2}} 
            fullWidth
          >
            Зарегистрироваться
          </Button>
        </>
      ) : (
        <>
          <h1>Вход по email и паролю</h1>
          <Box component="form" onSubmit={handleEmailLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              Войти
            </Button>
            <Button 
              variant="text" 
              onClick={() => setShowEmailForm(false)} 
              sx={{mt: 1}} 
              fullWidth
            >
              Назад
            </Button>
          </Box>
        </>
      )}
    </Container>
  )

}
