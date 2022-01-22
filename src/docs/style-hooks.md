---
layout: page.html
---

<!-- markdownlint-disable MD033 -->
<!-- (disable rule preventing inline elements) -->

# Style Hooks for Themes

**Themes have a lot of information at their disposal that they can use to create a unique feel.** This page aims to document what all of these different style hooks are, and how you might use them to great effect in your own themes.

## Approach

### Provide As Much Information As Possible, As High Up As Possible

We want to give themes as much flexibility as possible to style an overlay with. As a result, showmy.chat adds a _lot_ of style hooks to each message. Additionally, because CSS cascades down and [hasn't had a parent selector until recently](https://www.bram.us/2021/12/21/the-css-has-selector-is-way-more-than-a-parent-selector/), these style hooks are added to the highest applicable element — for instance, information about whether a sender is a subscriber is applied to the whole message, and not just the node with the sender's username.

### Favor Data Attributes For Style Hooks

[Data attributes make for powerful style hooks.](https://css-tricks.com/a-complete-guide-to-data-attributes/#aa-styling-with-data-attributes) You can use attribute selectors to…

- Check that the attribute exists at all (`[data-twitch-message]`)
- Check that the attribute's value is equal to something (`[data-twitch-emote="LUL"]`)
- Check that the attribute's value is equal to something case-insensitively (`[data-twitch-sender="nightbot" i]`)
- Check that the attribute's value contains a given word (`[data-twitch-sender-roles~="subscriber"]`)

…And more!

This flexibility makes data selectors really ideal for giving themes the tools they need to customize an overlay's appearance, and the required explicit association between the data attribute's name and value makes themes more self-documenting. Because of this, showmy.chat favors adding style hooks to elements in the form of data attributes where possible.

## Markup and Style Hooks

{% assign rootNode = styleHooks[0] %}
{% formatStyleHooksDocsTable rootNode, 0 %}

<style>
 th[scope='col'] {
  font-weight: bold;
  text-align: center;
  position: sticky !important;
  top: -2px;
  background-color: var(--background-color);
 }

 tr:target {
  background-color: var(--muted-border-color);
  scroll-margin-top: 3em;
 }

 tr:hover {
  background-color: var(--switch-background-color);
 }

 section {
  padding-inline-start: 2em;
  border-inline-start: 2px solid var(--muted-border-color);
 }
 section section {
  margin-inline-start: 2em;
  margin-block-start: 4em;
 }

 caption, caption * {
  font-weight: bold;
 }

 td:first-of-type, td:first-of-type * {
 width: max-content;
 }
</style>
