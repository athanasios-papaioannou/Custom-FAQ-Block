/**
 * WordPress translation helper.
 * Used for multilingual text support inside blocks.
 */
import { __ } from '@wordpress/i18n';

/**
 * Gutenberg helper hook.
 * Adds the correct props/classes to the block wrapper element.
 */
import {
	useBlockProps,
	RichText,
	InspectorControls,
} from '@wordpress/block-editor';

/* Inspector Controls */
import { PanelBody, ColorPicker, Button } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Editor-only styles.
 * These styles apply only inside the Gutenberg editor.
 */
import './editor.scss';

/**
 * React state hook from the WordPress React wrapper.
 * Used for interactive UI state inside the editor.
 */
import { useState } from '@wordpress/element';

/**
 * EDIT COMPONENT
 *
 * This controls how the block appears and behaves
 * INSIDE the Gutenberg editor.
 *
 * attributes:
 * -> stores the block data (saved in WordPress)
 *
 * setAttributes:
 * -> updates and saves block data
 */
export default function Edit({ attributes, setAttributes }) {

	/**
	 * Get FAQ items from block attributes.
	 *
	 * Default:
	 * -> empty array if no FAQs exist yet
	 */
	const { faqs = [] } = attributes;

	/**
	 * Local temporary state for the "Add FAQ" form.
	 *
	 * This is NOT saved directly in WordPress yet.
	 * It only stores what the user types into the inputs.
	 */
	const [newFAQ, setNewFAQ] = useState({
		question: '',
		answer: '',
	});

	/**
	 * Add a new FAQ item into block attributes.
	 *
	 * Steps:
	 * 1. Copy existing FAQs
	 * 2. Add new FAQ object
	 * 3. Save updated array into WordPress block attributes
	 * 4. Reset input fields
	 */
	
	const addFAQ = () => {

		// Trim inputs to prevent saving empty spaces as valid content
		const question = newFAQ.question.trim();
		const answer = newFAQ.answer.trim();

		// Validation check
		if (!question || !answer) {

			alert('Please enter both question and answer.');

			return;
		}

		// Add new FAQ item
		setAttributes({
			faqs: [
				...faqs,
				{
					question,
					answer,
				},
			],
		});

		// Reset form fields
		setNewFAQ({
			question: '',
			answer: '',
		});
	};

	// Local state for editing an existing FAQ item
	const [editingIndex, setEditingIndex] = useState(null);
	const [editedFAQ, setEditedFAQ] = useState({
		question: '',
		answer: '',
	});
	const startEdit = (faq, index) => {

		setEditingIndex(index);

		setEditedFAQ({
			question: faq.question,
			answer: faq.answer,
		});
	};
	const saveEdit = () => {

		const updatedFaqs = [...faqs];

		updatedFaqs[editingIndex] = editedFAQ;

		setAttributes({
			faqs: updatedFaqs,
		});

		// Exit edit mode
		setEditingIndex(null);

		// Reset edit form
		setEditedFAQ({
			question: '',
			answer: '',
		});
	};
	const cancelEdit = () => {

		// Exit edit mode
		setEditingIndex(null);

		// Reset edit form (discard changes)
		setEditedFAQ({
			question: '',
			answer: '',
		});
	};

	// Function to remove an FAQ item by index
	const removeFAQ = (indexToRemove) => {

		// Ask user confirmation before deleting
		const confirmDelete = window.confirm(
			'Are you sure you want to delete this FAQ? This action cannot be undone.'
		);

		// If user cancels → stop here
		if (!confirmDelete) {
			return;
		}

		// Create new array without the selected FAQ
		const updatedFaqs = faqs.filter(
			(_, index) => index !== indexToRemove
		);

		// Save updated list
		setAttributes({
			faqs: updatedFaqs,
		});
	};

	// Function to move an FAQ item up or down in the list
	const moveFAQ = (fromIndex, toIndex) => {

		// Create a copy of the FAQs array to modify
		const updatedFaqs = [...faqs];

		// Check if target index is within bounds
		if (
			toIndex < 0 ||
			toIndex >= updatedFaqs.length
		) {
			return;
		}

		// Swap items
		const temp = updatedFaqs[fromIndex];
		updatedFaqs[fromIndex] = updatedFaqs[toIndex];
		updatedFaqs[toIndex] = temp;

		// Save new order
		setAttributes({
			faqs: updatedFaqs,
		});
	};

	//
	const [isCollapsed, setIsCollapsed] = useState(false);

	/**
	 * Controls which accordion item is currently open.
	 *
	 * null -> all closed
	 * number -> open FAQ index
	 */
	const [openIndex, setOpenIndex] = useState(null);

	/**
	 * Toggle accordion open/close state.
	 *
	 * If the clicked item is already open:
	 * -> close it
	 *
	 * Otherwise:
	 * -> open the clicked FAQ
	 */
	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	/**
	 * Reset color attributes to their default values.
	 */
	const resetColors = () => {
		setAttributes({
			buttonColor: '#f1f1f1',
			buttonHoverColor: '#e2e2e2',
			buttonTextColor: '#000000',
		});
	};

	/**
	 * JSX / React UI
	 *
	 * This is what gets rendered inside Gutenberg.
	 */
	return (
		<Fragment>
			
			{/* Inspector controls for block settings in the sidebar */ }
			<InspectorControls>
				<PanelBody title="Expand / Collapse Button Colors (frontend)">

					<p>Button background</p>

					<ColorPicker
						color={attributes.buttonColor}
						onChangeComplete={(value) =>
							setAttributes({ buttonColor: value.hex })
						}
					/>

					<p>Button hover background</p>

					<ColorPicker
						color={attributes.buttonHoverColor}
						onChangeComplete={(value) =>
							setAttributes({ buttonHoverColor: value.hex })
						}
					/>

					<p>Button text color</p>

					<ColorPicker
						color={attributes.buttonTextColor}
						onChangeComplete={(value) =>
							setAttributes({ buttonTextColor: value.hex })
						}
					/>

					<Button
						isSecondary
						onClick={resetColors}
						style={{ marginTop: '15px', width: '100%' }}
					>
						Reset Colors
					</Button>

				</PanelBody>
			</InspectorControls>

			{/**
			 * Main Gutenberg block wrapper.
			 *
			 * useBlockProps() is required for proper Gutenberg behavior.
			 */}
			<div {...useBlockProps()} className="faq-wrapper">
				
				{/* ----------------------------- */}
				{/* ADD NEW FAQ FORM */}
				{/* ----------------------------- */}
				<h3
					className="faq-block-toggle"
					onClick={() => setIsCollapsed(!isCollapsed)}
				>
					{isCollapsed ? '▶' : '▼'} FAQ Block
				</h3>
				<div className={`faq-block-content ${isCollapsed ? 'is-collapsed' : ''}`}>		
					<div className="faq-new-item faq-panel">	
						<h4>Add new FAQ</h4>
						
						<div className="faq-field">
							<label>Question</label>
							
							<RichText
								tagName="p"
								placeholder="Question"
								value={newFAQ.question}
								onChange={(value) =>
									setNewFAQ({
										...newFAQ,
										question: value,
									})
								}
							/>
						</div>

						<div className="faq-field">
							<label>Answer</label>

							<RichText
								tagName="p"
								placeholder="Answer"
								value={newFAQ.answer}
								onChange={(value) =>
									setNewFAQ({
										...newFAQ,
										answer: value,
									})
								}
							/>
						</div>

						<button type="button" onClick={addFAQ}>
							+ Add FAQ
						</button>
					</div>
				</div>
				{/* ----------------------------- */}
				{/* FAQ LIST PREVIEW */}
				{/* ----------------------------- */}

				{faqs.map((faq, index) => (

					/**
					 * Each FAQ item rendered dynamically from the array.
					 */
					<div key={index} className="faq-item">

						{/* FAQ question / accordion trigger */}
						<h3
							onClick={() => toggleFAQ(index)}
							style={{ cursor: 'pointer' }}
						>
							<RichText.Content
								value={faq.question || 'Untitled question'}
							/>
						</h3>					
						
						{/* Show answer only if item is open */}
						{openIndex === index && (
							<div>
								<RichText.Content
									value={faq.answer || 'No answer yet'}
								/>
							</div>
						)}

						{/* Edit form shown only for the currently editing FAQ item */}
						{editingIndex === index && (

							<div className="faq-edit-form">
								
								<div className="faq-field">
									<label>Question</label>
									
									<RichText
										tagName="p"
										value={editedFAQ.question}
										onChange={(value) =>
											setEditedFAQ({
												...editedFAQ,
												question: value,
											})
										}
									/>
								</div>

								<div className="faq-field">
									<label>Answer</label>

									<RichText
										tagName="p"
										value={editedFAQ.answer}
										onChange={(value) =>
											setEditedFAQ({
												...editedFAQ,
												answer: value,
											})
										}
									/>
								</div>

								<button
									type="button"
									onClick={saveEdit}
								>
									Save Changes
								</button>
								<button
									type="button"
									onClick={cancelEdit}								
								>
									Cancel
								</button>

							</div>
						)}	
						{/* Edit and Delete buttons */}
						<button
							type="button"
							className="faq-edit"
							onClick={() => startEdit(faq, index)}
						>
							Edit FAQ
						</button>
						<button
							type="button"
							className="faq-delete"
							onClick={() => removeFAQ(index)}
						>
							Delete FAQ
						</button>	

						{/*Controls to move FAQ up/down in the list*/}
						<div className="faq-controls">

							<button
								type="button"
								onClick={() => moveFAQ(index, index - 1)}
							>
								⬆ Up
							</button>

							<button
								type="button"
								onClick={() => moveFAQ(index, index + 1)}
							>
								⬇ Down
							</button>

						</div>			
					</div>
				))}
			</div>
		</Fragment>
	);
}