import {Injectable} from '@angular/core';
import {HttpMethods} from "./tools/httpMethods";

/*
  Generated class for the PrepareAlimentationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrepareAlimentationProvider {

  constructor(public httpMethods: HttpMethods) {
  }

  shift(data) {
    let i = 0;
    while (i < data.length) {
      data.shift();
      i++;
    }
  }

  rationOfSelectedPeriode(periodeID, date, userLogin) {
    return this.httpMethods.get('http://' + this.httpMethods.ipAdress + ':8080/app/nourriture/rationOfSelectedPeriode/', periodeID + '/' + date + '/' + userLogin)

  }

  calculeQuantiteTotal(periodeID, rationID, date, userLogin) {
    let url = 'http://' + this.httpMethods.ipAdress + ':8080/app/periodeRation/qtteTotale/';
    return this.httpMethods.get(url, periodeID + '/' + rationID + '/' + date + '/' + userLogin);

  }

  getPaddocksWithQtte(periodeID, rationID, date, userLogin) {
    let url = 'http://' + this.httpMethods.ipAdress + ':8080/app/periodeRation/paddocksWithQtte/';
    return this.httpMethods.get(url, periodeID + '/' + rationID + '/' + date + '/' + userLogin)
  }


  machineInfo(nourriture_ID) {
    return this.httpMethods.get('http://' + this.httpMethods.ipAdress + ':8080/app/machine/findByNourriture/', nourriture_ID)

  }

  calculeDefaultNbrPartie(machineCapacite, qtteTotale) {
    let nbrPartie = qtteTotale / machineCapacite;
    return Math.ceil(nbrPartie);
  }

  calculeDefaultQtteOfPartie(qtteTotale: number, machineCapacite: number) {
    let listOfQtte = new Array();
    do {
      if (qtteTotale - machineCapacite >= 0) {
        listOfQtte.push(machineCapacite);
        qtteTotale -= machineCapacite;
      } else {
        listOfQtte.push(qtteTotale)
        qtteTotale = 0;
      }
    } while (qtteTotale > 0)
    return listOfQtte;
  }

  clone(origineObject, destObj) {
    for (let item of origineObject) {
      destObj.push(item);
    }
  }


  genererLivraison(mesLivraisons, paddockWithQtte, listOfQttePartie) {
    let livraison = [];
    let num = 1;
    let i = 0;
    for (let qttePartie of listOfQttePartie) {
      let qtteOfLivraison = qttePartie;
      let paddockLivraison = [];
      while (qttePartie > 0) {
        let paddockInfo = paddockWithQtte[i];
        if (qttePartie >= paddockInfo.qtte) {
          paddockLivraison.push({
            paddockID: paddockInfo.paddock_ID,
            paddockName: paddockInfo.paddockName,
            qtte: paddockInfo.quantite,
            nbrVache: paddockInfo.nbrVache,
            commentaire: paddockInfo.commentaire
          });
          qttePartie -= paddockInfo.qtte;
          if (qttePartie == 0) {
            livraison.push({numero: num, quantite: qtteOfLivraison, details: paddockLivraison});
          }
          i++;
        } else {
          paddockLivraison.push({
            paddockID: paddockInfo.paddock_ID,
            paddockName: paddockInfo.paddockName,
            qtte: qttePartie,
            nbrVache: paddockInfo.nbrVache,
            commentaire: paddockInfo.commentaire

          });
          paddockInfo.qtte -= qttePartie;
          qttePartie = 0;
          livraison.push({numero: num, quantite: qtteOfLivraison, details: paddockLivraison});
        }
      }
      num++;
    }
    this.clone(livraison, mesLivraisons);
  }


  calculQtteOfPartie(selectedNbr, qtteTotale) {
    let qttPartie = qtteTotale / selectedNbr;
    let listOfQtte = new Array(selectedNbr);
    let i = 0;
    while (i < selectedNbr) {
      listOfQtte[i] = qttPartie;
      i++;
    }
    return listOfQtte;
  }

  createRecupSessionWithLivraison(date, userLogin, nbrPartie, qtteTotal, machineID, periodeID, nourritureID, livraisons) {
    this.httpMethods.get('http://' + this.httpMethods.ipAdress + ':8080/app/recup_session/sessionByDateAndLogin/', date + '/' + userLogin)
      .subscribe(response => {
        if (response != null) {
          const recupSessionParam = {
            nbrPartie: nbrPartie,
            qtteTotal: qtteTotal,
            machineID: machineID,
            periodeID: periodeID,
            nourritureID: nourritureID
          };
          this.httpMethods.post('http://' + this.httpMethods.ipAdress + ':8080/app/recup_session/saveRecupSession', recupSessionParam)
            .subscribe(data => {
              if (data != null) {
                for (let livraison of livraisons) {
                  this.createLivraison(livraison.numero, livraison.quantite, livraison.details, nourritureID);
                }
              }
            });
        }
      });


  }

  createLivraison(numero, quantite, details, nourriture_ID) {
    let livraisonData = {
      numero: numero,
      quantite: quantite,
      details: details,
      nourriture_ID: nourriture_ID
    };
    this.httpMethods.post(' http://' + this.httpMethods.ipAdress + ':8080/app/recup_session/saveLivraison', livraisonData)
      .subscribe(response => {
      });

  }
}


