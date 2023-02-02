import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  filter,
  interval,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  interval$!: Observable<string>;
  destroy$!: Subject<boolean>;
  elapsedSeconds!: number;
  userEmail!: string;

  constructor(private router: Router) {}

  onContinueToApp(): void {
    this.router.navigateByUrl('facesnaps');
  }

  ngOnInit() {
    this.destroy$ = new Subject<boolean>();
    this.interval$ = interval(1000).pipe(
      tap((v) => (this.elapsedSeconds = v)),
      filter((v) => v % 3 === 0),
      map((v) => (v % 2 === 0 ? v + ', pair' : v + ', impair')),
      takeUntil(this.destroy$)
    );
    this.interval$.subscribe();

    this.userEmail = 'mon_adresse@mail.com';
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  onSubmitForm(form: NgForm): void {
    console.log(form.value);
  }
}
