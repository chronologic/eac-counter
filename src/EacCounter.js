const moment = require('moment');

class EacCounter {
  constructor() {
    this.ethToUsdAtTimestampValues = null;
    this._canFetchUSD = false;
  }

  /**
    * Enables the API for fetching USD values from the Nomics API.
    * @param {string} apiKey Nomics API key that will be used for fetching (required).
    */
  async enableUSDFetching(apiKey) {
    const startDate = moment.unix(1535068800); // Unix timestamp for August 24 2018 (contract creation)

    const url = `https://api.nomics.com/v1/exchange-rates/history?key=${apiKey}&currency=ETH&start=${startDate.toISOString()}`;

    let ethToUsdAtTimestampValues;

    try {
      ethToUsdAtTimestampValues = await fetch(url).then(async (resp) => await resp.json());
    } catch (e) {
      console.log('Unable to fetch the amount of transferred USD.');
      return;
    }

    this.ethToUsdAtTimestampValues = ethToUsdAtTimestampValues;
    this._canFetchUSD = true;
  }

  getUsdValueAtTime(weiAmount, timestamp) {
    const ethAmount = weiAmount / 1e18;
    const txDate = moment.unix(timestamp).utc();

    const roundTxDate = txDate.startOf('day');

    const timePeriod = this.ethToUsdAtTimestampValues.find(timePeriod => timePeriod.timestamp === roundTxDate.format('YYYY-MM-DD[T]HH:mm:ss[Z]'));

    if (timePeriod === undefined) {
      console.log(`Unable to fetch rate for date ${roundTxDate.toString()}`)
      return 0;
    }

    return parseFloat(timePeriod.rate) * parseFloat(ethAmount);
  }

  async getTotalTransferred() {
    let totalEthTransferred = null;
    let totalUsdTransferred = null;

    const baseUrl = `https://api.etherscan.io/api?module=account&action=txlist&startblock=0&endblock=99999999&sort=asc`;
    const timestampSchedulerUrl = `${baseUrl}&address=0x09e0c54ed4cffca45d691d5eb7b976d650f5904c`;
    const blockSchedulerUrl = `${baseUrl}&address=0x56efae8a6d07fb29c24e67d76f3eccac180cf527`;

    const urls = [timestampSchedulerUrl, blockSchedulerUrl];

    let promises = [];

    urls.forEach(url => {
      const resultPromise = fetch(url).then(async (resp) => {
        const response = await resp.json();

        if (response.status == '1' && response.message === 'OK') {
          const weiTransferred = response.result.reduce((acc, tx) => acc + parseInt(tx.value), 0);
          const usdTransferred = this._canFetchUSD ? response.result.reduce((acc, tx) => acc + this.getUsdValueAtTime(tx.value, tx.timeStamp), 0) : null;

          return {
            eth: weiTransferred / 1e18,
            usd: usdTransferred
          };
        } else {
          throw Error(response.result);
        }
      });
      promises.push(resultPromise);
    });

    try {
      const values = await Promise.all(promises);
      totalEthTransferred = values.reduce((acc, value) => acc + parseFloat(value.eth), 0);
      if (this._canFetchUSD) {
        totalUsdTransferred = values.reduce((acc, value) => acc + parseFloat(value.usd), 0);
      }
    } catch (e) {
      console.error(e)
      console.error('Unable to connect to Etherscan and fetch EAC statistics.');
    }

    return {
      eth: totalEthTransferred,
      usd: totalUsdTransferred
    };
  }
}

module.exports = EacCounter;
