import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { FaceSnap } from '../models/face-snap.model';

@Injectable({
  providedIn: 'root',
})
export class FaceSnapsService {
  faceSnaps: FaceSnap[] = [
    {
      id: 0,
      title: 'Ceci est un titre ',
      imgUrl:
        'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      description: 'Ceci est la description',
      createdDate: new Date(),
      snaps: 0,
    },
    {
      id: 1,
      title: "Forêt d'automne",
      imgUrl:
        'https://th.bing.com/th/id/R.6afc61b50aabe45a2e6c68eae2c217ba?rik=L2W0YWncfjZBVA&riu=http%3a%2f%2fwww.shutterstock.com%2fblog%2fwp-content%2fuploads%2fsites%2f5%2f2016%2f03%2ffall-trees-road-1.jpg&ehk=KA%2bzFrmYoWsdK4k7v%2fgfNkd1T2rdnNtpF5ICdLIxAeM%3d&risl=&pid=ImgRaw&r=0',
      description: "Ceci est une forêt d'automne",
      createdDate: new Date(),
      snaps: 0,
      location: 'Forêt',
    },
    {
      id: 2,
      title: 'Belgrade',
      imgUrl:
        'https://th.bing.com/th/id/OIP.M4pLWEpNbNhA64McF-tMBQHaFi?pid=ImgDet&rs=1',
      description: 'Description de la photo de Belgrade',
      createdDate: new Date(),
      snaps: 0,
      location: 'Belgrade',
    },
    {
      id: 3,
      title: 'Oiseau',
      imgUrl: 'https://media.s-bol.com/gJ5mlN5DZVor/757x1200.jpg',
      description: 'Ceci est un oiseau',
      createdDate: new Date(),
      snaps: 0,
    },
  ];

  constructor(private http: HttpClient) {}

  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    //const snap = this.faceSnaps.find((faceSnap) => faceSnap.id === faceSnapId);
    const snap = this.http.get<FaceSnap>(
      `http://localhost:3000/facesnaps/${faceSnapId}`
    );
    if (!snap) {
      throw new Error('Invalid FaceSnap id : ' + faceSnapId);
    } else {
      return snap;
    }
  }

  snapFaceById(
    faceSnapId: number,
    snapType: 'snap' | 'unsnap'
  ): Observable<FaceSnap> {
    return this.getFaceSnapById(faceSnapId).pipe(
      map((snap) => ({
        ...snap,
        snaps: snap.snaps + (snapType === 'snap' ? 1 : -1),
      })),
      switchMap((snap) =>
        this.http.put<FaceSnap>(
          `http://localhost:3000/facesnaps/${snap.id}`,
          snap
        )
      )
    );
  }

  addFaceSnap(formValue: {
    title: string;
    description: string;
    imgUrl: string;
    location?: string;
  }): Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      map((snaps) => [...snaps].sort((a, b) => a.id - b.id)),
      map((snaps) => snaps[snaps.length - 1]),
      map((snap) => ({
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: snap.id + 1,
      })),
      switchMap((snap) =>
        this.http.post<FaceSnap>('http://localhost:3000/facesnaps', snap)
      )
    );
  }
}
