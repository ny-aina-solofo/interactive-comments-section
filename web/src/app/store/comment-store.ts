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
  private showForm = signal<boolean>(false);
  private activeReplyId = signal<number | null>(null);
  comment_data:Comment[];

  // Readonly signals
  readonly commentItems = this.comments.asReadonly();
  readonly showFormState = this.showForm.asReadonly();
  readonly activeReplyIdState = this.activeReplyId.asReadonly();

  constructor(commentService: InteractiveCommentsService){
    this.comment_data = commentService.getCommentList();
    this.comments.set(this.comment_data);
  }

  addComment(comment:string, user:User) {
    const newComment = {
      id: Date.now(),
      content: comment,
      createdAt: getAgoTime(Date.now()),
      score: 0,
      user: user,
      replies:[]
    };
    this.comments.update((currentComments) => [...currentComments,newComment]);
  }

  addReply(comment_id:number, commentWithReply:string, replyingTo:string, user:User){
    const newReply = {
      id: Date.now(),
      content: commentWithReply,
      createdAt: getAgoTime(Date.now()),
      score: 0,
      replyingTo : replyingTo,
      user: user,
    };  
    this.comments.update((currentComment) =>
      currentComment.map((comment) =>
        comment.id === comment_id
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
    this.comments.update((currentComment) => currentComment.filter((comment) => comment.id !== id));
  }

  deleteReply(comment_id: number, reply_id: number) {
    this.comments.update((comments) =>
      comments.map((comment) =>
        comment.id === comment_id
          ? {
              ...comment,
              replies: comment.replies.filter(
                (reply) => reply.id !== reply_id
              ),
            }
          : comment
      )
    );
  }


  editComment(id: number | undefined, newContent: string) {
    this.comments.update((currentComment) =>
      currentComment.map((comment => (comment.id === id ? {...comment, content : newContent} : comment)),
    ));
  }

  editReply(comment_id: number, reply_id: number, newContent: string ) {
    this.comments.update((comments) =>
      comments.map((comment) =>
        comment.id === comment_id
          ? {
              ...comment,
              replies: comment.replies.map(
                (reply) => reply.id === reply_id ?
                {...reply, content : newContent} : reply
              ),
            }
          : comment
      )
    );
  }

  updateCommentScore(comment_id:number | undefined, newScore:number){
    this.comments.update((currentComment) =>
      currentComment.map((comment => (comment.id === comment_id ? {...comment, score: newScore} : comment)),
    ));
  }

  updateReplyScore(comment_id:number, reply_id:number, newScore:number){
    this.comments.update((comments) =>
      comments.map((comment) =>
        comment.id === comment_id
          ? {
              ...comment,
              replies: comment.replies.map(
                (reply) => reply.id === reply_id ?
                {...reply, score : newScore} : reply
              ),
            }
          : comment
      )
    );
  }

  
}
