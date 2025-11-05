import { Container } from "@mui/material";


export default function UserRights() {
  return (
    <Container maxWidth="xs" sx={{mt: 2}}>
      <h1>Недостаточно прав</h1>
      <p>У вас нет доступа к данному пространству.</p>
    </Container>
  )
}
