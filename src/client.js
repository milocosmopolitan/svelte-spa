import * as sapper from '@sapper/app';
// import { initializeLocalization } from './services/i18n/i18n.service';

// initializeLocalization();

sapper.start({
	target: document.querySelector('#sapper')
});
