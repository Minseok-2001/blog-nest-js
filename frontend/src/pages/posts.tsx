// In posts.tsx
import Link from "next/link";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import styles from "../styles/posts.module.css";
import { Post } from "@/interfaces.ts/interfaces";
import router from "next/router";

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/posts");
        setPosts(res.data);
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 401) {
          // Unauthorized
          router.push("/login");
        } else {
          console.error(err);
        }
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Posts</h1>
      {posts?.map((post) => (
        <div key={post.pid} className={styles.post}>
          <h2>
            <Link href={`/posts/${post.pid}`}>
              <a>{post.title}</a>
            </Link>
          </h2>
          <p>{post.content}</p>
        </div>
      ))}
      <button>
        <Link href="/writePost">
          <a>Write a new post</a>
        </Link>
      </button>
    </div>
  );
};

export default Posts;
