import { Injectable, EventEmitter } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {IEvent} from './event';

@Injectable()
export class EventService {
  private url = 'http://localhost:8000/events';
  constructor(public http: Http) { }


  submitEvent(obj): Observable <Response> {
    const header = new Headers({'Content-Type' : 'application/json'});
    header.append('authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FtYWxzYW1laC5hdXRoMC5jb20vIiwic3ViIjoiZmFjZWJvb2t8MTYwNzQ1MDY2MjYxNTY4OCIsImF1ZCI6IkgwdVNSYlhYcl8wNm9rQ0hIVDNSWURLQ3Y4cFNTNUtXIiwiZXhwIjoxNDkzMjgwOTkzLCJpYXQiOjE0OTMyNDQ5OTN9.4QSZRke4f5Jj4kTNOfw--c5k9v4OWLqxk7SQoy7OLMI');
    const options = new RequestOptions({headers: header});
    console.log('here')
    return this.http.post(this.url, obj);
  }

  getEvents(): Observable<IEvent[]> {
    const header = new Headers({'Content-Type' : 'application/json'});
    header.append('authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FtYWxzYW1laC5hdXRoMC5jb20vIiwic3ViIjoiZmFjZWJvb2t8MTYwNzQ1MDY2MjYxNTY4OCIsImF1ZCI6IkgwdVNSYlhYcl8wNm9rQ0hIVDNSWURLQ3Y4cFNTNUtXIiwiZXhwIjoxNDkzMjgwOTkzLCJpYXQiOjE0OTMyNDQ5OTN9.4QSZRke4f5Jj4kTNOfw--c5k9v4OWLqxk7SQoy7OLMI');
    const options = new RequestOptions({headers: header});

    return this.http.get(this.url )
      .map((response: Response) => <IEvent[]> response.json())
      .do(data => console.log('All: ' +  JSON.stringify(data)))
      .catch(this.handleError);
  }
  getEvent(id: any): Observable<any> {
    return this.http.get(this.url + '/' + id )
      .do(data => console.log('All: ' +  JSON.stringify(data)))
      .catch(this.handleError);
  }
  trackEvent(obj: any ): Observable<any>  {
    return this.http.get(this.url + '/track' , obj);
  }
  joinEvent(obj: any): Observable<any> {
    return this.http.get(this.url + '/join' , obj);
  }
  private handleError(error: Response) {
      console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
