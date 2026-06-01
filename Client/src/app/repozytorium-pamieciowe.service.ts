import { Injectable } from '@angular/core';
import { GetDataInterface } from './interfaces/get-data.interface';
import { FormSubmitInterface } from './interfaces/form-submit.interface';
import { Observable, of } from 'rxjs';
import { KsiazkaClass } from './classes/ksiazka.class';

@Injectable()
export class RepozytoriumPamiecioweService implements GetDataInterface, FormSubmitInterface {
  private idGenerator = 1;
  private readonly data: KsiazkaClass[] = [
    new KsiazkaClass(this.idGenerator++, "Pan Tadeusz", 72.19, new Date(1906, 0, 1)),
    new KsiazkaClass(this.idGenerator++, "Lalka", 59.90, new Date(1890, 4, 15)),
    new KsiazkaClass(this.idGenerator++, "Quo Vadis", 64.50, new Date(1896, 2, 26)),
    new KsiazkaClass(this.idGenerator++, "Chłopi", 68.75, new Date(1904, 10, 1)),
    new KsiazkaClass(this.idGenerator++, "Krzyżacy", 54.99, new Date(1900, 6, 25))
  ]

  Post(nazwa: string, cena: number, data: Date): Observable<boolean> {
    const newObj = new KsiazkaClass(this.idGenerator++, nazwa, cena, data);
    this.data.push(newObj);
    return of(true);
  }

  Put(id: number, nazwa: string, cena: number, data: Date): Observable<boolean> {
    const obj = this.data.find(x => x.id === id);
    if(obj) {
      obj.tytul = nazwa;
      obj.cena = cena;
      obj.dataWydania = data;
      return of(true);
    }

    return of(false);
  }

Get(tytul?: string, page?: number, pageSize?: number): Observable<KsiazkaClass[]> {
    const kopia = this.data.map(x => new KsiazkaClass(x.id, x.tytul, x.cena, x.dataWydania));
    return of(kopia);
}

  GetByID(id: number): Observable<KsiazkaClass> {
    const obj = this.data.find(x => x.id === id);
    if(obj) {
      const kopia = new KsiazkaClass(obj.id, obj.tytul, obj.cena, obj.dataWydania);
      return of(kopia);
    }

    throw new Error("Nie znaleziono obiektu.");
  }
}
