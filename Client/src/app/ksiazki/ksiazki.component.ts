import { Component, inject } from '@angular/core';
import { GET_DATA_TOKEN } from '../tokens/get-data.token';
import { RepozytoriumHttpService } from '../repozytorium-http.service';
import { KsiazkaClass } from '../classes/ksiazka.class';

@Component({
  selector: 'taiib2-ksiazki',
  standalone: false,
  templateUrl: './ksiazki.component.html',
  styles: ``
})
export class KsiazkiComponent {
  private readonly service = inject(GET_DATA_TOKEN);
  private readonly httpService = inject(RepozytoriumHttpService);

  public dane: KsiazkaClass[] = [];
  public filtrTytul: string = '';
  public aktualnaStrona: number = 1;
  public rozmiarStrony: number = 5;
  public wszystkieKsiazki: KsiazkaClass[] = [];

  constructor() {
    this.ladujDane();
  }

  ladujDane() {
    this.service.Get().subscribe(d => {
      this.wszystkieKsiazki = d;
      this.filtruj();
    });
  }

  filtruj() {
    this.aktualnaStrona = 1;
    this.aktualizujStrone();
  }

  aktualizujStrone() {
    let przefiltrowane = this.wszystkieKsiazki;

    if (this.filtrTytul.trim()) {
      przefiltrowane = przefiltrowane.filter(k =>
        k.tytul.toLowerCase().includes(this.filtrTytul.toLowerCase())
      );
    }

    const start = (this.aktualnaStrona - 1) * this.rozmiarStrony;
    this.dane = przefiltrowane.slice(start, start + this.rozmiarStrony);
  }

  get liczbaStron(): number {
    let przefiltrowane = this.wszystkieKsiazki;
    if (this.filtrTytul.trim()) {
      przefiltrowane = przefiltrowane.filter(k =>
        k.tytul.toLowerCase().includes(this.filtrTytul.toLowerCase())
      );
    }
    return Math.ceil(przefiltrowane.length / this.rozmiarStrony);
  }

  poprzedniaStrona() {
    if (this.aktualnaStrona > 1) {
      this.aktualnaStrona--;
      this.aktualizujStrone();
    }
  }

  nastepnaStrona() {
    if (this.aktualnaStrona < this.liczbaStron) {
      this.aktualnaStrona++;
      this.aktualizujStrone();
    }
  }

  usun(id: number) {
    this.httpService.Delete(id).subscribe({
      next: () => this.ladujDane(),
      error: () => alert('Błąd podczas usuwania')
    });
  }
}