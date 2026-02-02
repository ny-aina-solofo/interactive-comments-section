import { Component, inject, Input, signal } from '@angular/core';
import { Reply } from '../../models/reply';
import { ScoreComponent } from '../score/scrore';
import { FormComponent } from '../form/form';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommentStore } from '../../store/comment-store';
import { DeleteDialogComponent } from '../dialog/delete-dialog';
import { EditDialogComponent } from '../dialog/edit-dialog';

@Component({
  selector: 'reply-item',
  imports: [ScoreComponent,FormComponent,ButtonModule,CardModule,DeleteDialogComponent,EditDialogComponent],
  templateUrl: './reply-item.html',
})

export class ReplyCommentComponent {
  @Input() reply_data:Reply;
  @Input() comment_id:number = 0;
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
