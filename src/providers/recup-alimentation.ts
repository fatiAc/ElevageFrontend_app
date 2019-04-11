import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {Http} from "@angular/http";

/*
  Generated class for the RecupAlimentationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecupAlimentationProvider {

  constructor(public http: Http) {
    console.log('Hello RecupAlimentationProvider Provider');
  }


  shiftData(data) {
    for (let item of data) {
      data.shift();
    }
  }
  getDataOfPeriodeRation(detailSessionID, data) {
    this.shiftData(data);
    return this.http.get(' http://localhost:8080/app/periodeRation/periodeRationParams/' + detailSessionID).pipe(
      map(res => res.json()))
      .subscribe(res => {
        for (let item of res) {
          console.log("PeriodeRation ==  " + item);
          data.push({
            periode: item.periode,
            ration: item.rationName,
            qtte: item.quantite
          })
        }
      });

  }


  getDetailOfSession(detailSessionData, periodeRationData) {
    return this.http.get(' http://localhost:8080/app/sessionAlimentation/detailOfSession').pipe(
      map(res => res.json()))
      .subscribe(detailSessionResponse => {
        this.http.get('http://localhost:8080/app/paddock/paddockName/' + detailSessionResponse.paddock_ID).pipe(
          map(res => res.json()))
          .subscribe(paddockNameResponse => {
            detailSessionData.paddock = paddockNameResponse.nom;
            detailSessionData.note = detailSessionResponse.note;
            detailSessionData.id = detailSessionResponse.id;
            detailSessionData.nbrVache = detailSessionResponse.nbrVache;
          })
        this.getDataOfPeriodeRation(detailSessionResponse.id, periodeRationData);
      });
  }



}
