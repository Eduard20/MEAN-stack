# Text-to-speech (TTS) API provider for Node.js

This is a module to access Voice RSS TTS API.

	npm install voice-rss-tts

## Example

```js
tts = require('voice-rss-tts');

tts.speech({
	key: '<API key>',
    src: 'Hello, World!',
    hl: 'en-us',
	ssl: true,
	callback: function (error, content) {
		console.log(error || content);
	}
});
```

**For more detailed description please visit http://www.voicerss.org/api/documentation.aspx**