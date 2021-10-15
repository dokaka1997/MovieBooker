import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [ConfirmDialogComponent, MessageDialogComponent],
  exports: [ConfirmDialogComponent, MessageDialogComponent],
})
export class DialogModule {}
