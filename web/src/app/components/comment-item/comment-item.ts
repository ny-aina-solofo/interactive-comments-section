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
import { GetTimeAgoPipe } from '../../utils/pipe/time-ago.pipe';


@Component({
  selector: 'comment-item',
  imports: [
    ScoreComponent,
    FormComponent,
    ButtonModule,
    CardModule,
    DeleteDialogComponent,
    EditDialogComponent,
    BadgeModule,
    GetTimeAgoPipe
  ],
  templateUrl: './comment-item.html',
})

export class CommentItemComponent {
  @Input() comment_data:Comment;
  store = inject(CommentStore);
  user: User;
 
  constructor(commentService: InteractiveCommentsService) {
    this.user = commentService.getUser();
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
    this.store.showReplyToComment(this.comment_data.comment_id);
  }
}
