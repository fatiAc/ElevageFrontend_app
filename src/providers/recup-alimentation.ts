import {Injectable} from '@angular/core';
import {HttpMethods} from "./tools/httpMethods";

/*
  Generated class for the RecupAlimentationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecupAlimentationProvider {

  constructor(public httpMethods: HttpMethods) {
  }

  shift(data) {
    let i = 0;
    while (i < data.length) {
      data.shift();
      i++;
    }
  }

  getDataOfPeriodeRation(detailSessionID, data) {
    this.shift(data);
    return this.httpMethods.get(' http://' + this.httpMethods.ipAdress + ':8080/app/periodeRation/periodeRationParams/', detailSessionID)
      .subscribe(res => {
        for (let item of res) {
          data.push({
            periode: item.periode,
            ration: item.rationName,
            qtte: item.quantite
          })
        }
      });

  }


  getDetailOfSession(detailSessionData, periodeRationData) {
    return this.httpMethods.get(' http://' + this.httpMethods.ipAdress + ':8080/app/sessionAlimentation/detailOfSession', '')
      .subscribe(detailSessionResponse => {
        this.httpMethods.get('http://' + this.httpMethods.ipAdress + ':8080/app/paddock/paddockName/', detailSessionResponse.paddock_ID)
          .subscribe(paddockNameResponse => {
            detailSessionData.paddock = paddockNameResponse.nom;
            detailSessionData.note = detailSessionResponse.note;
            detailSessionData.id = detailSessionResponse.id;
            detailSessionData.nbrVache = detailSessionResponse.nbrVache;
          });
        this.getDataOfPeriodeRation(detailSessionResponse.id, periodeRationData);
      });
  }


}
