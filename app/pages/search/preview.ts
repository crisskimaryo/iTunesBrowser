import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  template: `
    <ion-content padding>
      <h2>{{track.trackName}}</h2>
      <audio [src]="track.previewUrl" *ngIf="track.kind === 'song'" autoplay="autoplay"
        controls="controls">
        Browser doesn't support
      </audio>
      <video [src]="track.previewUrl" *ngIf="track.kind === 'feature-movie'" autoplay="autoplay"
        controls="controls">
        Browser doesn't support
      </video>
      <button (click)="close()">Close</button>
    </ion-content>
  `
})

export class PreviewModal {
  track: any;

  constructor(private params: NavParams, public viewCtrl: ViewController) {
    this.track = params.data.track;

  }

  close() {
    this.viewCtrl.dismiss();
  }
}