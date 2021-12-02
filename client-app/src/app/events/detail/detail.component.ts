import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private eventService: EventService,) { }

  currentEvent: any;

  ngOnInit(): void {
    let id =  this.route.snapshot.params['id'];
    this.eventService.loadEvents(id).subscribe(events => {
      this.currentEvent = events[0];
    })
  }

}
