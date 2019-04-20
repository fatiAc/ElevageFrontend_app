import {Injectable} from '@angular/core';
import {HttpMethods} from "./tools/httpMethods";

/*
  Generated class for the MouvementProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MouvementProvider {

  constructor(public httpMethods: HttpMethods) {
  }

  getConnectedUser(login) {
    return this.httpMethods.get(' http://localhost:8080/app/mouvement/getConnectedUser/', login)
      .subscribe(response => {
        console.log("Innn ===== login is ", login);
      });
  }

  shift(data) {
    let i = 0;
    while (i < data.length) {
      data.shift();
      i++;
    }
  }

  getPaddockbyAnimal(snit) {
    let url = 'http://localhost:8080/app/mouvement/paddockByAnimal/';
    return this.httpMethods.get(url, snit);
  }

  getDesPaddocks(snit, data) {
    this.shift(data);
    let url = 'http://localhost:8080/app/mouvement/desPaddocks/'
    return this.httpMethods.get(url, snit)
      .subscribe(paddocks => {
        if (paddocks != null) {
          for (let paddock of paddocks) {
            data.push({id: paddock.id, paddockName: paddock.paddockName});
          }
        }
      });
  }


  createMouvemntMesure(poids, date,animal_ID, paddock_src, paddock_dest) {
    const movmntMesureParam = {
      poids: poids,
      date: date,
      animal_ID: animal_ID,
      paddock_src: paddock_src,
      paddock_dest: paddock_dest
    };
    let putUrl = 'http://localhost:8080/app/mouvement/updateAnimalPaddock/'
    this.httpMethods.put(putUrl + animal_ID + '/' + paddock_dest)
      .subscribe(response => {

      });
    let postUrl = 'http://localhost:8080/app/mouvement/createMouvmntMesure';
    return this.httpMethods.post(postUrl, movmntMesureParam);
  }

  getSrcPaddocks(data) {
    this.shift(data);
    let url = 'http://localhost:8080/app/paddock/allPadock';
    return this.httpMethods.get(url, '')
      .subscribe(paddocks => {
        if (paddocks != null) {
          for (let paddock of paddocks) {
            data.push({id: paddock.id, paddockName: paddock.nom});
          }
        }
      });
  }

  getNbrElement(selectedPaddock_ID) {
    let url = 'http://localhost:8080/app/mouvement/countAnimalOfPaddock/';
    return this.httpMethods.get(url, selectedPaddock_ID);
  }

  getPaddocksOfDest(paddock_ID, data) {
    this.shift(data);
    let url = 'http://localhost:8080/app/mouvement/getPaddocksDest/';
    return this.httpMethods.get(url, paddock_ID)
      .subscribe(paddocks => {
        if (paddocks != null) {
          for (let paddock of paddocks) {
            data.push({id: paddock.id, paddockName: paddock.nom});
          }
        }
      });
  }

  createItems(date, paddock_src, paddock_dest) {
    let data = {
      date: date,
      paddock_src: paddock_src,
      paddock_dest: paddock_dest,
    };
    return this.httpMethods.post('http://localhost:8080/app/mouvement/createItems', data)
  }

  updatePaddocksOfAnimals(paddock_src, paddock_dest) {
    return this.httpMethods.put('http://localhost:8080/app/mouvement/updatePaddockOfAnimals/' + paddock_src + '/' + paddock_dest);
  }

}
