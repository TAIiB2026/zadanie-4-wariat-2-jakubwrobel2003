import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription, interval, switchMap } from 'rxjs';
import { RepozytoriumHttpService } from './repozytorium-http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styles: []
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly httpService = inject(RepozytoriumHttpService);
  public losowaLiczba: number | null = null;
  private sub?: Subscription;

  ngOnInit(): void {
    this.startSync();
  }

  ngOnDestroy(): void {
    this.stopSync();
  }

  startSync(): void {
    // Pobierz natychmiast, potem co 4 sekundy
    this.httpService.GetRandomNumber().subscribe(n => this.losowaLiczba = n);

    this.sub = interval(4000).pipe(
      switchMap(() => this.httpService.GetRandomNumber())
    ).subscribe(n => this.losowaLiczba = n);
  }

  stopSync(): void {
    this.sub?.unsubscribe();
    this.sub = undefined;
  }
  public syncing = true;

toggleSync(): void {
    if (this.syncing) {
        this.stopSync();
    } else {
        this.startSync();
    }
    this.syncing = !this.syncing;
}
}