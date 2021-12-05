import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MatSnackBarService {

  constructor(private snackBar: MatSnackBar) { 

  }

  open(content: string) {
    this.snackBar.open(content, '', {
      duration: 5000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }
}
