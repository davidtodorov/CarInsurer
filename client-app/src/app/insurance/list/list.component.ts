import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../services/insurance.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-insurance-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(private insuranceService: InsuranceService) { }

  public insurances = new MatTableDataSource<any>([]);
  public displayedColumns: string[] = ['owner', 'plateNumber', 'startDate', 'endDate', 'cost', 'dueAmount', 'actions']

  ngOnInit(): void {
    this.insuranceService.loadInsurances().subscribe(insuranes => {
      this.insurances.data = insuranes;
      console.log(this.insurances)
    });

    this.insurances.filterPredicate = function(data, filter: string): boolean {
      return data.car.owner.firstName.toLowerCase().includes(filter) || 
             data.car.owner.lastName.toLowerCase().includes(filter) || 
             data.car.plateNumber.toLowerCase().includes(filter) ||
             data.cost.toString().toLowerCase().includes(filter) ||
             data.dueAmount.toString().toLowerCase().includes(filter)
    };
  }

  doFilter(value: any) {
    this.insurances.filter = value.target.value.trim().toLocaleLowerCase();
  }

}
