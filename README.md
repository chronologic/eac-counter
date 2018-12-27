[<img src="https://s3.amazonaws.com/chronologic.network/ChronoLogic_logo.svg" width="128px">](https://github.com/chronologic)

[![npm version](https://badge.fury.io/js/eac-counter.svg)](https://badge.fury.io/js/eac-counter)

# EAC Counter

A library that fetches the amount of ETH transferred using the Ethereum Alarm Clock.

## Installation

`npm install eac-counter`

## Usage

```js
import EacCounter from 'eac-counter';
const eacCounter = new EacCounter();

// Optional: Needed to fetch the amount of USD transferred
// To use this, first get an API key from https://nomics.com/
await eacCounter.enableUSDFetching('<nomics_api_key>');

const { eth, usd } = await eacCounter.getTotalTransferred();
console.log(eth);
console.log(usd); // This will be null if enableUSDFetching() is not called
```

## Browser usage

To use this library in the browser, download and import the [browser-compatible file](dist/eac-counter.browser.js) into your HTML file.

```html
<script src="eac-counter.browser.js"></script>
```

This will expose the `EacCounter` to the window object. You can then use the following code to fetch the counter:

```js
const eacCounter = new EacCounter();	
eacCounter.enableUSDFetching('<nomics_api_key>').then(function () {
  eacCounter.getTotalTransferred().then(function (value) {
    console.log(value.eth)
    console.log(value.usd)
  });
});
```
