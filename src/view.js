/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log( 'Hello World! (from create-block-custom-faq-block block)' );
/* eslint-enable no-console */

/**
 * FRONTEND FAQ ACCORDION SCRIPT
 *
 * This file runs ONLY on the frontend of the website.
 *
 * Unlike edit.js:
 * -> there is no React here
 * -> no Gutenberg editor
 * -> no useState()
 *
 * This is plain vanilla JavaScript used to add
 * interaction to the saved FAQ HTML output.
 */

/**
 * Wait until the full HTML document has loaded.
 *
 * This ensures all FAQ elements already exist
 * before we try to access them.
 */
document.addEventListener('DOMContentLoaded', () => {

	// Get all FAQ items
	const items = document.querySelectorAll('.faq-item');

	// Get global control buttons
	const expandAllBtn = document.querySelector('.faq-expand-all');
	const collapseAllBtn = document.querySelector('.faq-collapse-all');

	// -----------------------------
	// INDIVIDUAL FAQ TOGGLE
	// -----------------------------
	items.forEach((item) => {

		const question = item.querySelector('.faq-question');
		const answer = item.querySelector('.faq-answer');
		const icon = item.querySelector('.faq-icon');
		
		question.addEventListener('click', () => {

			// Toggle open class
			answer.classList.toggle('is-open');

			// Toggle active class for styling
			question.classList.toggle('is-active');

			// Check current state
			const isOpen = answer.classList.contains('is-open');

			// Update icon
			icon.textContent = isOpen ? '−' : '+';
		});
	});

	// -----------------------------
	// EXPAND ALL
	// -----------------------------
	expandAllBtn?.addEventListener('click', () => {

		items.forEach((item) => {

			const question = item.querySelector('.faq-question');
			const answer = item.querySelector('.faq-answer');
			const icon = item.querySelector('.faq-icon');

			answer.classList.add('is-open');
			question.classList.add('is-active');

			icon.textContent = '−';
		});
	});

	// -----------------------------
	// COLLAPSE ALL
	// -----------------------------
	collapseAllBtn?.addEventListener('click', () => {

		items.forEach((item) => {

			const question = item.querySelector('.faq-question');
			const answer = item.querySelector('.faq-answer');
			const icon = item.querySelector('.faq-icon');

			answer.classList.remove('is-open');
			question.classList.remove('is-active');

			icon.textContent = '+';
		});
	});
});