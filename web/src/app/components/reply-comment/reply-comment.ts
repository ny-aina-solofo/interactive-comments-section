import { Component, Input, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { UpvotesComponent } from '../upvotes/upvotes';
import { Reply } from '../../models/reply';

@Component({
  selector: 'reply-comment',
  imports: [UpvotesComponent,MatCardModule,MatButtonModule],
  templateUrl: './reply-comment.html',
//   styleUrl: './app.css'
})

export class ReplyCommentComponent {
  @Input() reply:Reply;

  constructor() {
    this.reply = {
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
}
