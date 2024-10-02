import {useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";
import {Button, Container} from "@mui/material";

export default function User() {

  const auth = getAuth();
  let navigate = useNavigate();

  const user = auth.currentUser;
  if (user == null) {
    navigate("/login");
  }

  const onLogout = () => {
    // googleSignInClient.signOut();
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <h1>Репертуар</h1>
      <Button variant="contained" color="error" onClick={onLogout} sx={{mt: 3}} fullWidth>
        Выйти
      </Button>
    </Container>
  )
}

