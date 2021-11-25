import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IInsuranceForm from '../models/IInsuranceForm';
import { InsuranceService } from '../services/insurance.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private route: ActivatedRoute, private insuranceService: InsuranceService,) { }

  currentInsurance: any;

  ngOnInit(): void {
    let id =  this.route.snapshot.params['id'];
    this.insuranceService.loadInsurances(id, true).subscribe(insurances => {
      this.currentInsurance = insurances[0];
    })
  }

}
