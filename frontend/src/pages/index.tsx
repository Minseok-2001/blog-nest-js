// pages/index.tsx
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../contexts/auth";
import Login from "./login";

export default function Home() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/posts");
    }
  }, [router, user]);

  return <div>{user ? <div>Loading...</div> : <Login />}</div>;
}
