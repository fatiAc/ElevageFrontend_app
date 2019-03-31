import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {Http} from "@angular/http";

/*
  Generated class for the NourritureProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NourritureProvider {

  constructor(public http: Http) {
  }

  cloneRationName(rationsName: any) {
    this.http.get(' http://localhost:8080/app/nourriture/rationName').pipe(
      map(res => res.json()))
      .subscribe(response => {
        if (response != false) {
          for (let ration of response) {
            rationsName.push(ration.nom);
          }
          return rationsName;
        }
      });
  }

}
