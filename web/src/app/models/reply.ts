import { User } from './user';

export interface Reply  {
  reply_id: number;
  content: string;
  created_at: string;
  score: number;
  replyingto: string;
  user_data: User;
  comment_id:number;
}