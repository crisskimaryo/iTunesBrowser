import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Itunes } from "../../providers/itunes/itunes";
import { ToSymbolPipe } from "../../providers/itunes/symbol"
@Component({
  templateUrl: 'build/pages/artist/artist.html',
  viewProviders: [Itunes],
  pipes: [ToSymbolPipe]
})
export class ArtistPage {

  artist: any;
  albums: any;

  constructor(private nav: NavController, private params: NavParams, private itunes: Itunes) {
    this.artist = params.data;
    itunes.loadAlbums(params.data.id)
      .then(albums => this.albums = albums);
  }

}
