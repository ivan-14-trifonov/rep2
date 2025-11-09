import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Container, Snackbar, Alert, TextField, Box, Link } from "@mui/material";

export default function Register() {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const errorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError(false);
  };

  const successClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
    navigate("/login");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = getAuth();

  const handleRegister = (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError(true);
      return;
    }

    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setSuccess(true);
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
          Ошибка регистрации!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={success}
        autoHideDuration={6000}
        onClose={successClose}
      >
        <Alert onClose={successClose} severity="success">
          Регистрация успешна! Пожалуйста, войдите в систему.
        </Alert>
      </Snackbar>

      <h1>Регистрация</h1>
      <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isLoading}
        >
          Зарегистрироваться
        </Button>
        <Link href="/login" variant="body2" sx={{ display: "block", textAlign: "center" }}>
          Уже есть аккаунт? Войти
        </Link>
      </Box>
    </Container>
  )

}