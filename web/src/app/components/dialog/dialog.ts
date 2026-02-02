import { Component, inject, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommentStore } from '../../store/comment-store';
import { Comment } from '../../models/comments';

@Component({
    selector:'delete-dialog',
    template: `
        <div>
            <div 
                class="flex gap-2 text-sm font-bold text-pink-400 cursor-pointer"
                (click)="showDialog()"    
            >
                <img
                    src="assets/icon-delete.svg"
                    alt="icon-delete"
                    class="size-4 w-3"
                />
                Delete
            </div>
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
                        Delete {{comment_data?.user?.username}} comment
                    </h2>
                </ng-template>
                <div class="flex flex-col gap-4">
                    <span class="">Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</span>
                    <div class="flex gap-4">
                        <button
                            pButton
                            class="!w-full !h-10 !px-6 !rounded-lg !bg-grey-500 !text-white font-bold !border-none"
                            (click)="visible = false" 
                        >
                            NO, CANCEL
                        </button>
                        <button
                            pButton
                            class="!w-full !h-10 !px-6 !rounded-lg !bg-pink-400 !text-white font-bold !border-none"
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
    @Input() comment_data:Comment | undefined;
    visible: boolean = false;
    store = inject(CommentStore);

    showDialog() {
        this.visible = true;
    }
    handleDeleteComment(){
        this.store.deleteComment(this.comment_data?.id);
        this.visible = false;
    }

}