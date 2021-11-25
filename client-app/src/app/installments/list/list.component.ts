import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-installments-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {

  constructor() { }

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

  onPaidClick(installment: any){

  }

}
