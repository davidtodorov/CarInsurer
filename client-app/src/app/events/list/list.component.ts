import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../services/event.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-event-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(private eventService: EventService) { }

  events = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['owner', 'plateNumber', 'startDate', 'description', 'actions']

  ngOnInit(): void {
    this.eventService.loadEvents().subscribe(data => {
      this.events.data = data;
    })

    this.registerDataSourceFilterHandler();
  }

  applyFilter(value: any) {
    this.events.filter = value.target.value.trim().toLocaleLowerCase();
  }

  private registerDataSourceFilterHandler(){
    this.events.filterPredicate = function (data, filter: string): boolean {
      return data.insurance.car.owner.firstName.toLowerCase().includes(filter) ||
        data.insurance.car.owner.lastName.toLowerCase().includes(filter) ||
        data.insurance.car.plateNumber.toLowerCase().includes(filter) ||
        data.description.toLowerCase().includes(filter);
    };
  }

}
