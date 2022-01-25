const slugify = require('@sindresorhus/slugify');
const outdent = require('outdent');
const md = require('markdown-it')();

/**
 * @param {string} markdown - String of Markdown
 * @returns {string} HTML string
 */
function render(markdown) {
	return md.render(markdown).replace('<p>', '').replace('</p>', '').trim();
}
/**
 * Takes an object description of a chatbox node and produces some HTML to document it.
 *
 * @param {ChatboxNode} chatboxNode - Node object to format as HTML
 * @param {number} [depth=0] - Nesting level for this particular node
 * @returns {string} HTML string documenting this node
 */
module.exports = function formatStyleHooksDocsTable(chatboxNode, depth = 0) {
	const nodeId = slugify(chatboxNode.name);

	const attributeRows = chatboxNode.attributes
		?.map((attr) => {
			const attrId = slugify(attr.name);
			return outdent(String.raw`
				<tr id="${attrId}">
					<td>
						<code>
							<a href="#${attrId}">
								${attr.name}
							</a>
						</code>
					</td>
					<td>${render(attr.present || '')}</td>
					<td>${render(attr.value || '')}</td>
					<td>${attr.use?.map(render).join('<br /><br />') || ''}</td>
				</tr>
			`);
		})
		.join('\n');

	const attributesTable =
		chatboxNode.attributes &&
		outdent(String.raw`
		<table>
			<caption>Attributes for <code>${render(chatboxNode.name)}</code></caption>
			<thead>
				<tr>
					<th scope="col">Attribute</th>
					<th scope="col">Present</th>
					<th scope="col">Value</th>
					<th scope="col">Use</th>
				</tr>
			</thead>
			<tbody>
				${attributeRows ?? ''}
			</tbody>
		</table>
	`);

	return outdent(String.raw`
		<section id="${nodeId}" aria-labelledby="heading-${nodeId}">
			<h${3 + depth} id="heading-${nodeId}">
				<code>
									<a href="#${nodeId}">
										${render(chatboxNode.name)}
									</a>
								</code>
			</h${3 + depth}>
			<p>${render(chatboxNode.description)}</p>
			${attributesTable}
			${
				chatboxNode.children?.map((child) =>
					formatStyleHooksDocsTable(child, depth + 1)
				) ?? ''
			}
		</section>
	`);
};

/**
 * @typedef {object} ChatboxNode - Object which represents style hook documentation for a node in the chatbox
 * @property {string} name - Name of node (likely a simplified version of the node's markup) which can be used in headings and captions
 * @property {string} description - Description of node
 * @property {Attribute[]} [attributes] - List of attributes which can be found on the given element. The main "identifying" attribute should be first, and the rest should be arranged alphabetically.
 * @property {ClassName[]} [classes] - CSS classes applied to element. Should be arranged alphabetically.
 * @property {ChatboxNode[]} [children] - Representation of style hook documentation for any child elements within the current element. Should be arranged in DOM order.
 */

/**
 * @typedef {object} Attribute - Object which describes an attribute (typically a data attribute) which can be found on a given node.
 * @property {string} name - Attribute name
 * @property {string} present - Descriptions of conditions under which this attribute will be applied to the given element.
 * @property {string} value - Description of possible values this attribute could take
 * @property {string[]} use - Descriptions of possible ways this style hook could be used as a selector (each string is its own line)
 */

/**
 * @typedef {object} ClassName - Object which describes a CSS class which can be found on a given node.
 * @property {string} name - CSS class name
 * @property {string} present - Descriptions of conditions under which this class will be applied to the given element.
 * @property {string} value - Description of possible values this class could take
 * @property {string[]} use - Descriptions of possible ways this style hook could be used as a selector (each string is its own line)
 */
