import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LanguageSetting} from "./language";


@Component({
  templateUrl: 'build/pages/settings/settings.html',
})
export class SettingsPage {
  private countries;
  private selectCountry;

  constructor(private nav: NavController, private setting: LanguageSetting) {
    this.countries = setting.countries;
  }

  select(country) {
    this.selectCountry = country;
    this.setting.country = country;
    
  }
}
