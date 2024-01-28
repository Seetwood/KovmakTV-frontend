import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageResponse } from 'src/app/models/MessageResponse';

@Component({
  selector: 'app-dialog-information-wrapper',
  templateUrl: './dialog-information-wrapper.component.html',
  styleUrls: ['./dialog-information-wrapper.component.less']
})
export class DialogInformationWrapperComponent {
  message:MessageResponse;
  constructor(public dialogRef: MatDialogRef<DialogInformationWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.message = data;
    }

  close(){
    this.dialogRef.close();
  }
}
