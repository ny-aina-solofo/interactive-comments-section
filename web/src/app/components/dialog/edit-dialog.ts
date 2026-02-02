import { Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommentStore } from '../../store/comment-store';
import { Comment } from '../../models/comments';
import { FormsModule } from '@angular/forms';

@Component({
    selector:'edit-dialog',
    template: `
        <div>
            <div 
                class="flex gap-2 text-sm font-bold text-purple-600 cursor-pointer"
                (click)="showDialog()"
            >

                <img
                    src="assets/icon-edit.svg"
                    alt="icon-edit"
                    class="size-4 "
                />
                Edit
            </div>
            <p-dialog 
                [modal]="true" [(visible)]="visible"   [closable]="false" 
                [style]="{ 
                    width:'30rem',
                    height:'20rem',
                    backgroundColor: 'white', 
                    color:'var(--color-grey-500)' 
                }"
            >
                <ng-template #header>
                    <h2 class="text-lg font-bold text-grey-500 ">
                        Edit {{comment_data?.user?.username}} comment
                    </h2>
                </ng-template>
                <div class="flex flex-col gap-6 py-2">
                    <textarea
                        rows="5"
                        cols="30"
                        #textarea
                        [placeholder]="comment_data?.content"
                        class="w-full box-border resize-none border border-gray-200 
                            text-grey-800 rounded-lg p-3 focus:outline-none 
                            focus:ring-2 focus:ring-purple-600"
                        [(ngModel)]="comment" 
                    ></textarea>
                    <div class="flex gap-4">
                        <button
                            pButton
                            class="!w-full !h-10 !px-6 !rounded-lg !bg-grey-500 !text-white font-bold !border-none"
                            (click)="visible = false" 
                        >
                            CANCEL
                        </button>
                        <button
                            pButton
                            class="!w-full !h-10 !px-6 !rounded-lg !bg-purple-600 !text-white font-bold !border-none"
                            (click)="handleEditComment()" 
                        >
                            EDIT
                        </button>
                    </div>
                </div>
            </p-dialog>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, DialogModule,FormsModule]
})
export class EditDialogComponent {
    @Input() comment_data:Comment | undefined;
    comment:string = "";
    visible: boolean = false;
    store = inject(CommentStore);

    showDialog() {
        this.comment = this.comment_data?.content ?? '';
        this.visible = true;
    }
    handleEditComment(){
        const comment = this.comment.trim();
        if (!comment) return;
        this.store.editComment(this.comment_data?.id, comment);
        this.visible = false;
        this.comment = "";
    }

}