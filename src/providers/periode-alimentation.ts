import {Injectable, ViewChild} from '@angular/core';
import {map} from "rxjs/operators";
import {Http, RequestOptions, Headers} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import {id} from "@swimlane/ngx-datatable/release/utils";
import {RecupAlimentationPage} from "../pages/recup-alimentation/recup-alimentation";
import {Nav, NavController} from "ionic-angular";

/*
  Generated class for the PeriodeAlimentationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeriodeAlimentationProvider {


  data = [];
  isCreatedSession = false;
  isCreatedDetail = false;

  constructor(public http: Http) {
    console.log('Hello PeriodeAlimentationProvider Provider');
  }

  clonePeriodeInfo(periodeData) {
    periodeData.shift();
    this.http.get(' http://localhost:8080/app/periodeAlimentation/periodeName').pipe(
      map(res => res.json()))
      .subscribe(response => {
        if (response != false) {
          for (let item of response) {
            periodeData.push({id: item.id, periode: item.periode});
          }
        }
      });
  }


  myRequestOptions() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let requestOptions = new RequestOptions({headers: headers});
    return requestOptions;
  }

  saveSessionAlimentation(userLogin, date) {
    this.isCreatedSession = true;
    let sessionData = {
      login: 'batima',
      date: date,
    };

    this.http.post('http://localhost:8080/app/sessionAlimentation/saveSessionAlimentation', sessionData, this.myRequestOptions())
      .subscribe(data => {
        console.log("succes !!! ");
      });
  }


  savePeriodeRation(detailSessionID, nbrVache: number, periodes, rations, quantites) {
    let myData = {
      detailSessionID: detailSessionID,
      nbrVache: nbrVache,
      periodes: periodes,
      rations: rations,
      quantites: quantites
    }
    return this.http.post('http://localhost:8080/app/sessionAlimentation/periodeRation', myData, this.myRequestOptions()).pipe(
      map(res => res.json()))
      .subscribe(response => {
        console.log(response);
      })


  }


  saveDetailAlimentation(selectedPaddock, note, nbrVache, comment, periodes, rations, quantites) {
    this.isCreatedDetail = true;
    this.http.get('http://localhost:8080/app/sessionAlimentation/paddockID/' + selectedPaddock).pipe(
      map(res => res.json())).subscribe(paddockResponse => {
      let detail_aliment_Data = {
        note: note,
        nbrVache: nbrVache,
        paddockID: paddockResponse.id,
        comment: comment,
      };
      detail_aliment_Data.paddockID = paddockResponse.id;
      return this.http.post(' http://localhost:8080/app/sessionAlimentation/detailSessionAlimentation', detail_aliment_Data, this.myRequestOptions()).pipe(
        map(res => res.json())).subscribe(detailAlimentationResponse => {
        this.savePeriodeRation(detailAlimentationResponse.id, nbrVache, periodes, rations, quantites);
      })
    });
  }

  saveAll(userLogin, date, selectedPaddock, note, nbrVache, comment, periodes, quantites, rations) {
    if (!this.isCreatedSession) {
      this.saveSessionAlimentation(userLogin, date);
    }
    this.saveDetailAlimentation(selectedPaddock, note, nbrVache, comment, periodes, rations, quantites);
  }

  cloneData(data, periodes, rations, quantites) {
    for (let item of data) {
      data.shift();
    }
    for (let periode of periodes) {
      let ration = rations[periodes.indexOf(periode)];
      let qtte = quantites[periodes.indexOf(periode)];
      console.log("ration === ", ration, "  periode == ", periode, "  qtte == ", qtte);
      if (ration != null && qtte != 0) {
        data.push({periode: periode, ration: ration, qtte: qtte});
      }
    }
  }

}
