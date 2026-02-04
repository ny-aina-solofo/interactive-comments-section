import { Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommentStore } from '../../store/comment-store';
import { InteractiveCommentsService } from '../../services/comment.service';

type DeleteData =
  | { type: 'comment'; comment_id: number; username: string }
  | { type: 'reply'; comment_id: number; reply_id: number; username: string };

@Component({
    selector:'delete-dialog',
    template: `
        <div>
            <button 
                class="flex gap-2 text-sm font-bold text-pink-400 cursor-pointer"
                (click)="showDialog()"    
            >
                <img
                    src="assets/icon-delete.svg"
                    alt="icon-delete"
                    class="size-4 w-3"
                /> 
                Delete
            </button>
            <p-dialog 
                [modal]="true" [(visible)]="visible"   [closable]="false" 
                [style]="{ 
                    width:'25rem',
                    backgroundColor: 'white', 
                    color:'var(--color-grey-500)' 
                }"
            >
                <ng-template #header>
                    <h2 class="text-lg font-bold text-grey-500 ">
                        Delete {{data?.username}} {{data?.type}}
                    </h2>
                </ng-template>
                <div class="flex flex-col gap-4">
                    <span class="">Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</span>
                    <div class="flex gap-4">
                        <button
                            class="w-full h-10 px-6 rounded-lg bg-grey-500 cursor-pointer
                                text-white font-bold border-none hover:bg-grey-500/90"
                            (click)="visible = false" 
                        >
                            NO, CANCEL
                        </button>
                        <button
                            class="w-full h-10 px-6 rounded-lg bg-pink-400 cursor-pointer
                                text-white font-bold border-none hover:bg-pink-400/90"
                            (click)="handleDeleteComment()" 
                        >
                            YES, DELETE
                        </button>
                    </div>
                </div>
            </p-dialog>
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, DialogModule]
})
export class DeleteDialogComponent {
    @Input() data:DeleteData | undefined;
    visible: boolean = false;
    store = inject(CommentStore);

    constructor(private commentService: InteractiveCommentsService) {}

    showDialog() {
        this.visible = true;
    }
    handleDeleteComment() {
        if (this.data?.type === "reply") {
            this.store.deleteReply(this.data?.comment_id, this.data?.reply_id );
            this.commentService.deleteReply(this.data?.comment_id, this.data?.reply_id );    
        } else {
            this.store.deleteComment(this.data?.comment_id);
            this.commentService.deleteComment(this.data?.comment_id);
        }
        this.visible = false;
    }

}