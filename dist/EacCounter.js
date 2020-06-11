"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.array.find");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/es6.date.to-iso-string");

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var moment = require('moment');

var EacCounter =
/*#__PURE__*/
function () {
  function EacCounter() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        nomicsApiKey = _ref.nomicsApiKey,
        etherscanApiKey = _ref.etherscanApiKey;

    (0, _classCallCheck2.default)(this, EacCounter);
    this.ethToUsdAtTimestampValues = null;
    this._canFetchUSD = false;
    this._nomicsApiKey = nomicsApiKey;
    this._etherscanApiKey = etherscanApiKey;
  }
  /**
   * Enables the API for fetching USD values from the Nomics API.
   * @param {string} apiKey Nomics API key that will be used for fetching (required).
   */


  (0, _createClass2.default)(EacCounter, [{
    key: "enableUSDFetching",
    value: function () {
      var _enableUSDFetching = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(apiKey) {
        var startDate, url, ethToUsdAtTimestampValues;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                startDate = moment.unix(1535068800); // Unix timestamp for August 24 2018 (contract creation)

                url = "https://api.nomics.com/v1/exchange-rates/history?key=".concat(apiKey || this._nomicsApiKey, "&currency=ETH&start=").concat(startDate.toISOString());
                _context2.prev = 2;
                _context2.next = 5;
                return fetch(url).then(
                /*#__PURE__*/
                function () {
                  var _ref2 = (0, _asyncToGenerator2.default)(
                  /*#__PURE__*/
                  _regenerator.default.mark(function _callee(resp) {
                    return _regenerator.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return resp.json();

                          case 2:
                            return _context.abrupt("return", _context.sent);

                          case 3:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function (_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }());

              case 5:
                ethToUsdAtTimestampValues = _context2.sent;
                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](2);
                console.log('Unable to fetch the amount of transferred USD.');
                return _context2.abrupt("return");

              case 12:
                this.ethToUsdAtTimestampValues = ethToUsdAtTimestampValues;
                this._canFetchUSD = true;

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 8]]);
      }));

      return function enableUSDFetching(_x) {
        return _enableUSDFetching.apply(this, arguments);
      };
    }()
  }, {
    key: "getUsdValueAtTime",
    value: function getUsdValueAtTime(weiAmount, timestamp) {
      var ethAmount = weiAmount / 1e18;
      var txDate = moment.unix(timestamp).utc();
      var roundTxDate = txDate.startOf('day');
      var timePeriod = this.ethToUsdAtTimestampValues.find(function (timePeriod) {
        return timePeriod.timestamp === roundTxDate.format('YYYY-MM-DD[T]HH:mm:ss[Z]');
      });

      if (timePeriod === undefined) {
        console.log("Unable to fetch rate for date ".concat(roundTxDate.toString()));
        return 0;
      }

      return parseFloat(timePeriod.rate) * parseFloat(ethAmount);
    }
  }, {
    key: "getTotalTransferred",
    value: function () {
      var _getTotalTransferred = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee4() {
        var _this = this;

        var totalEthTransferred, totalUsdTransferred, baseUrl, timestampSchedulerUrl, blockSchedulerUrl, urls, promises, values;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                totalEthTransferred = null;
                totalUsdTransferred = null;
                baseUrl = "https://api.etherscan.io/api?module=account&action=txlist&startblock=0&endblock=99999999&sort=asc&apiKey=".concat(this._etherscanApiKey);
                timestampSchedulerUrl = "".concat(baseUrl, "&address=0x09e0c54ed4cffca45d691d5eb7b976d650f5904c");
                blockSchedulerUrl = "".concat(baseUrl, "&address=0x56efae8a6d07fb29c24e67d76f3eccac180cf527");
                urls = [timestampSchedulerUrl, blockSchedulerUrl];
                promises = [];
                urls.forEach(function (url) {
                  var resultPromise = fetch(url).then(
                  /*#__PURE__*/
                  function () {
                    var _ref3 = (0, _asyncToGenerator2.default)(
                    /*#__PURE__*/
                    _regenerator.default.mark(function _callee3(resp) {
                      var response, weiTransferred, usdTransferred;
                      return _regenerator.default.wrap(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              _context3.next = 2;
                              return resp.json();

                            case 2:
                              response = _context3.sent;

                              if (!(response.status == '1' && response.message === 'OK')) {
                                _context3.next = 9;
                                break;
                              }

                              weiTransferred = response.result.reduce(function (acc, tx) {
                                return acc + parseInt(tx.value);
                              }, 0);
                              usdTransferred = _this._canFetchUSD ? response.result.reduce(function (acc, tx) {
                                return acc + _this.getUsdValueAtTime(tx.value, tx.timeStamp);
                              }, 0) : null;
                              return _context3.abrupt("return", {
                                eth: weiTransferred / 1e18,
                                usd: usdTransferred
                              });

                            case 9:
                              throw Error(response.result);

                            case 10:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      }, _callee3, this);
                    }));

                    return function (_x3) {
                      return _ref3.apply(this, arguments);
                    };
                  }());
                  promises.push(resultPromise);
                });
                _context4.prev = 8;
                _context4.next = 11;
                return Promise.all(promises);

              case 11:
                values = _context4.sent;
                totalEthTransferred = values.reduce(function (acc, value) {
                  return acc + parseFloat(value.eth);
                }, 0);

                if (this._canFetchUSD) {
                  totalUsdTransferred = values.reduce(function (acc, value) {
                    return acc + parseFloat(value.usd);
                  }, 0);
                }

                _context4.next = 20;
                break;

              case 16:
                _context4.prev = 16;
                _context4.t0 = _context4["catch"](8);
                console.error(_context4.t0);
                console.error('Unable to connect to Etherscan and fetch EAC statistics.');

              case 20:
                return _context4.abrupt("return", {
                  eth: totalEthTransferred,
                  usd: totalUsdTransferred
                });

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[8, 16]]);
      }));

      return function getTotalTransferred() {
        return _getTotalTransferred.apply(this, arguments);
      };
    }()
  }]);
  return EacCounter;
}();

module.exports = EacCounter;