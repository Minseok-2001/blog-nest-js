// In pages/writePost.tsx
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";

const WritePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/posts", {
        title,
        content,
      });
      router.push("/posts");
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        // Unauthorized
        router.push("/login");
      } else {
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={submitForm}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default WritePost;
