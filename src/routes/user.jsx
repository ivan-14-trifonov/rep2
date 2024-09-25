import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getAuth, signOut} from "firebase/auth";

export default function User() {

  const auth = getAuth();
  let navigate = useNavigate();

  // Проверка авторизации
  const user = auth.currentUser;
  if (user == null) {
    navigate("/login");
  }

  const onLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <h1>User</h1>
  )
}
