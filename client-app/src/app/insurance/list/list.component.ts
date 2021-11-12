import { Component, OnInit } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance/insurance.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


  public insurances: any[] = [];

  public displayedColumns: string[] = ['owner', 'plateNumber', 'startDate', 'endDate', 'cost', 'dueAmount', 'actions']
  constructor(private insuranceService: InsuranceService) { }

  ngOnInit(): void {
    this.insuranceService.loadInsurances().subscribe(insuranes => {
      this.insurances = insuranes;
      console.log(this.insurances)
    });

  }

}
