import { useState } from "react";
import axios from "axios";
import styles from "../styles/login.module.css"; // CSS 모듈을 import합니다.

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post<{ token: string }>(
        "http://localhost:8000/auth/login",
        {
          email,
          password,
        }
      );
      const token = res.data.token;
      console.log("Access Token:", token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <div className={styles.formGroup}>
        <label>Email:</label>
        <input
          type="email"
          className={styles.input}
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label>Password:</label>
        <input
          type="password"
          className={styles.input}
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button className={styles.button} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
