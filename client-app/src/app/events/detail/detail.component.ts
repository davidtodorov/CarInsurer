import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarouselImage } from 'src/app/shared/models/CarouselImage';
import { environment } from 'src/environments/environment';
import { EventResponse } from '../models/EventResponse';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private eventService: EventService,) { }

  currentEvent: EventResponse | undefined;
  uploadedImages: CarouselImage[] = []

  ngOnInit(): void {
    let id =  this.route.snapshot.params['id'];
    this.eventService.loadEvents(id).subscribe(events => {
      this.currentEvent = events[0];

      this.currentEvent.images.forEach((imageUrl: string) => {
        this.uploadedImages.push({path: environment.uploadsBaseUrl + '/' + imageUrl})
      });
    })
  }

}
