import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { InsuranceService } from '../services/insurance.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-insurance-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  constructor(private insuranceService: InsuranceService) { }

  public insurances = new MatTableDataSource<any>([]);
  public displayedColumns: string[] = ['owner', 'plateNumber', 'startDate', 'endDate', 'cost', 'dueAmount', 'actions']

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.insuranceService.loadInsurances().subscribe(insuranes => {
      this.insurances.data = insuranes;
    });

    this.registerDataSourceFilterHandler();
    this.registerDataSourceSortDataAccessor();
  }

  ngAfterViewInit(): void {
    this.insurances.sort = this.sort;
  }

  applyFilter(value: any) {
    this.insurances.filter = value.target.value.trim().toLocaleLowerCase();
  }

  private registerDataSourceFilterHandler() {
    this.insurances.filterPredicate = function (data, filter: string): boolean {
      return data.car.owner.firstName.toLowerCase().includes(filter) ||
        data.car.owner.lastName.toLowerCase().includes(filter) ||
        data.car.plateNumber.toLowerCase().includes(filter) ||
        data.cost.toString().toLowerCase().includes(filter) ||
        data.dueAmount.toString().toLowerCase().includes(filter)
    };
  }

  private registerDataSourceSortDataAccessor() {
    this.insurances.sortingDataAccessor = function (data: any, sortHeaderId: string) {
      if (sortHeaderId === 'owner') {
        return `${data.car.owner.firstName.toLowerCase()} ${data.car.owner.lastName.toLowerCase()}`
      }
      else if (sortHeaderId === 'plateNumber') {
        return data.car.plateNumber;
      }
      return data[sortHeaderId];
    }
  }
}
