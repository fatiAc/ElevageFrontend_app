import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {Headers, Http, RequestOptions} from "@angular/http";

/*
  Generated class for the HttpMethods provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpMethods {

  public ipAdress = 'localhost';

  constructor(public http: Http) {
  }

  get(url: string, data) {
    return this.http.get(url + '' + data).pipe(
      map(res => res.json()));
  }

  myRequestOptions() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let requestOptions = new RequestOptions({headers: headers});
    return requestOptions;
  }

  post(url: string, data) {
    return this.http.post(url, data, this.myRequestOptions()).pipe(
      map(res => res.json()));
  }

  put(url: string) {
    return this.http.put(url, this.myRequestOptions()).pipe(
      map(res => res.json()));
  }

}
