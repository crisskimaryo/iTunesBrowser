import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { JSONP_PROVIDERS } from '@angular/http';
import { StatusBar } from 'ionic-native';

import { Page1 } from './pages/page1/page1';
import { Page2 } from './pages/page2/page2';
import { SearchPage } from './pages/search/search';
import { SettingsPage } from "./pages/settings/settings";
import { ContactusPage } from "./pages/contactus/contactus";
import { LanguageSetting } from "./pages/settings/language";

@Component({
  templateUrl: 'build/app.html',
  providers: [LanguageSetting]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SearchPage;

  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Page uno', component: Page1 },
      { title: 'Page dos', component: Page2 },
      { title: 'Search...', component: SearchPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Contact us', component: ContactusPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp,[JSONP_PROVIDERS, LanguageSetting]);
