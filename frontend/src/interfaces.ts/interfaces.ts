// interfaces.ts
export interface User {
  uid: number;
  kakaoId?: string;
  googleId?: string;
  name: string;
  email: string;
  password?: string;
  posts: Post[];
  comments: Comment[];
}

export interface Post {
  pid: number;
  title: string;
  content: string;
  createdAt: string; // JavaScript Date object will be serialized to string
  updatedAt: string; // JavaScript Date object will be serialized to string
  author: User;
  comments: Comment[];
}

export interface Comment {
  cid: number;
  content: string;
  createdAt: string; // JavaScript Date object will be serialized to string
  updatedAt: string; // JavaScript Date object will be serialized to string
  author: User;
  post: Post;
}
