import {Injectable, signal, computed} from '@angular/core';
import {Comment} from '../models/comments';
import { Reply } from '../models/reply';
import { InteractiveCommentsService } from '../services/comment.service';

type ActiveReply =
  | { type: 'comment'; comment_id: number }
  | { type: 'reply'; reply_id: number }
  | null;

@Injectable({
  providedIn: 'root',
})


export class CommentStore {
  private comments = signal<Comment[]>([]);
  private showForm = signal<boolean>(false);
  private activeReply = signal<ActiveReply>(null);
  
  // Readonly signals
  readonly commentItems = this.comments.asReadonly();
  readonly showFormState = this.showForm.asReadonly();
  readonly activeReplyState = this.activeReply.asReadonly();
  readonly activeReplyToCommentId = computed(() => {
    const value = this.activeReply();
    return value?.type === 'comment' ? value.comment_id : null;
  });

  readonly activeReplyToReplyId = computed(() => {
    const value = this.activeReply();
    return value?.type === 'reply' ? value.reply_id : null;
  });
  
  constructor(commentService: InteractiveCommentsService){
    commentService.getCommentList().subscribe((result)=>this.comments.set(result));   
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
  showReplyToComment(comment_id: number) {
    this.activeReply.set({ type: 'comment', comment_id });
  }

  showReplyToReply(reply_id: number) {
    this.activeReply.set({ type: 'reply', reply_id });
  }

  hideReplyForm() {
    this.activeReply.set(null);
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
