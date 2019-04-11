import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {Headers, Http, RequestOptions} from "@angular/http";

/*
  Generated class for the MouvementProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MouvementProvider {

  constructor(public http: Http) {
  }

  shift(data) {
    for (let item of data) {
      data.shift();
    }
  }

  getPaddockbyAnimal(snit) {
    return this.http.get(' http://localhost:8080/app/mouvement/paddockByAnimal/' + snit).pipe(
      map(res => res.json()));
  }

  getDesPaddocks(snit, data) {
    this.shift(data);
    return this.http.get('http://localhost:8080/app/mouvement/desPaddocks/' + snit).pipe(
      map(res => res.json()))
      .subscribe(paddocks => {
        if (paddocks != null) {
          for (let paddock of paddocks) {
            data.push({id: paddock.id, paddockName: paddock.paddockName});
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

  createMouvemntMesure(poids, date, user_login, animal_ID, paddock_src, paddock_dest) {
    const movmntMesureParam = {
      poids: poids,
      date: date,
      user_login: user_login,
      animal_ID: animal_ID,
      paddock_src: paddock_src,
      paddock_dest: paddock_dest
    };
    this.http.put(' http://localhost:8080/app/mouvement/updateAnimalPaddock/' + animal_ID + '/' + paddock_dest, this.myRequestOptions())
      .subscribe(response => {

      });
    return this.http.post('http://localhost:8080/app/mouvement/createMouvmntMesure', movmntMesureParam, this.myRequestOptions());
  }

  getSrcPaddocks(data) {
    this.shift(data);
    return this.http.get(' http://localhost:8080/app/paddock/allPadock').pipe(
      map(res => res.json()))
      .subscribe(paddocks => {
        if (paddocks != null) {
          for (let paddock of paddocks) {
            data.push({id: paddock.id, paddockName: paddock.nom});
          }
        }
      });
  }

  getNbrElement(selectedPaddock_ID) {
    return this.http.get(' http://localhost:8080/app/mouvement/countAnimalOfPaddock/' + selectedPaddock_ID).pipe(
      map(res => res.json()));
  }

  getPaddocksOfDest(paddock_ID, data) {
    this.shift(data);
    return this.http.get('http://localhost:8080/app/mouvement/getPaddocksDest/' + paddock_ID).pipe(
      map(res => res.json()))
      .subscribe(paddocks => {
        if (paddocks != null) {
          for (let paddock of paddocks) {
            data.push({id: paddock.id, paddockName: paddock.nom});
          }
        }
      });
  }

  createItems(date, paddock_src, paddock_dest, user_login) {
    let data = {
      date: date,
      paddock_src: paddock_src,
      paddock_dest: paddock_dest,
      user_login: user_login
    };
    return this.http.post('http://localhost:8080/app/mouvement/createItems', data, this.myRequestOptions()).pipe(
      map(res => res.json()))
  }

  updatePaddocksOfAnimals(paddock_src, paddock_dest) {
    return this.http.put('http://localhost:8080/app/mouvement/updatePaddockOfAnimals/' + paddock_src + '/' + paddock_dest, this.myRequestOptions())
  }

}
