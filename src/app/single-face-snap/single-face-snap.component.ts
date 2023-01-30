import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss'],
})
export class SingleFaceSnapComponent implements OnInit {
  snap!: FaceSnap;
  buttonText!: string;

  constructor(
    private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute
  ) {}

  onAddSnap(): void {
    if (this.buttonText === 'Snap!') {
      this.faceSnapsService.snapFaceById(this.snap.id, 'snap');
      this.buttonText = 'Non en fait pas snap';
    } else {
      this.faceSnapsService.snapFaceById(this.snap.id, 'unsnap');
      this.buttonText = 'Snap!';
    }
  }

  ngOnInit(): void {
    this.buttonText = 'Snap!';
    const snapId = +this.route.snapshot.params['id'];
    this.snap = this.faceSnapsService.getFaceSnapById(snapId);
  }
}
