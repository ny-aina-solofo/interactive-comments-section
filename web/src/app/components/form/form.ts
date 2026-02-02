import { AfterViewInit, Component, computed, effect, ElementRef, inject, Input, OnChanges,  signal,SimpleChanges, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { InteractiveCommentsService } from '../../services/comment.service';
import { User } from '../../models/user';
import { CommentStore } from '../../store/comment-store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

type FormData =
  | { type: 'reply'; comment_id: number; username: string }

@Component({
  selector: 'app-form',
  imports: [FormsModule,ButtonModule,CardModule],
  templateUrl: './form.html',
})

export class FormComponent {
  @Input() data: FormData | undefined  ;
  // @Input() reply_data: Reply  ;
  @ViewChild('textarea') textarea?: ElementRef<HTMLTextAreaElement>;
  store = inject(CommentStore);
  user: User;
  comment = signal('');

  constructor(private commentService: InteractiveCommentsService) {
    this.user = commentService.getUser();
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
      const comment_id = this.data.comment_id;
      const commentWithReply = comment.replace(`@${this.data.username} `, '')
      const replyingTo =  this.data.username;
      this.store.addReply(comment_id,commentWithReply,replyingTo,this.user);
      // this.commentService.addComment(reply);  
    } else {
      this.store.addComment(comment,this.user);
      // this.commentService.addComment(newComment);
    }
    this.store.hideReplyForm();
    this.comment.set('');
  }
}
