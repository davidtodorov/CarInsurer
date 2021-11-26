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
    installment.isPaid = true;
    this.installmentsService.updateInstallment(installment).subscribe(() => {
      let index = this.dataSource.findIndex(x => x._id === installment._id);
      this.dataSource[index].isPaid = true;
    });
  }

  onUnpaidClick(installment: any) {
    installment.isPaid = false;
    this.installmentsService.updateInstallment(installment).subscribe(() => {
      let index = this.dataSource.find(x => x._id === installment._id);
      this.dataSource[index].isPaid = false;
    });
  }

}
