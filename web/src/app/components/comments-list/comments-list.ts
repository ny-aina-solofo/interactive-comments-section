import { Component } from '@angular/core';
import {AddCommentsComponent}  from '../add-comments/add-comments';
import { CommentsItemComponent } from '../comments-item/comments-item';
import { ReplyCommentComponent } from '../reply-comment/reply-comment';
import { InteractiveCommentsService } from '../../services/interactive-comments.service';
import { Comment } from '../../models/comments';

@Component({
  selector: 'comments-list',
  imports: [AddCommentsComponent,CommentsItemComponent,ReplyCommentComponent],
  templateUrl: './comments-list.html',
})
export class CommentsListComponent {
  comments:Comment[];

  constructor(private commentService: InteractiveCommentsService){
    this.comments = commentService.getCommentsList();
  }
}
