// In pages/posts/[id].tsx
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Post } from "@/interfaces.ts/interfaces";

const PostDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 401) {
          // Unauthorized
          router.push("/login");
        } else {
          console.error(err);
        }
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, router]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default PostDetail;
