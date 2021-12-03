import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InstallmentsService } from '../services/installments.service';

@Component({
  selector: 'app-installments-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {

  constructor(private installmentsService: InstallmentsService, private snackBar: MatSnackBar) { }

  @Input() installments: any[] = []
  dataSource: any[] = [];

  displayedColumns: string[] = ['startDate', 'endDate', 'isPaid', 'actions']

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.installments.currentValue) {
      this.dataSource = this.installments;
    }
  }

  onPaidClick(installment: any) {
    this.paidOrUnpaid(installment, true);
  }

  onUnpaidClick(installment: any) {
    this.paidOrUnpaid(installment, false);
  }


  private paidOrUnpaid(installment: any, flag: boolean) {
    let model = { ...installment };
    model.isPaid = flag;
    this.installmentsService.updateInstallment(model).subscribe(() => {
      installment.isPaid = flag;
    }, err => {
      this.showSnackbarTopPosition(err.error);
    });
  }

  private showSnackbarTopPosition(content: any) {
    this.snackBar.open(content, '', {
      duration: 5000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "right", // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }
}
