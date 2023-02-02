import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss'],
})
export class SingleFaceSnapComponent implements OnInit {
  snap$!: Observable<FaceSnap>;
  buttonText!: string;

  constructor(
    private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute
  ) {}

  onAddSnap(snapId: number): void {
    if (this.buttonText === 'Snap!') {
      this.snap$ = this.faceSnapsService.snapFaceById(snapId, 'snap').pipe(
        tap(() => {
          this.buttonText = 'Non en fait pas snap';
        })
      );
    } else {
      this.snap$ = this.faceSnapsService.snapFaceById(snapId, 'unsnap').pipe(
        tap(() => {
          this.buttonText = 'Snap!';
        })
      );
    }
  }

  ngOnInit(): void {
    this.buttonText = 'Snap!';
    const snapId = +this.route.snapshot.params['id'];
    this.snap$ = this.faceSnapsService.getFaceSnapById(snapId);
  }
}
