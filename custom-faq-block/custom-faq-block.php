<?php
/**
 * Plugin Name: Custom FAQ Block
 * Plugin URI: https://your-site.com
 * Description: Interactive Gutenberg FAQ block with accordion functionality and rich editing experience.
 * Version: 1.4.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Athanasios Papaioannou
 * Author URI: https://your-site.com
 * License: GPL-2.0-or-later
 * Text Domain: custom-faq-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register Gutenberg block
 */
function custom_faq_block_init() {

	register_block_type( __DIR__ . '/build' );

}

add_action( 'init', 'custom_faq_block_init' );