import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, interval, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  interval$!: Observable<string>;
  elapsedSeconds!: number;
  constructor(private router: Router) {}

  onContinueToApp(): void {
    this.router.navigateByUrl('facesnaps');
  }

  ngOnInit() {
    this.interval$ = interval(1000).pipe(
      tap((v) => (this.elapsedSeconds = v)),
      filter((v) => v % 3 === 0),
      map((v) => (v % 2 === 0 ? v + ', pair' : v + ', impair'))
    );
  }
}
