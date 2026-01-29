import { Component,Input, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { UpvotesComponent } from '../upvotes/upvotes';
import { Comment } from '../../models/comments';

@Component({
  selector: 'comments-item',
  imports: [UpvotesComponent,MatCardModule,MatButtonModule],
  templateUrl: './comments-item.html',
//   styleUrl: './app.css'
})

export class CommentsItemComponent {
  @Input() comment:Comment;

  constructor() {
    this.comment = {
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

}
