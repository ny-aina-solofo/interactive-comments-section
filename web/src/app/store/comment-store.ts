import {Injectable, signal, computed} from '@angular/core';
import {Comment} from '../models/comments';
import { Reply } from '../models/reply';
import { InteractiveCommentsService } from '../services/comment.service';
import { User } from '../models/user';
import { getAgoTime } from '../utils/get-time';

@Injectable({
  providedIn: 'root',
})
export class CommentStore {
  private comments = signal<Comment[]>([]);
  private allUsers = signal<User[]>([]);
  private showForm = signal<boolean>(false);
  private activeReplyId = signal<number | null>(null);
  
  // Readonly signals
  readonly commentItems = this.comments.asReadonly();
  readonly userItems = this.allUsers.asReadonly();
  readonly showFormState = this.showForm.asReadonly();
  readonly activeReplyIdState = this.activeReplyId.asReadonly();

  constructor(commentService: InteractiveCommentsService){
    commentService.getCommentList().subscribe((result)=>this.comments.set(result));   
    commentService.getUser().subscribe((result)=>this.allUsers.set(result));   
  }

  addComment(newComment:Comment) {
    this.comments.update((currentComments) => [...currentComments,newComment]);
  }

  addReply(comment_id:number, newReply:Reply){  
    this.comments.update((currentComment) =>
      currentComment.map((comment) =>
        comment.comment_id === comment_id
          ? { ...comment, replies: [...comment.replies, newReply] }
          : comment
      )
    );
  }

  showReplyForm(comment_id: number) {
    this.activeReplyId.set(comment_id);
  }

  hideReplyForm() {
    this.activeReplyId.set(null);
  }

  deleteComment(id: number | undefined) {
    this.comments.update((currentComment) => currentComment.filter((comment) => comment.comment_id !== id));
  }

  deleteReply(comment_id: number, reply_id: number) {
    this.comments.update((comments) =>
      comments.map((comment) =>
        comment.comment_id === comment_id
          ? {
              ...comment,
              replies: comment.replies.filter(
                (reply) => reply.reply_id !== reply_id
              ),
            }
          : comment
      )
    );
  }


  editComment(id: number | undefined, newContent: string) {
    this.comments.update((currentComment) =>
      currentComment.map((comment => (comment.comment_id === id ? {...comment, content : newContent} : comment)),
    ));
  }

  editReply(comment_id: number, reply_id: number, newContent: string ) {
    this.comments.update((comments) =>
      comments.map((comment) =>
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
    );
  }

  updateCommentScore(comment_id:number | undefined, newScore:number){
    this.comments.update((currentComment) =>
      currentComment.map((comment => (comment.comment_id === comment_id ? {...comment, score: newScore} : comment)),
    ));
  }

  updateReplyScore(comment_id:number, reply_id:number, newScore:number){
    this.comments.update((comments) =>
      comments.map((comment) =>
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
    );
  }

  
}
