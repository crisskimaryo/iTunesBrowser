import { Component } from '@angular/core';
import { NavController, ActionSheet, Modal, Keyboard, Alert } from 'ionic-angular';
import { PreviewModal } from './preview'
import { Injectable } from '@angular/core';
import { Itunes } from "../../providers/itunes/itunes";
import * as lodash from 'lodash';
import { ArtistPage } from "../artist/artist";

@Component({
  templateUrl: 'build/pages/search/search.html',
  viewProviders: [Itunes]
})
@Injectable()
export class SearchPage {
  keyword: string;
  results: any;
  _unfilteredResults: Array<any>;
  usesFilter: boolean;
  timer: any;
  pending: boolean;
  searching: boolean;

  constructor(
    private nav: NavController,
    private itunes: Itunes,
    private keyboard: Keyboard
  ) {
    this.keyword = '';
    this._unfilteredResults = [];
    this.usesFilter = false;
    this.pending = false;
    this.searching = false;

    this.itunes.search(this.keyword)
      .then(results => this.results = results);
  }

  reloadData(refresher) {
    this.results = [];
    this.itunes.search(this.keyword)
      .then(results => {
        refresher.complete();
        this.results = lodash.shuffle(results);
      });
  }

  openPreview(track) {
    let alert = Alert.create({
      title: 'Are you sure?',
      buttons: [
        'Nope',
        {
          text: 'Yes!',
          handler: () => {
            alert.dismiss()
              .then(() => {
                let modal = Modal.create(PreviewModal, {track: track});
                this.nav.present(modal);
              });
            return false;
          }
        }
      ]
    });
    this.nav.present(alert);
  }

  keyHasBeenPressed(e) {
    if (e && e.type && e.type == "keyup" && e.target != null) {
      this.pending = true;
      this.keyword = e.target.value;
      if (this.keyword === '') {
        let alert = Alert.create({
          title: 'Empty search not allowed',
          subTitle: 'Please key in your search below',
          inputs: [{
            name: 'term',
            placeholder: 'Search for...'
          }],
          buttons: [
            {
              text: 'Cancel',
            },
            {
              text: 'Search',
              handler: data => {
                if(data.term) {
                  this.keyword = data.term;
                  this.search();
                  // automatically dismiss
                  return true;
                }
                // Don't allow to dismiss
                return false;
              }
            }
          ]
        });
        this.nav.present(alert);
      }
      window.clearTimeout(this.timer);
      return this.timer = window.setTimeout(() => {
        this.keyboard.close();
        if (this.keyword && this.keyword.trim() != '') {
          this.search();
        } else {
          this.keyword = '';
        }
        this.pending = false;
      }, 1400);
    }
    this.onCancel();
  }

  goToArtist(result) {
    this.nav.push(ArtistPage, {
      id: result.artistId,
      name: result.artistName
    })
  }

  search() {
    this.searching = true;
    this.itunes.search(this.keyword)
      .then(res => {
        this.searching = false;
        this.keyword && (this.results = res.filter((item) =>
          item && (item.trackName)
            && (item.trackName.toLowerCase().includes(this.keyword.toLowerCase()))));
        if (!res.length || !this.results.length) {
          let alert = Alert.create({
            title: 'The iTunes API says...',
            subTitle: 'No match found',
            buttons: ["I'll try again"]
          });
          this.nav.present(alert);
        }
    });
  }
  onCancel() {
    this.itunes.search(this.keyword)
      .then(results => this.results = results);
    this.keyword = '';
  }

  openFilters() {
    let sheet = ActionSheet.create({
      title: 'Filter by...',
      buttons: [
        {
          text: 'Movies only',
          handler: () => {
            this.results = this._unfilteredResults.filter(
              (item) => item.kind === 'feature-movie'
            );
            this.usesFilter = true;
          }
        },
        {
          text: 'Songs only',
          handler: () => {
            this.results = this._unfilteredResults.filter(
              (item) => item.kind === 'song'
            );
            this.usesFilter = true;
          }
        },
        {
          text: 'Clear',
          style: 'destructive',
          handler: () => {
            this.results = this._unfilteredResults;
            this.usesFilter = false;
          }
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    });
    this.nav.present(sheet);
  }
}
