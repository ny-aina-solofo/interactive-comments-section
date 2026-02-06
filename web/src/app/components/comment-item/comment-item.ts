import { Component,inject,Input, signal } from '@angular/core';
import { ScoreComponent } from '../score/scrore';
import { Comment } from '../../models/comments';
import { FormComponent } from '../form/form';
import { CommentStore } from '../../store/comment-store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DeleteDialogComponent } from '../dialog/delete-dialog';
import { EditDialogComponent } from '../dialog/edit-dialog';
import { User } from '../../models/user';
import { InteractiveCommentsService } from '../../services/comment.service';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'comment-item',
  imports: [
    ScoreComponent,
    FormComponent,
    ButtonModule,
    CardModule,
    DeleteDialogComponent,
    EditDialogComponent,
    BadgeModule
  ],
  templateUrl: './comment-item.html',
})

export class CommentItemComponent {
  @Input() comment_data:Comment;
  store = inject(CommentStore);
    
  constructor(commentService: InteractiveCommentsService) {

    this.comment_data = {
      comment_id: 0,
      content: '',
      created_at: '',
      score: 0,
      user_data: {
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
    this.store.showReplyForm(this.comment_data.comment_id);
  }
}
