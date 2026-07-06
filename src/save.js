/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */

/**
 * SAVE COMPONENT
 *
 * This file controls what gets saved into
 * the WordPress post content database.
 *
 * IMPORTANT:
 * save.js is NOT a React app runtime.
 *
 * This means:
 * -> no useState()
 * -> no dynamic interactivity
 * -> no live React logic
 *
 * It only generates static HTML markup.
 *
 * The frontend interactivity is handled separately
 * inside view.js using vanilla JavaScript.
 */

/**
 * save()
 *
 * attributes:
 * -> contains the saved block data from Gutenberg
 */
export default function save({ attributes }) {
	const { faqs = [] } = attributes;

	return (
		<div {...useBlockProps.save()} className="faq-wrapper" style={{
			'--faq-button-color': attributes.buttonColor,
			'--faq-button-hover-color': attributes.buttonHoverColor,
			'--faq-button-text-color': attributes.buttonTextColor,
		}}>
			<div className="faq-global-controls">

				<button className="faq-expand-all">
					Expand All
				</button>

				<button className="faq-collapse-all">
					Collapse All
				</button>

			</div>
			{faqs.map((faq, index) => (
				<div key={index} className="faq-item">

					{/* HEADER (click area) */}
					<div className="faq-question">
						
						<span className="faq-title">
							<RichText.Content value={faq.question} />
						</span>

						{/* icon placeholder (+ / -) */}
						<span className="faq-icon">+</span>

					</div>

					{/* ANSWER (collapsible) */}
					<div className="faq-answer">
						<div
							className="faq-answer-inner"
							dangerouslySetInnerHTML={{ __html: faq.answer }}
						/>
					</div>

				</div>
			))}
		</div>
	);
}