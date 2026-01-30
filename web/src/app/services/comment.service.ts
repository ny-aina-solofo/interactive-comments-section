import { Injectable, signal } from '@angular/core';
import * as data from './data.json';
import { Comment} from '../models/comments';
import { User } from '../models/user';
import { Reply } from '../models/reply';

const COMMENT_STORAGE_KEY = "interactive-comments";
const USER_STORAGE_KEY = "user-comments";

@Injectable({
  providedIn: 'root',
})

  
export class InteractiveCommentsService {
  
  comments_data :Comment[];
  user_data: User;
  
  constructor(){
    const storedComment = localStorage.getItem(COMMENT_STORAGE_KEY);
    this.comments_data = storedComment ? JSON.parse(storedComment) : data.comments;
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    this.user_data = storedUser ? JSON.parse(storedUser) : data.currentUser;
  }
  
  getUser() {
    return this.user_data;
  }

  getCommentList() {
    return this.comments_data;
  }


  addComment(newComment:Comment | Reply) {
    const comments = this.getCommentList();
    // comments.push(newComment)
    localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(comments));
    return newComment;
  }

  
}
