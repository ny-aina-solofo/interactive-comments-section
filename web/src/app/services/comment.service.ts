import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment} from '../models/comments';
import { User } from '../models/user';
import { Reply } from '../models/reply';


@Injectable({
  providedIn: 'root',
})

  
export class InteractiveCommentsService {
  
  private url:string = "http://127.0.0.1:3000/comment-api";

  constructor(private http:HttpClient) {};

  getUser():Observable<User[]> {
    return this.http.get<User[]>(this.url + '/get-user'); 
  }

  getCommentList():Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + '/get-comment'); 
  }


  addComment(newComment:Comment) {
  }

  addReply(comment_id:number, newReply:Reply) {
  }

  deleteComment(comment_id:number | undefined) {
  }

  deleteReply(comment_id: number, reply_id: number) {
  
  }

  editComment(id: number | undefined, newContent: string) {
  }

  editReply(comment_id: number, reply_id: number, newContent: string ) {
  }

  updateCommentScore(comment_id:number | undefined, newScore:number){
  }

  updateReplyScore(comment_id:number, reply_id:number, newScore:number){
  }




  
}
