import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import IInsuranceForm from '../models/IInsuranceForm';
import { InsuranceService } from '../services/insurance.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  constructor() { }

}
