import { Reply }from './reply';
import { User } from './user';

export interface Comment  {
  comment_id: number;
  content: string;
  created_at: string;
  score: number;
  user_data: User;
  replies: Reply[];
}