import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {map} from "rxjs/operators";

/*
  Generated class for the DetailAlimentationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DetailAlimentationProvider {

  constructor(public http: Http) {
  }

  clonePaddockData(date, user_login, paddocks) {
    return this.http.get('http://localhost:8080/app/sessionAlimentation/getPaddockBySession/' + date + '/' + user_login).pipe(
      map(res => res.json()))
      .subscribe(response => {
        if (response != false) {
          for (let paddock of response) {
            paddocks.push({id: paddock.id, nom: paddock.nom});
          }
        }
      });
  }

}
