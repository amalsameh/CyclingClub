import { Component, OnInit, Input} from '@angular/core';
import { FormControl, FormGroup , FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {IEvent} from '../event';
import {EventService} from '../event.service';
import { Auth } from './../../auth.service';


@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.css']
})
export class EventNewComponent implements OnInit {
  @Input() club;
  eventform: FormGroup;
  constructor(fb: FormBuilder,
              private _eventService: EventService,
              private _router: Router,
              private auth: Auth) {

    this.eventform = fb.group({
      'title': ['', Validators.required],
      'dueTime': ['', Validators.required],
      'Miles': [''],
      'expectedDuration': [''],
      'startPoint': [''],
      'endPoint': [''],
    });
  }
  onSubmit(form) {
    console.log('Testt');
    this.saveEvent();
    console.log(this.eventform);
    console.log(this.eventform.controls['eventName']);
  }
  saveEvent() {
    try {
      console.log('Testt2');
      //let newevent: IEvent;
      console.log('Bfore');

      const newevent = {_id: {dueDate : this.eventform.controls['dueTime'].value,
                                      Owner: this.auth.userProfile['user_id']},
      title : this.eventform.controls['title'].value,
        status : 'Not Started',
        miles : this.eventform.controls['Miles'].value,
        endPoint : this.eventform.controls['endPoint'].value,
        club : {
        _id: 'AAA',
        city: 'FairField',
        state: 'Iowa',
        picture: '',
        duration: this.eventform.controls['expectedDuration'].value,
        members: [{_id: this.auth.userProfile['user_id']}],
        location: {long: 22, lat: 65}
      },
      members : [{_id: this.auth.userProfile['user_id'], name: this.auth.userProfile['name']}],
      startPoint : this.eventform.controls['startPoint'].value};
      console.log(newevent);
      this._eventService.submitEvent(newevent).subscribe(
        res => {
          console.log('Saved Successfully' + res);
          this._router.navigate(['events']);
        }, err => console.log(err)
      );
    }catch (e) {console.log(e);}
  }
  onCancel() {
    this._router.navigate(['/']);
  }
  ngOnInit() {
  }

}
