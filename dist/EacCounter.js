"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var EacCounter =
/*#__PURE__*/
function () {
  function EacCounter() {
    (0, _classCallCheck2.default)(this, EacCounter);
  }

  (0, _createClass2.default)(EacCounter, null, [{
    key: "getTotalEthTransferred",
    value: function () {
      var _getTotalEthTransferred = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2() {
        var baseUrl, timestampSchedulerUrl, blockSchedulerUrl, urls, promises, values, totalEthTransferred;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                baseUrl = "http://api.etherscan.io/api?module=account&action=txlist&startblock=0&endblock=99999999&sort=asc";
                timestampSchedulerUrl = "".concat(baseUrl, "&address=0x09e0c54ed4cffca45d691d5eb7b976d650f5904c");
                blockSchedulerUrl = "".concat(baseUrl, "&address=0x56efae8a6d07fb29c24e67d76f3eccac180cf527");
                urls = [timestampSchedulerUrl, blockSchedulerUrl];
                promises = [];
                urls.forEach(function (url) {
                  var resultPromise = fetch(url).then(
                  /*#__PURE__*/
                  function () {
                    var _ref = (0, _asyncToGenerator2.default)(
                    /*#__PURE__*/
                    _regenerator.default.mark(function _callee(resp) {
                      var response, weiTransferred;
                      return _regenerator.default.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return resp.json();

                            case 2:
                              response = _context.sent;

                              if (!(response.status == "1" && response.message === "OK")) {
                                _context.next = 8;
                                break;
                              }

                              weiTransferred = response.result.reduce(function (acc, tx) {
                                return acc + parseInt(tx.value);
                              }, 0);
                              return _context.abrupt("return", weiTransferred / 1e18);

                            case 8:
                              throw Error(response.result);

                            case 9:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee, this);
                    }));

                    return function (_x) {
                      return _ref.apply(this, arguments);
                    };
                  }());
                  promises.push(resultPromise);
                });
                _context2.next = 8;
                return Promise.all(promises);

              case 8:
                values = _context2.sent;
                totalEthTransferred = values.reduce(function (acc, value) {
                  return acc + parseFloat(value);
                }, 0);
                return _context2.abrupt("return", totalEthTransferred);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function getTotalEthTransferred() {
        return _getTotalEthTransferred.apply(this, arguments);
      };
    }()
  }]);
  return EacCounter;
}();

module.exports = EacCounter;