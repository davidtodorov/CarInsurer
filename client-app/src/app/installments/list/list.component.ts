import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InstallmentsService } from '../services/installments.service';

@Component({
  selector: 'app-installments-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {

  constructor(private installmentsService: InstallmentsService) { }

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
    installment.isPaid = flag;
    this.installmentsService.updateInstallment(installment).subscribe();
  }
}
