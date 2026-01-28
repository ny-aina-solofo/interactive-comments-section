import { Component, signal } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'add-comments',
  imports: [FormsModule,MatCardModule,MatButtonModule],
  templateUrl: './add-comments.html',
//   styleUrl: './app.css'
})

export class AddCommentsComponent {
  newComments = '';

  addComments() {
    console.log(this.newComments.trim());
    this.newComments = ""
  }
}
