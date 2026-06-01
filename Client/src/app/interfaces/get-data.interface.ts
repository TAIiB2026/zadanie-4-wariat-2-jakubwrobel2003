import { Observable } from "rxjs";
import { KsiazkaClass } from "../classes/ksiazka.class";

export interface GetDataInterface {
    Get(tytul?: string, page?: number, pageSize?: number): Observable<KsiazkaClass[]>;
    GetByID(id: number): Observable<KsiazkaClass>;
}