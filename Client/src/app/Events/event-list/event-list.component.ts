import { Component, OnInit } from '@angular/core';
import {IEvent} from '../event';
import {EventService} from '../event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any;
  errorMessage: string;
  Title= 'Events List';
  constructor(private eventservice: EventService) { }
  ngOnInit(): void {
    this.eventservice.getEvents()
      .subscribe(events =>  {
        this.events = events;
      console.log(events);
      }
      ,
        error => this.errorMessage = <any>error);
  }

}
