import { Injectable, EventEmitter } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {

  private url = 'http://localhost:8000/users';
  constructor(public http: Http) { }

  postUser(obj): Observable <Response> {
    console.log('here')
    return this.http.post(this.url, obj);
  }

}
