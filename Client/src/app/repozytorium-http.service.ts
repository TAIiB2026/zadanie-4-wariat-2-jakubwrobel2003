import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GetDataInterface } from './interfaces/get-data.interface';
import { FormSubmitInterface } from './interfaces/form-submit.interface';
import { KsiazkaClass } from './classes/ksiazka.class';

@Injectable()
export class RepozytoriumHttpService implements GetDataInterface, FormSubmitInterface {
  private readonly baseUrl = 'http://localhost:5111/api/ksiazki';

  constructor(private http: HttpClient) {}

  Get(tytul?: string, page?: number, pageSize?: number): Observable<KsiazkaClass[]> {
    let params = new HttpParams();
    if (tytul) {
        params = params.set('tytul', tytul);
    }
    if (page != null && pageSize != null) {
        params = params.set('page', page.toString());
        params = params.set('pageSize', pageSize.toString());
    }

    return this.http.get<any[]>(this.baseUrl, { params }).pipe(
        map(items => items.map(i =>
            new KsiazkaClass(i.id, i.tytul, i.cena, new Date(i.dataWydania))
        ))
    );
}

  GetByID(id: number): Observable<KsiazkaClass> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(i => new KsiazkaClass(i.id, i.tytul, i.cena, new Date(i.dataWydania)))
    );
  }

 Post(nazwa: string, cena: number, data: Date): Observable<boolean> {
    const body = { tytul: nazwa, cena: cena, dataWydania: data };
    return this.http.post(this.baseUrl, body).pipe(map(() => true));
}

Put(id: number, nazwa: string, cena: number, data: Date): Observable<boolean> {
    const body = { tytul: nazwa, cena: cena, dataWydania: data };
    return this.http.put<boolean>(`${this.baseUrl}/${id}`, body);
}
Delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`);
}
GetRandomNumber(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/random`);
}
}