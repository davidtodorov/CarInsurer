import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBarService } from 'src/app/shared/services/mat-snack-bar.service';
import { Installment } from '../models/Installment';
import { InstallmentsService } from '../services/installments.service';

@Component({
  selector: 'app-installments-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private installmentsService: InstallmentsService, 
    private snackBarService: MatSnackBarService) { }

  @Input() installments: any[] = []
  dataSource: Installment[] = [];

  displayedColumns: string[] = ['startDate', 'endDate', 'isPaid', 'actions']

  ngOnInit(): void {
    const insuranceId = this.route.snapshot.params['id'];
    this.installmentsService.loadInstallment(insuranceId).subscribe(data => {
      this.dataSource = data
    })
  }

  onPaidClick(installment: Installment) {
    this.paidOrUnpaid(installment, true);
  }

  onUnpaidClick(installment: Installment) {
    this.paidOrUnpaid(installment, false);
  }


  private paidOrUnpaid(installment: Installment, flag: boolean) {
    let model = { ...installment };
    model.isPaid = flag;
    this.installmentsService.updateInstallment(model).subscribe(() => {
      installment.isPaid = flag;
    }, err => {
      this.snackBarService.open(err.error);
    });
  }
}
