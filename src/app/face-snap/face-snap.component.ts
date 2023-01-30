import { Component, OnInit, Input } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss'],
})
export class FaceSnapComponent implements OnInit {
  @Input() snap!: FaceSnap;
  buttonText!: string;

  constructor(private faceSnapsService: FaceSnapsService) {}

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
  }
}
