import { Component, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { InteractiveCommentsService } from '../../services/interactive-comments.service';

@Component({
  selector: 'add-comments',
  imports: [FormsModule,MatCardModule,MatButtonModule],
  templateUrl: './add-comments.html',
//   styleUrl: './app.css'
})

export class AddCommentsComponent {
  text = '';

  constructor(private commentService: InteractiveCommentsService) {}
  
  addComments() {
    if (!this.text) return;
    this.commentService.addComments(this.text.trim());
    this.text = "";
  }
}
