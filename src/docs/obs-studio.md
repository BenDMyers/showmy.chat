---
title: Display a Twitch chat overlay on stream in OBS Studio
description: Set up a showmy.chat Twitch chat overlay in OBS studio in just a few minutes!
---

The [OBS Studio](https://obsproject.com/) broadcasting software provides a lot of flexibility for Twitch streamers who want to get their custom setup exactly right. With showmy.chat's plug-and-play setup, you can add a chat overlay to your OBS scenes in minutes!

---

## <small class="eyebrow">Step 1</small> Get a chat overlay URL with showmy.chat.

Go through the [quick and easy overlay builder on our homepage](/), picking a theme and choosing the settings that are right for you and your stream. When you're done, **copy the generated URL at the end**.

---

## <small class="eyebrow">Step 2</small> Add the chat overlay to your OBS scenes.

1. Open OBS and open a scene you want to display your chat overlay on.
2. In your **Sources** pane, click the **+** button to add a new scene.
3. Choose **Browser** from the list of source types.
   ![A selection menu has opened up from the plus button in OBS Studio's Sources pane, listing different kinds of sources that can be added such as audio, display capture, images, video capture, and more. The Browser option is highlighted.](/assets/obs-docs/obs-docs-4.png)
4. Make sure that the **Create new** radio button is selected. Name the scene something like "Chat Overlay," and click **OK**.
   ![A modal dialog offers the choice to create new or add existing. "Create new" is selected, and the new scene is set to be named "Chat Overlay." A checkbox labeled "Make source visible" is checked.](/assets/obs-docs/obs-docs-5.png)
5. Paste your generated overlay URL in the **URL** field.
   ![A modal dialog provides fields for browser source properties. The URL is filled out, and the width and height are set to 600 and 800 respectively.](/assets/obs-docs/obs-docs-6.png)
6. Choose a width and a height that make an aspect ratio that you like. Themes should work at most dimensions you need, but many of them look great at around a width of 600 and a height of 800.
7. Click **OK** to save your source.

---

## <small class="eyebrow">Step 3</small> Tweak and troubleshoot.

When you add your overlay to OBS, your browser source will likely be blank to start out with. This is because your overlay is waiting for chat messages on your channel, and unless you're live, you probably don't have active chatters at the moment. There are a **few different ways you can show messages while you work** so you can tweak your overlay with confidence:

- Append `&DEMO=true` to the end of your browser source URL to display a constant stream of randomly generated chat messages
- Go to your own channel on Twitch and send messages in your chat
- Replace your channel's name in the overlay URL with a large channel that's streaming right now to display their chat

If you go with the first or third options, remember to **revert the changes to your overlay URL before you go live**.

---

## <small class="eyebrow">Step 4</small> Go live!

**That's all there is to it!** The next time you go live, your OBS scenes will display your Twitch chat in real time!

---

<style>
	li {
		margin-bottom: 1.5em;
	}

	li img {
		display: block;
		margin: 1em auto;
		width: 90%;
	}

	ul > li::marker {
		color: var(--primary);
	}

	p code,
	li code {
		user-select: all;
	}
</style>
