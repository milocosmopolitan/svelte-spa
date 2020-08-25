import {
	register,
	init,
	getLocaleFromNavigator,
	locale as $locale,
} from 'svelte-i18n';

import { setCookie, getCookie } from '../libs/common';
import type { ConfigureOptions } from 'svelte-i18n/types/runtime/types';

const INIT_OPTIONS: ConfigureOptions = {
	fallbackLocale: 'en',
	initialLocale: undefined,
	loadingDelay: 200,
	formats: {},
};

let currentLocale: any = null;


register('en', () => import('./en.json'));
register('es', () => import('./es.json'));
register('ko', () => import('./ko.json'));

$locale.subscribe((value) => {
	if (value == null) return;

	currentLocale = value;

	console.log('test', value)

	// if running in the client, save the language preference in a cookie
	if (typeof window !== 'undefined') {
		setCookie('locale', value);
	}
});

// initialize the i18n library in client
export function startClient() {
	// console.log('LOCALE i18n.ts',currentLocale, appLocale);
	init({
		...INIT_OPTIONS,
		initialLocale: getCookie('locale') || getLocaleFromNavigator(),
	});
}

const DOCUMENT_REGEX = /^([^.?#@]+)?([?#](.+)?)?$/;
// initialize the i18n library in the server and returns its middleware
export function i18nMiddleware() {
	// console.log('LOCALE i18n.ts',currentLocale, appLocale);
	// initialLocale will be set by the middleware
	init(INIT_OPTIONS);

	return (req: any, res: any, next: any) => {
		const isDocument = DOCUMENT_REGEX.test(req.originalUrl);
		// get the initial locale only for a document request
		if (!isDocument) {
			next();
			return;
		}

		let locale = getCookie('locale', req.headers.cookie);

		// no cookie, let's get the first accepted language
		if (locale == null) {
			if (req.headers['accept-language']) {
				const headerLang = req.headers['accept-language'].split(',')[0].trim();
				if (headerLang.length > 1) {
					locale = headerLang;
				}
			} else {
				locale = INIT_OPTIONS.initialLocale || INIT_OPTIONS.fallbackLocale;
			}
		}

		if (locale != null && locale !== currentLocale) {
			$locale.set(locale);
		}

		next();
	};
}
