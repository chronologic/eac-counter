"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EacCounter =
/*#__PURE__*/
function () {
  function EacCounter() {
    _classCallCheck(this, EacCounter);
  }

  _createClass(EacCounter, null, [{
    key: "getTotalEthTransferred",
    value: function () {
      var _getTotalEthTransferred = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var baseUrl, timestampSchedulerUrl, blockSchedulerUrl, urls, promises, values, totalEthTransferred;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
                    var _ref = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee(resp) {
                      var response, weiTransferred;
                      return regeneratorRuntime.wrap(function _callee$(_context) {
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