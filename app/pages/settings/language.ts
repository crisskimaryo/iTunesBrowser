import { Injectable, Component } from '@angular/core';

@Component({})

@Injectable()
export class LanguageSetting {
  
  country: any;
  countries: any;

  constructor() {

    this.countries = [
      {
        name: 'United States',
        local_name: 'USA',
        code: 'us',
        currency: '$'
      },
      {
        name: 'United Kingdom',
        code: 'gb',
        local_name: 'The UK',
        currency: '£'
      },
      {
        name: 'Russia',
        local_name: 'Россия',
        code: 'ru'
      }
    ];

    this.country = this.countries[0];
  }
}