import {Injectable} from '@angular/core';
import {HttpMethods} from "./tools/httpMethods";

/*
  Generated class for the PeriodeAlimentationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeriodeAlimentationProvider {


  constructor(public httpMethods: HttpMethods) {
  }

  shift(data) {
    let i = 0;
    while (i < data.length) {
      data.shift();
      i++;
    }
  }

  getPeriodeInfo() {
    return this.httpMethods.get(' http://' + this.httpMethods.ipAdress + ':8080/app/periodeAlimentation/periodesInfo', '');
  }

  saveSessionAlimentation(userLogin, date) {
    let sessionData = {
      login: userLogin,
      date: date,
    };
    return this.httpMethods.post('http://' + this.httpMethods.ipAdress + ':8080/app/sessionAlimentation/saveSessionAlimentation', sessionData)

  }


  savePeriodeRation(nbrVache: number, periodes, rations, quantites) {
    let data = {
      nbrVache: nbrVache,
      periodes: periodes,
      rations: rations,
      quantites: quantites
    }
    return this.httpMethods.post('http://' + this.httpMethods.ipAdress + ':8080/app/sessionAlimentation/periodeRation', data)
  }

  saveDetailAlimentation(selectedPaddock, note, nbrVache, comment) {
    let detail_aliment_Data = {
      note: note,
      nbrVache: nbrVache,
      paddockID: selectedPaddock,
      comment: comment,
    };
    return this.httpMethods.post(' http://' + this.httpMethods.ipAdress + ':8080/app/sessionAlimentation/detailSessionAlimentation', detail_aliment_Data)
  }


}
