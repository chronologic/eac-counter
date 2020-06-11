[<img src="https://s3.amazonaws.com/chronologic.network/ChronoLogic_logo.svg" width="128px">](https://github.com/chronologic)

[![npm version](https://badge.fury.io/js/eac-counter.svg)](https://badge.fury.io/js/eac-counter)

# EAC Counter

A library that fetches the amount of ETH (and USD) transferred using the Ethereum Alarm Clock.

## Installation

`npm install eac-counter`

## Usage

```js
import EacCounter from 'eac-counter';
const eacCounter = new EacCounter({
  // Needed for fetching amount of USD transferred, get an API key from https://nomics.com/
  nomicsApiKey: '<nomics_api_key>',
  // Needed for fetching amount of ETH transferred, get an API key from https://etherscan.io/
  etherscanApiKey: '<etherscan_api_key>',
});

// Optional: Needed to fetch the amount of USD transferred
await eacCounter.enableUSDFetching();

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
const eacCounter = new EacCounter({
  nomicsApiKey: '<nomics_api_key>',
  etherscanApiKey: '<etherscan_api_key>',
});
eacCounter.enableUSDFetching().then(function () {
  eacCounter.getTotalTransferred().then(function (value) {
    console.log(value.eth);
    console.log(value.usd);
  });
});
```
