import {Pipe} from '@angular/core';
import {LanguageSetting} from "../../pages/settings/language";

@Pipe({
  name: 'toSymbol'
})
export class ToSymbolPipe {
  constructor(private settings: LanguageSetting) {

  }

  transform(v, args) {
    return this.settings.country.currency
      || v;
  }
}
