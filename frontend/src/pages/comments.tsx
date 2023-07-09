import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/comments.module.css";
import { Comment } from "@/interfaces.ts/interfaces";

type CommentType = {
  id: number;
  content: string;
};

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get<Comment[]>(
          "http://localhost:8000/comments"
        );
        setComments(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {comments.map((comment) => (
        <div key={comment.cid} className={styles.comment}>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
