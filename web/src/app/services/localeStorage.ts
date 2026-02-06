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

  
export class InteractiveComments {
  
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


  addComment(newComment:Comment) {
    // const comments = this.getCommentList();
    const updated = [...this.comments_data, newComment];
    localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(updated));
  }

  addReply(comment_id:number, newReply:Reply) {
    // const comments = this.getCommentList();
    const updated =  this.comments_data.map((comment) =>
      comment.comment_id === comment_id
        ? { ...comment, replies: [...comment.replies, newReply] }
        : comment
      );
    localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(updated));
  }

  deleteComment(comment_id:number | undefined) {
      // const comments = this.getCommentList();
      const updated = this.comments_data.filter(comment => comment.comment_id !== comment_id);
      localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(updated));
  }

  deleteReply(comment_id: number, reply_id: number) {
    // const comments = this.getCommentList();
    const updated =  this.comments_data.map((comment) =>
      comment.comment_id === comment_id
        ? {
            ...comment,
            replies: comment.replies.filter(
              (reply) => reply.reply_id !== reply_id
            ),
          }
        : comment
    )
    localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(updated));
  
  }

  editComment(id: number | undefined, newContent: string) {
    // const comments = this.getCommentList();
    const updated = this.comments_data.map((comment) => comment.comment_id === id ? {...comment, content : newContent} : comment);
    localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(updated));
  }

  editReply(comment_id: number, reply_id: number, newContent: string ) {
    // const comments = this.getCommentList();
    const updated = this.comments_data.map((comment) =>
      comment.comment_id === comment_id
        ? {
            ...comment,
            replies: comment.replies.map(
              (reply) => reply.reply_id === reply_id ?
              {...reply, content : newContent} : reply
            ),
          }
        : comment
    )
    localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(updated));
  }

  updateCommentScore(comment_id:number | undefined, newScore:number){
    // const comments = this.getCommentList();
    const updated =  this.comments_data.map((comment) => comment.comment_id === comment_id ? {...comment, score: newScore} : comment);
    localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(updated));
  }

  updateReplyScore(comment_id:number, reply_id:number, newScore:number){
    // const comments = this.getCommentList();
    const updated =  this.comments_data.map((comment) =>
      comment.comment_id === comment_id
        ? {
            ...comment,
            replies: comment.replies.map(
              (reply) => reply.reply_id === reply_id ?
              {...reply, score : newScore} : reply
            ),
          }
        : comment
    )
    localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(updated));
  }




  
}
