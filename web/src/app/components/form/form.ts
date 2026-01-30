import { AfterViewInit, Component, computed, effect, ElementRef, inject, Input, OnChanges,  signal,SimpleChanges, ViewChild } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { InteractiveCommentsService } from '../../services/comment.service';
import { User } from '../../models/user';
import { Reply } from '../../models/reply';
import { CommentStore } from '../../store/comment-store';
import { Comment } from '../../models/comments';

@Component({
  selector: 'app-form',
  imports: [FormsModule,MatCardModule,MatButtonModule],
  templateUrl: './form.html',
})

export class FormComponent {
  @Input() comment_data: Comment  ;
  @ViewChild('textarea') textarea?: ElementRef<HTMLTextAreaElement>;
  replyingTo = computed(() => this.comment_data?.user?.username ?? '');
  store = inject(CommentStore);
  user: User;
  comment = signal('');

  constructor(private commentService: InteractiveCommentsService) {
    this.user = commentService.getUser();
    this.comment_data = {
      id: 0,
      content: '',
      createdAt: '',
      score: 0,
      user: {
        image: {
          png: '',
          webp: '',
        },
        username: '',
      },
      replies: [],
    };
    effect(() => {
      const username = this.replyingTo();
      if (username) {
        this.comment.set(`@${username} `);
        queueMicrotask(() => this.textarea?.nativeElement.focus());
      }
    });
  }

  addComments() {
     const comment = this.comment().trim();
    if (!comment) return;

    if (this.replyingTo()) {
      const comment_id = this.comment_data.id;
      const commentWithReply = comment.replace(`@${this.replyingTo()} `, '')
      const replyingTo =  this.replyingTo();
      this.store.addReply(comment_id,commentWithReply,replyingTo,this.user);
      // this.commentService.addComment(reply);
    } else {
      this.store.addComment(comment,this.user)
      // this.commentService.addComment(newComment);
    }
    this.store.hideReplyForm();
    this.comment.set('');
  }
}
