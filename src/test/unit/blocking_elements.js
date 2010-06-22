/**
* Tests for special-casing certain block elements that make it impossible to
* add content before/after them when followed by another blocking element or by
* the start/end of the document.
*/

function runBlockingElementTests() {
	// Should be able to add content before/after/between block elements
	module("Blocking Elements");

	var is_double_br_browser = $.browser.mozilla || $.browser.webkit || $.browser.safari;

	var tableHtml = '' +
	'<table>' +
		'<tbody>' +
			'<tr>' +
				'<td></td>' +
				'<td></td>' +
				'<td></td>' +
			'</tr>' +
			'<tr>' +
				'<td></td>' +
				'<td></td>' +
				'<td></td>' +
			'</tr>' +
		'</tbody>' +
	'</table>';
	var pTableHtml = '' +
	'<p>p1</p>' +
	'<table>' +
		'<tbody>' +
			'<tr>' +
				'<td></td>' +
				'<td></td>' +
				'<td></td>' +
			'</tr>' +
			'<tr>' +
				'<td></td>' +
				'<td></td>' +
				'<td></td>' +
			'</tr>' +
		'</tbody>' +
	'</table>';
	var pTablePHtml = '' +
	'<p>p1</p>' +
	'<table>' +
		'<tbody>' +
			'<tr>' +
				'<td></td>' +
				'<td></td>' +
				'<td></td>' +
			'</tr>' +
			'<tr>' +
				'<td></td>' +
				'<td></td>' +
				'<td></td>' +
			'</tr>' +
		'</tbody>' +
	'</table>' +
	'<p>p2</p>';
	var pTableTablePHtml = '' +
	'<p>p1</p>' +
	'<table>' +
		'<tbody>' +
			'<tr>' +
				'<td></td>' +
				'<td></td>' +
				'<td></td>' +
			'</tr>' +
			'<tr>' +
				'<td></td>' +
				'<td></td>' +
				'<td></td>' +
			'</tr>' +
		'</tbody>' +
	'</table>' +
	'<table>' +
		'<tbody>' +
			'<tr>' +
				'<td></td>' +
				'<td></td>' +
				'<td></td>' +
			'</tr>' +
			'<tr>' +
				'<td></td>' +
				'<td></td>' +
				'<td></td>' +
			'</tr>' +
		'</tbody>' +
	'</table>' +
	'<p>p2</p>';

	// If there is no element in front of a table in FF or ie, it's not possible
	// to put content in front of that table.
	test("table has br spacers via .html()", function() {
		var wymeditor = jQuery.wymeditors(0);
		wymeditor.html(tableHtml);
		wymeditor.fixBodyHtml();

		var $body = $(wymeditor._doc).find('body.wym_iframe');
		var children = $body.children();

		if ( is_double_br_browser ) {
			expect(5);
			equals( children.length, 3 );
			if ( children.length == 3 ) {
				equals( children[0].tagName.toLowerCase(), 'br' );
				equals( children[1].tagName.toLowerCase(), 'table' );
				equals( children[2].tagName.toLowerCase(), 'br' );
			}
		} else {
			expect(4);
			equals( children.length, 2 );
			if ( children.length == 2 ) {
				equals( children[0].tagName.toLowerCase(), 'br' );
				equals( children[1].tagName.toLowerCase(), 'table' );
			}
		}

		equals( wymeditor.xhtml(), tableHtml );
	});

	test("table has br spacers via table insertion", function() {
		var wymeditor = jQuery.wymeditors(0);
		wymeditor.html('');
		wymeditor.insertTable( 2, 3, '', '' );

		var $body = $(wymeditor._doc).find('body.wym_iframe');
		var children = $body.children();

		if ( is_double_br_browser ) {
			expect(5);
			equals( children.length, 3 );
			if ( children.length == 3 ) {
				equals( children[0].tagName.toLowerCase(), 'br' );
				equals( children[1].tagName.toLowerCase(), 'table' );
				equals( children[2].tagName.toLowerCase(), 'br' );
			}
		} else {
			expect(4);
			equals( children.length, 2 );
			if ( children.length == 2 ) {
				equals( children[0].tagName.toLowerCase(), 'br' );
				equals( children[1].tagName.toLowerCase(), 'table' );
			}
		}

		equals( wymeditor.xhtml(), tableHtml );
	});

	test("p + table has br spacers via .html()", function() {
		var wymeditor = jQuery.wymeditors(0);
		wymeditor.html(pTableHtml);
		wymeditor.fixBodyHtml();

		var $body = $(wymeditor._doc).find('body.wym_iframe');
		var children = $body.children();

		if ( is_double_br_browser ) {
			expect(6);
			equals( children.length, 4 );
			if ( children.length == 4 ) {
				equals( children[0].tagName.toLowerCase(), 'p' );
				equals( children[1].tagName.toLowerCase(), 'br' );
				equals( children[2].tagName.toLowerCase(), 'table' );
				equals( children[3].tagName.toLowerCase(), 'br' );
			}
		} else {
			expect(5);
			equals( children.length, 3 );
			if ( children.length == 3 ) {
				equals( children[0].tagName.toLowerCase(), 'p' );
				equals( children[1].tagName.toLowerCase(), 'br' );
				equals( children[2].tagName.toLowerCase(), 'table' );
			}
		}

		equals( wymeditor.xhtml(), pTableHtml );
	});

	test("p + table has br spacers via table insertion", function() {
		var wymeditor = jQuery.wymeditors(0);
		wymeditor.html('<p>p1</p>');

		var $body = $(wymeditor._doc).find('body.wym_iframe');

		// Move the selector to the first paragraph
		var first_p = $body.find('p')[0];
		moveSelector(wymeditor, first_p);

		wymeditor.insertTable( 2, 3, '', '' );

		var children = $body.children();

		if ( is_double_br_browser ) {
			expect(6);
			equals( children.length, 4 );
			if ( children.length == 4 ) {
				equals( children[0].tagName.toLowerCase(), 'p' );
				equals( children[1].tagName.toLowerCase(), 'br' );
				equals( children[2].tagName.toLowerCase(), 'table' );
				equals( children[3].tagName.toLowerCase(), 'br' );
			}
		} else {
			expect(5);
			equals( children.length, 3 );
			if ( children.length == 3 ) {
				equals( children[0].tagName.toLowerCase(), 'p' );
				equals( children[1].tagName.toLowerCase(), 'br' );
				equals( children[2].tagName.toLowerCase(), 'table' );
			}
		}

		equals( wymeditor.xhtml(), pTableHtml );
	});

	test("p + table + p has br spacers via .html()", function() {
		var wymeditor = jQuery.wymeditors(0);
		wymeditor.html(pTablePHtml);
		wymeditor.fixBodyHtml();

		var $body = $(wymeditor._doc).find('body.wym_iframe');
		var children = $body.children();

		expect(7);
		equals( children.length, 5 );
		if ( children.length == 5 ) {
			equals( children[0].tagName.toLowerCase(), 'p' );
			equals( children[1].tagName.toLowerCase(), 'br' );
			equals( children[2].tagName.toLowerCase(), 'table' );
			equals( children[3].tagName.toLowerCase(), 'br' );
			equals( children[4].tagName.toLowerCase(), 'p' );
		}

		equals( wymeditor.xhtml(), pTablePHtml );
	});

	test("p + table + p has br spacers via table insertion", function() {
		var wymeditor = jQuery.wymeditors(0);
		wymeditor.html('<p>p1</p><p>p2</p>');

		var $body = $(wymeditor._doc).find('body.wym_iframe');

		// Move the selector to the first paragraph
		var first_p = $body.find('p')[0];
		moveSelector(wymeditor, first_p);

		wymeditor.insertTable( 2, 3, '', '' );

		var children = $body.children();

		expect(7);
		equals( children.length, 5 );
		if ( children.length == 5 ) {
			equals( children[0].tagName.toLowerCase(), 'p' );
			equals( children[1].tagName.toLowerCase(), 'br' );
			equals( children[2].tagName.toLowerCase(), 'table' );
			equals( children[3].tagName.toLowerCase(), 'br' );
			equals( children[4].tagName.toLowerCase(), 'p' );
		}

		equals( wymeditor.xhtml(), pTablePHtml );
	});

	test("p + table + table + p has br spacers via .html()", function() {
		var wymeditor = jQuery.wymeditors(0);
		wymeditor.html(pTableTablePHtml);
		wymeditor.fixBodyHtml();

		var $body = $(wymeditor._doc).find('body.wym_iframe');
		var children = $body.children();

		expect(9);
		equals( children.length, 7 );
		if ( children.length == 7 ) {
			equals( children[0].tagName.toLowerCase(), 'p' );
			equals( children[1].tagName.toLowerCase(), 'br' );
			equals( children[2].tagName.toLowerCase(), 'table' );
			equals( children[3].tagName.toLowerCase(), 'br' );
			equals( children[4].tagName.toLowerCase(), 'table' );
			equals( children[5].tagName.toLowerCase(), 'br' );
			equals( children[6].tagName.toLowerCase(), 'p' );
		}

		equals( wymeditor.xhtml(), pTableTablePHtml );
	});

	test("p + table + table + p has br spacers via table insertion", function() {
		var wymeditor = jQuery.wymeditors(0);
		wymeditor.html('<p>p1</p><p>p2</p>');

		var $body = $(wymeditor._doc).find('body.wym_iframe');

		// Move the selector to the first paragraph
		var first_p = $body.find('p')[0];
		moveSelector(wymeditor, first_p);

		wymeditor.insertTable( 2, 3, '', '' );
		wymeditor.insertTable( 2, 3, '', '' );

		var children = $body.children();

		expect(9);
		equals( children.length, 7 );
		if ( children.length == 7 ) {
			equals( children[0].tagName.toLowerCase(), 'p' );
			equals( children[1].tagName.toLowerCase(), 'br' );
			equals( children[2].tagName.toLowerCase(), 'table' );
			equals( children[3].tagName.toLowerCase(), 'br' );
			equals( children[4].tagName.toLowerCase(), 'table' );
			equals( children[5].tagName.toLowerCase(), 'br' );
			equals( children[6].tagName.toLowerCase(), 'p' );
		}

		equals( wymeditor.xhtml(), pTableTablePHtml );
	});

	test("br spacers aren't deleted when arrowing through them", function() {
		// the spacer <br> shouldn't be turned in to a <p> when it gets cursor
		// focus
		var wymeditor = jQuery.wymeditors(0);
		wymeditor.html(pTablePHtml);
		wymeditor.fixBodyHtml();

		var $body = $(wymeditor._doc).find('body.wym_iframe');

		function checkLayout ( $body ) {
			var children = $body.children();
			equals( children.length, 5 );
			if ( children.length == 5 ) {
				equals( children[0].tagName.toLowerCase(), 'p' );
				equals( children[1].tagName.toLowerCase(), 'br' );
				equals( children[2].tagName.toLowerCase(), 'table' );
				equals( children[3].tagName.toLowerCase(), 'br' );
				equals( children[4].tagName.toLowerCase(), 'p' );
			}
		}

		// Go through each top-level element and hit the DOWN key
		$body.children().each( function (index, element) {
			// Simulate a keyup event
			var event = $.Event('keyup');
			event.keyCode = 40; //DOWN
			event.metaKey = false;
			event.ctrlKey = false;

			moveSelector(wymeditor, element);
			$(wymeditor._doc).trigger(event);

			checkLayout($body);

			if( element.nodeName.toLowerCase() == 'br' ) {
				// When the user has their cursor in the "blank" space
				// represented by a br, the selection object is actually in the
				// block level element (usually the body.wym_iframe) above it.
				// To represent where on the block level element, the anchor
				// offset is used. Offsets are 0-indexed based on the direct
				// children
				var sel = wymeditor._iframe.contentWindow.getSelection();
				var range = wymeditor._doc.createRange();
				range.setStart( element.parentNode, index );
				range.setEnd( element.parentNode, index );

				sel.removeAllRanges();
				sel.addRange( range );

				$(wymeditor._doc).trigger(event);
			}

			checkLayout($body);
		});

		// Reset the HTML
		wymeditor.html(pTablePHtml);
		wymeditor.fixBodyHtml();

		// Go through each top-level element and hit the UP key
		$body.children().each( function (index, element) {
			moveSelector(wymeditor, element);

			// Simulate and send the keyup event
			var event = $.Event('keyup');
			event.keyCode = 38; //UP
			event.metaKey = false;
			event.ctrlKey = false;
			$(wymeditor._doc).trigger(event);

			checkLayout($body);
		});
	});

	test("br spacers stay in place when content is inserted", function() {
		// A br should remain in necessary spots even after content is inserted
		// there. Duplicate brs should also not be created when inserting that
		// content.
		var wymeditor = jQuery.wymeditors(0);
		wymeditor.html(pTablePHtml);
		wymeditor.fixBodyHtml();

		var $body = $(wymeditor._doc).find('body.wym_iframe');
		var children = $body.children();

		expect(7);
		equals( children.length, 5 );
		if ( children.length == 5 ) {
			equals( children[0].tagName.toLowerCase(), 'p' );
			equals( children[1].tagName.toLowerCase(), 'br' );
			equals( children[2].tagName.toLowerCase(), 'table' );
			equals( children[3].tagName.toLowerCase(), 'br' );
			equals( children[4].tagName.toLowerCase(), 'p' );
		}

		equals( wymeditor.xhtml(), pTablePHtml );
	});
}