import { AfterViewInit, Component, computed, effect, ElementRef, inject, Input, OnChanges,  signal,SimpleChanges, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { InteractiveCommentsService } from '../../services/comment.service';
import { User } from '../../models/user';
import { CommentStore } from '../../store/comment-store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

type FormData = { type: 'reply'; comment_id: number; username: string }

@Component({
  selector: 'app-form',
  imports: [FormsModule,ButtonModule,CardModule],
  templateUrl: './form.html',
})

export class FormComponent {
  @Input() data: FormData | undefined  ;
  @ViewChild('textarea') textarea?: ElementRef<HTMLTextAreaElement>;
  store = inject(CommentStore);
  user: User;
  comment = signal('');

  constructor(private commentService: InteractiveCommentsService) {
    this.user = this.commentService.getUser();
    effect(() => {
      const username = this.data?.username;
      if (username) {
        this.comment.set(`@${username} `);
        queueMicrotask(() => this.textarea?.nativeElement.focus());
      }
    });
  }

  addComments() {
    const comment = this.comment().trim();
    if (!comment) return;
    
    if (this.data) {
      const replyContent = comment.replace(`@${this.data.username} `, ''); 
      const newReply = {
        reply_id: Date.now(),
        content: replyContent,
        created_at: new Date().toLocaleString(),
        score: 0,
        replyingto : this.data.username,
        user_data: this.user,
        comment_id: this.data.comment_id
      };  
      this.store.addReply(this.data.comment_id, newReply);
      this.commentService.addReply(replyContent,this.data.username,this.user,this.data.comment_id).subscribe();  
    } else {
      const newComment = {
        comment_id: Date.now(),
        content: comment,
        created_at: new Date().toLocaleString(),
        score: 0,
        user_data: this.user,
        replies:[]
      };
      this.store.addComment(newComment);
      this.commentService.addComment(comment,this.user).subscribe();
    }
    this.store.hideReplyForm();
    this.comment.set('');
  }

  handleCancel() {
    this.store.hideReplyForm();
  }
}
