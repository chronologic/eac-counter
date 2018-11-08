# EAC Counter

A library that fetches the amount of ETH transferred using the Ethereum Alarm Clock.

## Installation

`npm install eac-counter`

## Usage

```js
import EacCounter from 'eac-counter';
const counter = await EacCounter.getTotalEthTransferred();
```

## Browser usage

To use this library in the browser, download and import the [browser-compatible file](dist/eac-counter.browser.js) into your HTML file.

```html
<script src="eac-counter.browser.js"></script>
```

This will expose the `EacCounter` to the window object. You can then use the following code to fetch the counter:

```js
EacCounter.getTotalEthTransferred().then(function (value) {
  console.log(value);
});
```
