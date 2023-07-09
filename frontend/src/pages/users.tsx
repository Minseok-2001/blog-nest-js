import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/users.module.css";

type UserType = {
  name: string;
  email: string;
  // 기타 필요한 유저 정보 타입
};

const User = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰을 가져옵니다.
        const res = await axios.get<UserType>("http://localhost:8000/users", {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함시킵니다.
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>User Info</h1>
      {user && (
        <div className={styles.userInfo}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          {/* 기타 필요한 유저 정보 출력 */}
        </div>
      )}
    </div>
  );
};

export default User;
