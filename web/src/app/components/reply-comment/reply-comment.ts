import { Component, inject, Input, signal } from '@angular/core';
import { Reply } from '../../models/reply';
import { ScoreComponent } from '../score/scrore';
import { FormComponent } from '../form/form';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommentStore } from '../../store/comment-store';
import { DeleteDialogComponent } from '../dialog/delete-dialog';

@Component({
  selector: 'reply-comment',
  imports: [ScoreComponent,FormComponent,ButtonModule,CardModule,DeleteDialogComponent],
  templateUrl: './reply-comment.html',
})

export class ReplyCommentComponent {
  @Input() reply_data:Reply;
  store = inject(CommentStore);
  
  constructor() {
    this.reply_data = {
      id: 0,
      content: '',
      createdAt: '',
      score: 0,
      replyingTo: '',
      user: {
        image: {
          png: '',
          webp: '',
        },
        username: '',
      },
    };
  }
  handleShowForm(){
    this.store.showReplyForm(this.reply_data.id);
  }
}
