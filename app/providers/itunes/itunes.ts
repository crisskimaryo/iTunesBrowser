import { Injectable, Component } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { LanguageSetting } from "../../pages/settings/language";

@Component({viewProviders: [Jsonp]})
@Injectable()
export class Itunes {

  results: any;

  constructor(private jsonp: Jsonp, private setting: LanguageSetting) {
    this.results = null;
  }

  loadAlbums(id) {
    let params = new URLSearchParams('callback=JSONP_CALLBACK&entity=album');
    params.set('id', id);
    params.set('country', this.setting.country.code);
    return this.jsonp.request('https://itunes.apple.com/lookup', {
      search: params
    }).toPromise()
      .then(res => res.json().results)
      .then(results => results.filter(item => item.collectionType === 'Album'))
  }

  search(keyword) {
    let params = new URLSearchParams('callback=JSONP_CALLBACK');
    params.set('term', keyword);
    return this.jsonp.request('https://itunes.apple.com/search', {
      search: params
    }).toPromise()
      .then((response) => response.json().results);
  }
}

