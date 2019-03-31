import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {Http, RequestOptions, Headers} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import {id} from "@swimlane/ngx-datatable/release/utils";

/*
  Generated class for the PeriodeAlimentationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeriodeAlimentationProvider {

  isCreatedSession = false;
  isCreatedDetail = false;

  constructor(public http: Http,) {
    console.log('Hello PeriodeAlimentationProvider Provider');
  }


  clonePeriodeName(periodeName) {
    this.http.get(' http://localhost:8080/app/periodeAlimentation/periodeName').pipe(
      map(res => res.json()))
      .subscribe(response => {
        if (response != false) {
          for (let periode of response) {
            periodeName.push(periode.periode);
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

  saveSessionAlimentation(userLogin,date) {
    this.isCreatedSession = true;
    let sessionData = {
      login: userLogin,
      date: date,
    };

    this.http.post('http://localhost:8080/app/sessionAlimentation/saveSessionAlimentation', sessionData, this.myRequestOptions())
      .subscribe(data => {
        console.log("succes !!! ");
      });
  }

  periodeRationParams(nbrVache: number, periodeId: number, rationID: number, quantite: number, requestOptions: RequestOptions) {
    let periodeRation = {
      periodeID: periodeId,
      quantite: quantite,
      rationID: rationID,
      nbrVache: nbrVache
    };
    return this.http.post('http://localhost:8080/app/sessionAlimentation/periodeRation', periodeRation, requestOptions)
  }

  getPeriodeID(periode: string) {
    return this.http.get('http://localhost:8080/app/sessionAlimentation/periodeID/' + periode).pipe(
      map(res => res.json()));
  }

  getRationID(ration: string) {
    return this.http.get('http://localhost:8080/app/sessionAlimentation/rationID/' + ration).pipe(
      map(rationResponse => rationResponse.json()));
  }

  savePeriodeRation(nbrVache: number, periodes, rations, quantites) {
    for (let periode of periodes) {
      this.getPeriodeID(periode).subscribe(periodeRes => {
        let ration = rations[periodes.indexOf(periode)];
        let qtte: number = quantites[periodes.indexOf(periode)];
        if (qtte != 0 && ration != null) {
          this.getRationID(ration).subscribe(rationResponse => {
            console.log("p=== " + periode + "  ID ==" + periodeRes.id + " ration == " + rationResponse.id + "  qtte = " + qtte);
            return this.periodeRationParams(nbrVache, periodeRes.id, rationResponse.id, qtte, this.myRequestOptions())
              .subscribe(response => {
                console.log("save succec !!! " + response);
              });
          });
        }
      });
    }
  }


  saveAll(userLogin,date, selectedPaddock, note, nbrVache, comment, periodes, quantites, rations) {
    if (!this.isCreatedSession) {
      this.saveSessionAlimentation(userLogin, date);
    }
    this.saveDetailAlimentation(selectedPaddock, note, nbrVache, comment);
    this.savePeriodeRation(nbrVache, periodes, rations, quantites);
  }


  saveDetailAlimentation(selectedPaddock, note, nbrVache, comment) {
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
        map(res => res.json())).subscribe(res => {
      })
    });
  }


}
