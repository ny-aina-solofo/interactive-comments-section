import { AfterViewInit, Component, computed, effect, ElementRef, inject, Input, OnChanges,  signal,SimpleChanges, ViewChild } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { InteractiveCommentsService } from '../../services/comment.service';
import { User } from '../../models/user';
import { CommentStore } from '../../store/comment-store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { getAgoTime } from '../../utils/get-time';

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
      const newReply = {
        id: Date.now(),
        content: comment.replace(`@${this.data.username} `, ''),
        createdAt: getAgoTime(Date.now()),
        score: 0,
        replyingTo : this.data.username,
        user: this.user,
      };  
      this.store.addReply(this.data.comment_id, newReply);
      this.commentService.addReply(this.data.comment_id, newReply);  
    } else {
      const newComment = {
        id: Date.now(),
        content: comment,
        createdAt: getAgoTime(Date.now()),
        score: 0,
        user: this.user,
        replies:[]
      };
      this.store.addComment(newComment);
      this.commentService.addComment(newComment);
    }
    this.store.hideReplyForm();
    this.comment.set('');
  }

  handleCancel() {
    this.store.hideReplyForm();
  }
}
