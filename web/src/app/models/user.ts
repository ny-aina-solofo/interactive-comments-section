export interface User  {
  user_id: number;
  username: string;
  password: string;
  avatar : {
    png: string;
    webp: string;
  };
}