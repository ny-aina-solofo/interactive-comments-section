import {Injectable, signal, computed} from '@angular/core';
import {Comment} from '../models/comments';
import { Reply } from '../models/reply';
import { InteractiveCommentsService } from '../services/comment.service';
import { User } from '../models/user';

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
      createdAt: new Date().toISOString(),
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
      createdAt: new Date().toISOString(),
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
//   removeComment(id: string) {
//     this.Comments.update((currentComments) => currentComments.filter((Comment) => Comment.id !== id));
//   }

//   updateQuantity(id: string, quantity: number) {
//     if (quantity <= 0) {
//       this.removeComment(id);
//       return;
//     }

//     this.Comments.update((currentComments) =>
//       currentComments.map((Comment) => (Comment.id === id ? {...Comment, quantity} : Comment)),
//     );
//   }

  
}
