import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const browser = (function(agent) {
  switch (true) {
    case agent.indexOf('edge') > -1:
      return 'edge';
    // @ts-ignore
    case agent.indexOf('opr') > -1 && !!window.opr:
      return 'opera';
    // @ts-ignore
    case agent.indexOf('chrome') > -1 && !!window.chrome:
      return 'chrome';
    case agent.indexOf('trident/7') > -1:
      return 'ie11';
    case agent.indexOf('trident') > -1:
      return 'ie';
    case agent.indexOf('firefox') > -1:
      return 'firefox';
    case agent.indexOf('safari') > -1:
      return 'safari';
    default:
      return 'other';
  }
})(window.navigator.userAgent.toLowerCase());
console.log(browser);

if (['ie', 'safari'].includes(browser)) {
  document.getElementById('old-browsers').style.display = 'flex';
} else {
  platformBrowserDynamic().bootstrapModule(AppModule).then(ref => {
    // Ensure Angular destroys itself on hot reloads.
    if (window['ngRef']) {
      window['ngRef'].destroy();
    }
    window['ngRef'] = ref;

    // Otherwise, log the boot error
  }).catch(err => console.error(err));
}
