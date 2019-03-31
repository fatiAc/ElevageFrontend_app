import {Injectable} from '@angular/core';
import "rxjs/add/operator/retry";
import {map} from "rxjs/operators";
import {Http} from '@angular/http';


/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: Http) {
  }

  onVerifyLogin(login: string) {
    return this.http.get('http://localhost:8080/app/user/verifyLogin/' + login).pipe(
      map(res => res.json()));
  }

  verifyPassword(password: string) {
    return this.http.get('http://localhost:8080/app/user/verifyPassword/' + password).pipe(
      map(res => res.json()));
  }

}


