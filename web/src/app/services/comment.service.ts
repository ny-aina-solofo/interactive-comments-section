import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment} from '../models/comments';
import { User } from '../models/user';
import { Reply } from '../models/reply';
import * as data from './data.json';

const USER_STORAGE_KEY = "user-comments";

@Injectable({
  providedIn: 'root',
})

  
export class InteractiveCommentsService {
  
  private url:string = "http://127.0.0.1:3000/comment-api";
  user_data: User;

  constructor(private http:HttpClient) {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    this.user_data = storedUser ? JSON.parse(storedUser) : data.currentUser;

  };

  // getUser():Observable<User[]> {
  //   return this.http.get<User[]>(this.url + '/get-user'); 
  // }
  getUser() {
    return this.user_data;
  }

  getCommentList():Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + '/get-comment'); 
  }


  addComment(content:string, user_data:User):Observable<{content:string, user_data:User}> {
    return this.http.post<{content:string, user_data:User}>(this.url + '/add-comment', {content, user_data});
  }

  addReply( 
    content:string, 
    replyingto:string, 
    user_data:User,
    comment_id:number
  ):Observable<{content:string, replyingto:string, user_data:User,comment_id:number}> {
    return this.http.post<{
      content:string, 
      replyingto:string, 
      user_data:User,
      comment_id:number
    }>(this.url + '/add-reply', {content, replyingto, user_data, comment_id});
  }

  deleteComment(comment_id:number | undefined):Observable<{comment_id:number | undefined}> {
    return this.http.delete<{comment_id:number | undefined}>(this.url + `/delete-comment/${comment_id}`);
  }

  deleteReply(reply_id: number):Observable<{reply_id: number}> {
    return this.http.delete<{reply_id:number }>(this.url + `/delete-reply/${reply_id}`);
    
  }

  editComment(
      comment_id: number | undefined, 
      content: string
  ):Observable<{comment_id: number | undefined, content: string}> {
    return this.http.put<{
      comment_id: number | undefined, 
      content: string
    }>(this.url + `/edit-comment/${comment_id}`,{content});
  }

  editReply( 
    reply_id: number, 
    content: string 
  ):Observable<{reply_id: number, content: string }> {
      return this.http.put<{
      reply_id: number, 
      content: string
    }>(this.url + `/edit-reply/${reply_id}`,{content});  
  }

  updateCommentScore(
    comment_id:number | undefined, 
    score:number
  ) : Observable<{comment_id:number | undefined, score:number}> {
    return this.http.put<{
      comment_id:number | undefined, 
      score:number
    }>(this.url + `/edit-comment-score/${comment_id}`, {score})
  }

  updateReplyScore(  
    reply_id:number | undefined, 
    score:number
  ) : Observable<{reply_id:number | undefined, score:number}> {
    return this.http.put<{
      reply_id:number | undefined, 
      score:number
    }>(this.url + `/edit-reply-score/${reply_id}`, {score})
  }




  
}
