import { Component, OnInit, OnDestroy , Input} from '@angular/core';
import { FormControl, FormGroup , FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import {IEvent} from '../event';
import {EventService} from '../event.service';
import {throws} from 'assert';
import {timeInterval} from 'rxjs/operator/timeInterval';
import {Observable} from 'rxjs/Observable';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import { Auth } from './../../auth.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  event;
  errorMessage: string;
  private sub: Subscription;
  private eventsub: Subscription;

  eventform: FormGroup;
  constructor(fb: FormBuilder,
              private _route: ActivatedRoute,
              private _router: Router,
              private _eventService: EventService,
              private auth: Auth) {
    this.eventform = fb.group({
      'eventName': [this.event.title],
      'dueTime': [this.event._id.dueDate],
      'Miles': [this.event.miles],
      'expectedDuration': [''],
      'startPoint': [this.event.startPoint],
      'endPoint': [this.event.endPoint],
    });

    this.eventform.statusChanges.subscribe(
      (data: any) => console.log('Data Changes ' + data)
    );
    this.eventform.statusChanges.subscribe(data => console.log(data), err => console.log(err));
    this.eventform.valueChanges.subscribe(res => console.log(res), err => console.log(err));

  }
  onSubmit(fm) {
    this.eventform = fm;
    console.log(this.eventform.value);
    console.log(this.eventform.controls['eventName']);
  }
  getEvent(id: any) {
    this._eventService.getEvent(id).subscribe(
      resevent => {this.event = resevent;
      },
      error => this.errorMessage = <any>error);
  }
  joinEvent() {
    this.event.members.push({_id: this.auth.userProfile['user_id'], name : this.auth.userProfile['name']});
    this._eventService.joinEvent({_id: this.event._id, members : this.event.members});
  }
//take obj contain _id,Location and status
  update(obj: any): void  {
      this._eventService.trackEvent(obj).subscribe(res => console.log('Location and Status Updated '),
      error => this.errorMessage = <any>error);
  }

  trackEvent(): void {
    this.event.status = 'Running';
    const timer = TimerObservable.create(1000, 1000);
    this.eventsub = timer.subscribe(res => {
      //should get current location from service
        const _location = {long: 65 , lat  : 75};
        //this.event.location=_location;
        const obj = {_id: this.event._id, status: this.event.status, location: _location};
        this.update(obj);
      },
      error => this.errorMessage = <any>error);
  }
  ngOnInit(): void {
    this.sub = this._route.params.subscribe(
      params => {
        const id = +params['id'];
        console.log(id);
        this.getEvent(id);
      });
  }
  onBack(): void {
    this._router.navigate(['/events']);
  }
  onResumee(): void {
    this.trackEvent();
  }
  onStart(): void {
    this.trackEvent();
  }
  onEnd(): void {
    this.eventsub.unsubscribe();
    this.event.status =  'Done';
    const obj = {_id: this.event._id, status: this.event.status, location: this.event.location};
    this.update(obj);
  }
  onTrack(): void {
    //Navigate to map
    this._router.navigate(['/event/track'], this.event);
  }
  onEmergency(): void {
    this.eventsub.unsubscribe();
    this.event.status =  'Paused';
    const obj = {_id: this.event._id, status: this.event.status, location: this.event.location};
    this.update(obj);
    //Send Message to all members
  }
  onJoin(): void {
    this.joinEvent();
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.eventsub.unsubscribe();
  }
}

