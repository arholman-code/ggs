/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		// { label: 'News', key: 'home', href: '/' },
		// { label: 'Blog', key: 'blog', href: '/blog' },
		// { label: 'Gallery', key: 'gallery', href: '/gallery' },
		// { label: 'Contact', key: 'contact', href: '/contact' },
		{ label: 'New!', key: 'home', href: '/blog' },
		{ label: 'Games', key: 'games', pages: [
			{ label: 'Nintendo', subkey: 'nintendo', href: '../blog/nintendo?' },
			{ label: 'Sony', subkey: 'sony', href: '../blog/sony?' },
			{ label: 'Microsoft', subkey: 'msft', href: '../blog/microsoft?' },
			{ label: 'PC', subkey:'pc', href: '../blog/pc?' },
			{ label: 'Board/RPG', subkey:'board', href:'../blog/boardrpg?' }
		]},
		{ label: 'Reviews', key: 'reviews', href: '../blog/reviews?' },
		{ label: 'Media', key: 'media', href: '../blog/media?' },
		{ label: 'Film/TV', key: 'filmtv', href: '../blog/filmtv?' },
		{ label: 'Contact', key: 'contact', href:'../blog/contact?' }
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
