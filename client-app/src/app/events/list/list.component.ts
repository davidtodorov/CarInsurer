import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-event-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(private eventService: EventService) { }

  events: any[] = [];
  displayedColumns: string[] = ['owner', 'plateNumber', 'startDate', 'description', 'actions']

  ngOnInit(): void {
    this.eventService.loadEvents().subscribe(data => {
      this.events = data;
    })
  }

}
