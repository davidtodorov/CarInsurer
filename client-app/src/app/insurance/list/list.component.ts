import { Component, OnInit } from '@angular/core';
import { InsuranceService } from '../services/insurance.service';

@Component({
  selector: 'app-insurance-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(private insuranceService: InsuranceService) { }
  
  public insurances: any[] = [];
  public displayedColumns: string[] = ['owner', 'plateNumber', 'startDate', 'endDate', 'cost', 'dueAmount', 'actions']

  ngOnInit(): void {
    this.insuranceService.loadInsurances().subscribe(insuranes => {
      this.insurances = insuranes;
      console.log(this.insurances)
    });

  }

}
