import { Component,inject,Input, signal } from '@angular/core';
import { ScoreComponent } from '../score/scrore';
import { Comment } from '../../models/comments';
import { FormComponent } from '../form/form';
import { CommentStore } from '../../store/comment-store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DeleteDialogComponent } from '../dialog/dialog';

@Component({
  selector: 'comment-item',
  imports: [ScoreComponent,FormComponent,ButtonModule,CardModule,DeleteDialogComponent],
  templateUrl: './comment-item.html',
})

export class CommentItemComponent {
  @Input() comment_data:Comment;
  store = inject(CommentStore);
  
  constructor() {
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
  }

  handleShowForm(){
    this.store.showReplyForm(this.comment_data.id);
  }
}
