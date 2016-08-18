import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SearchPage} from "../search/search";

@Component({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {
  private nav;
  private theSearchPage;
  constructor(private navCtrl: NavController) {
    this.nav = navCtrl;
    this.theSearchPage = SearchPage;
  }

  goToSearch() {
    this.nav.setRoot(SearchPage);
  }
}
