import { Component, inject } from '@angular/core';
import {FormComponent}  from '../form/form';
import { CommentItemComponent } from '../comment-item/comment-item';
import { InteractiveCommentsService } from '../../services/comment.service';
import { Comment } from '../../models/comments';
import { ReplyCommentComponent } from '../reply-comment/reply-comment';
import { CommentStore } from '../../store/comment-store';

@Component({
  selector: 'comment-list',
  imports: [FormComponent,CommentItemComponent,ReplyCommentComponent],
  templateUrl: './comment-list.html',
})
export class CommentListComponent {
  store = inject(CommentStore);
}
