class EacCounter {
  static async getTotalEthTransferred() {
    const baseUrl = `http://api.etherscan.io/api?module=account&action=txlist&startblock=0&endblock=99999999&sort=asc`;
    const timestampSchedulerUrl = `${baseUrl}&address=0x09e0c54ed4cffca45d691d5eb7b976d650f5904c`;
    const blockSchedulerUrl = `${baseUrl}&address=0x56efae8a6d07fb29c24e67d76f3eccac180cf527`;

    const urls = [timestampSchedulerUrl, blockSchedulerUrl];

    let promises = [];

    urls.forEach(url => {
      const resultPromise = fetch(url).then(async (resp) => {
        const response = await resp.json();

        if (response.status == "1" && response.message === "OK") {
          const weiTransferred = response.result.reduce((acc, tx) => acc + parseInt(tx.value), 0);
          return weiTransferred / 1e18;
        } else {
          throw Error(response.result);
        }
      });
      promises.push(resultPromise);
    });

    const values = await Promise.all(promises);
    const totalEthTransferred = values.reduce((acc, value) => acc + parseFloat(value), 0);

    return totalEthTransferred;
  }
}

module.exports = EacCounter;