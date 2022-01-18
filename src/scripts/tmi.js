(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var client = require('./lib/client');

module.exports = {
  client: client,
  Client: client
};

},{"./lib/client":3}],2:[function(require,module,exports){
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fetch = require('node-fetch');

var _ = require('./utils');

module.exports = function api(options, callback) {
  // Set the url to options.uri or options.url..
  var url = options.url !== undefined ? options.url : options.uri; // Make sure it is a valid url..

  if (!_.isURL(url)) {
    url = "https://api.twitch.tv/kraken".concat(url[0] === '/' ? url : "/".concat(url));
  } // We are inside a Node application, so we can use the node-fetch module..


  if (_.isNode()) {
    var opts = Object.assign({
      method: 'GET',
      json: true
    }, options);

    if (opts.qs) {
      var qs = new URLSearchParams(opts.qs);
      url += "?".concat(qs);
    }
    /** @type {import('node-fetch').RequestInit} */


    var fetchOptions = {};

    if ('fetchAgent' in this.opts.connection) {
      fetchOptions.agent = this.opts.connection.fetchAgent;
    }
    /** @type {ReturnType<import('node-fetch')['default']>} */


    var fetchPromise = fetch(url, _objectSpread(_objectSpread({}, fetchOptions), {}, {
      method: opts.method,
      headers: opts.headers,
      body: opts.body
    }));
    var response = {};
    fetchPromise.then(function (res) {
      response = {
        statusCode: res.status,
        headers: res.headers
      };
      return opts.json ? res.json() : res.text();
    }).then(function (data) {
      return callback(null, response, data);
    }, function (err) {
      return callback(err, response, null);
    });
  } // Web application, extension, React Native etc.
  else {
    var _opts = Object.assign({
      method: 'GET',
      headers: {}
    }, options, {
      url: url
    }); // prepare request


    var xhr = new XMLHttpRequest();
    xhr.open(_opts.method, _opts.url, true);

    for (var name in _opts.headers) {
      xhr.setRequestHeader(name, _opts.headers[name]);
    }

    xhr.responseType = 'json'; // set request handler

    xhr.addEventListener('load', function (_ev) {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          callback(xhr.status, null, null);
        } else {
          callback(null, null, xhr.response);
        }
      }
    }); // submit

    xhr.send();
  }
};

},{"./utils":9,"node-fetch":10}],3:[function(require,module,exports){
(function (global){(function (){
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _global = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};

var _WebSocket = _global.WebSocket || require('ws');

var _fetch = _global.fetch || require('node-fetch');

var api = require('./api');

var commands = require('./commands');

var EventEmitter = require('./events').EventEmitter;

var logger = require('./logger');

var parse = require('./parser');

var Queue = require('./timer');

var _ = require('./utils');

var _apiWarned = false; // Client instance..

var client = function client(opts) {
  if (this instanceof client === false) {
    return new client(opts);
  }

  this.opts = _.get(opts, {});
  this.opts.channels = this.opts.channels || [];
  this.opts.connection = this.opts.connection || {};
  this.opts.identity = this.opts.identity || {};
  this.opts.options = this.opts.options || {};
  this.clientId = _.get(this.opts.options.clientId, null);
  this._globalDefaultChannel = _.channel(_.get(this.opts.options.globalDefaultChannel, '#tmijs'));
  this._skipMembership = _.get(this.opts.options.skipMembership, false);
  this._skipUpdatingEmotesets = _.get(this.opts.options.skipUpdatingEmotesets, false);
  this._updateEmotesetsTimer = null;
  this._updateEmotesetsTimerDelay = _.get(this.opts.options.updateEmotesetsTimer, 60000);
  this.maxReconnectAttempts = _.get(this.opts.connection.maxReconnectAttempts, Infinity);
  this.maxReconnectInterval = _.get(this.opts.connection.maxReconnectInterval, 30000);
  this.reconnect = _.get(this.opts.connection.reconnect, true);
  this.reconnectDecay = _.get(this.opts.connection.reconnectDecay, 1.5);
  this.reconnectInterval = _.get(this.opts.connection.reconnectInterval, 1000);
  this.reconnecting = false;
  this.reconnections = 0;
  this.reconnectTimer = this.reconnectInterval;
  this.secure = _.get(this.opts.connection.secure, !this.opts.connection.server && !this.opts.connection.port); // Raw data and object for emote-sets..

  this.emotes = '';
  this.emotesets = {};
  this.channels = [];
  this.currentLatency = 0;
  this.globaluserstate = {};
  this.lastJoined = '';
  this.latency = new Date();
  this.moderators = {};
  this.pingLoop = null;
  this.pingTimeout = null;
  this.reason = '';
  this.username = '';
  this.userstate = {};
  this.wasCloseCalled = false;
  this.ws = null; // Create the logger..

  var level = 'error';

  if (this.opts.options.debug) {
    level = 'info';
  }

  this.log = this.opts.logger || logger;

  try {
    logger.setLevel(level);
  } catch (err) {} // Format the channel names..


  this.opts.channels.forEach(function (part, index, theArray) {
    return theArray[index] = _.channel(part);
  });
  EventEmitter.call(this);
  this.setMaxListeners(0);
};

_.inherits(client, EventEmitter); // Put all commands in prototype..


for (var methodName in commands) {
  client.prototype[methodName] = commands[methodName];
} // Emit multiple events..


client.prototype.emits = function emits(types, values) {
  for (var i = 0; i < types.length; i++) {
    var val = i < values.length ? values[i] : values[values.length - 1];
    this.emit.apply(this, [types[i]].concat(val));
  }
};
/** @deprecated */


client.prototype.api = function () {
  if (!_apiWarned) {
    this.log.warn('Client.prototype.api is deprecated and will be removed for version 2.0.0');
    _apiWarned = true;
  }

  api.apply(void 0, arguments);
}; // Handle parsed chat server message..


client.prototype.handleMessage = function handleMessage(message) {
  var _this = this;

  if (!message) {
    return;
  }

  if (this.listenerCount('raw_message')) {
    this.emit('raw_message', JSON.parse(JSON.stringify(message)), message);
  }

  var channel = _.channel(_.get(message.params[0], null));

  var msg = _.get(message.params[1], null);

  var msgid = _.get(message.tags['msg-id'], null); // Parse badges, badge-info and emotes..


  var tags = message.tags = parse.badges(parse.badgeInfo(parse.emotes(message.tags))); // Transform IRCv3 tags..

  for (var key in tags) {
    if (key === 'emote-sets' || key === 'ban-duration' || key === 'bits') {
      continue;
    }

    var value = tags[key];

    if (typeof value === 'boolean') {
      value = null;
    } else if (value === '1') {
      value = true;
    } else if (value === '0') {
      value = false;
    } else if (typeof value === 'string') {
      value = _.unescapeIRC(value);
    }

    tags[key] = value;
  } // Messages with no prefix..


  if (message.prefix === null) {
    switch (message.command) {
      // Received PING from server..
      case 'PING':
        this.emit('ping');

        if (this._isConnected()) {
          this.ws.send('PONG');
        }

        break;
      // Received PONG from server, return current latency..

      case 'PONG':
        {
          var currDate = new Date();
          this.currentLatency = (currDate.getTime() - this.latency.getTime()) / 1000;
          this.emits(['pong', '_promisePing'], [[this.currentLatency]]);
          clearTimeout(this.pingTimeout);
          break;
        }

      default:
        this.log.warn("Could not parse message with no prefix:\n".concat(JSON.stringify(message, null, 4)));
        break;
    }
  } // Messages with "tmi.twitch.tv" as a prefix..
  else if (message.prefix === 'tmi.twitch.tv') {
    switch (message.command) {
      case '002':
      case '003':
      case '004':
      case '372':
      case '375':
      case 'CAP':
        break;
      // Retrieve username from server..

      case '001':
        this.username = message.params[0];
        break;
      // Connected to server..

      case '376':
        {
          this.log.info('Connected to server.');
          this.userstate[this._globalDefaultChannel] = {};
          this.emits(['connected', '_promiseConnect'], [[this.server, this.port], [null]]);
          this.reconnections = 0;
          this.reconnectTimer = this.reconnectInterval; // Set an internal ping timeout check interval..

          this.pingLoop = setInterval(function () {
            // Make sure the connection is opened before sending the message..
            if (_this._isConnected()) {
              _this.ws.send('PING');
            }

            _this.latency = new Date();
            _this.pingTimeout = setTimeout(function () {
              if (_this.ws !== null) {
                _this.wasCloseCalled = false;

                _this.log.error('Ping timeout.');

                _this.ws.close();

                clearInterval(_this.pingLoop);
                clearTimeout(_this.pingTimeout);
                clearTimeout(_this._updateEmotesetsTimer);
              }
            }, _.get(_this.opts.connection.timeout, 9999));
          }, 60000); // Join all the channels from the config with an interval..

          var joinInterval = _.get(this.opts.options.joinInterval, 2000);

          if (joinInterval < 300) {
            joinInterval = 300;
          }

          var joinQueue = new Queue(joinInterval);

          var joinChannels = _toConsumableArray(new Set([].concat(_toConsumableArray(this.opts.channels), _toConsumableArray(this.channels))));

          this.channels = [];

          var _loop = function _loop(i) {
            var channel = joinChannels[i];
            joinQueue.add(function () {
              if (_this._isConnected()) {
                _this.join(channel)["catch"](function (err) {
                  return _this.log.error(err);
                });
              }
            });
          };

          for (var i = 0; i < joinChannels.length; i++) {
            _loop(i);
          }

          joinQueue.next();
          break;
        }
      // https://github.com/justintv/Twitch-API/blob/master/chat/capabilities.md#notice

      case 'NOTICE':
        {
          var nullArr = [null];
          var noticeArr = [channel, msgid, msg];
          var msgidArr = [msgid];
          var channelTrueArr = [channel, true];
          var channelFalseArr = [channel, false];
          var noticeAndNull = [noticeArr, nullArr];
          var noticeAndMsgid = [noticeArr, msgidArr];
          var basicLog = "[".concat(channel, "] ").concat(msg);

          switch (msgid) {
            // This room is now in subscribers-only mode.
            case 'subs_on':
              this.log.info("[".concat(channel, "] This room is now in subscribers-only mode."));
              this.emits(['subscriber', 'subscribers', '_promiseSubscribers'], [channelTrueArr, channelTrueArr, nullArr]);
              break;
            // This room is no longer in subscribers-only mode.

            case 'subs_off':
              this.log.info("[".concat(channel, "] This room is no longer in subscribers-only mode."));
              this.emits(['subscriber', 'subscribers', '_promiseSubscribersoff'], [channelFalseArr, channelFalseArr, nullArr]);
              break;
            // This room is now in emote-only mode.

            case 'emote_only_on':
              this.log.info("[".concat(channel, "] This room is now in emote-only mode."));
              this.emits(['emoteonly', '_promiseEmoteonly'], [channelTrueArr, nullArr]);
              break;
            // This room is no longer in emote-only mode.

            case 'emote_only_off':
              this.log.info("[".concat(channel, "] This room is no longer in emote-only mode."));
              this.emits(['emoteonly', '_promiseEmoteonlyoff'], [channelFalseArr, nullArr]);
              break;
            // Do not handle slow_on/off here, listen to the ROOMSTATE notice instead as it returns the delay.

            case 'slow_on':
            case 'slow_off':
              break;
            // Do not handle followers_on/off here, listen to the ROOMSTATE notice instead as it returns the delay.

            case 'followers_on_zero':
            case 'followers_on':
            case 'followers_off':
              break;
            // This room is now in r9k mode.

            case 'r9k_on':
              this.log.info("[".concat(channel, "] This room is now in r9k mode."));
              this.emits(['r9kmode', 'r9kbeta', '_promiseR9kbeta'], [channelTrueArr, channelTrueArr, nullArr]);
              break;
            // This room is no longer in r9k mode.

            case 'r9k_off':
              this.log.info("[".concat(channel, "] This room is no longer in r9k mode."));
              this.emits(['r9kmode', 'r9kbeta', '_promiseR9kbetaoff'], [channelFalseArr, channelFalseArr, nullArr]);
              break;
            // The moderators of this room are: [..., ...]

            case 'room_mods':
              {
                var listSplit = msg.split(': ');
                var mods = (listSplit.length > 1 ? listSplit[1] : '').toLowerCase().split(', ').filter(function (n) {
                  return n;
                });
                this.emits(['_promiseMods', 'mods'], [[null, mods], [channel, mods]]);
                break;
              }
            // There are no moderators for this room.

            case 'no_mods':
              this.emits(['_promiseMods', 'mods'], [[null, []], [channel, []]]);
              break;
            // The VIPs of this channel are: [..., ...]

            case 'vips_success':
              {
                if (msg.endsWith('.')) {
                  msg = msg.slice(0, -1);
                }

                var _listSplit = msg.split(': ');

                var vips = (_listSplit.length > 1 ? _listSplit[1] : '').toLowerCase().split(', ').filter(function (n) {
                  return n;
                });
                this.emits(['_promiseVips', 'vips'], [[null, vips], [channel, vips]]);
                break;
              }
            // There are no VIPs for this room.

            case 'no_vips':
              this.emits(['_promiseVips', 'vips'], [[null, []], [channel, []]]);
              break;
            // Ban command failed..

            case 'already_banned':
            case 'bad_ban_admin':
            case 'bad_ban_anon':
            case 'bad_ban_broadcaster':
            case 'bad_ban_global_mod':
            case 'bad_ban_mod':
            case 'bad_ban_self':
            case 'bad_ban_staff':
            case 'usage_ban':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseBan'], noticeAndMsgid);
              break;
            // Ban command success..

            case 'ban_success':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseBan'], noticeAndNull);
              break;
            // Clear command failed..

            case 'usage_clear':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseClear'], noticeAndMsgid);
              break;
            // Mods command failed..

            case 'usage_mods':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseMods'], [noticeArr, [msgid, []]]);
              break;
            // Mod command success..

            case 'mod_success':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseMod'], noticeAndNull);
              break;
            // VIPs command failed..

            case 'usage_vips':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseVips'], [noticeArr, [msgid, []]]);
              break;
            // VIP command failed..

            case 'usage_vip':
            case 'bad_vip_grantee_banned':
            case 'bad_vip_grantee_already_vip':
            case 'bad_vip_max_vips_reached':
            case 'bad_vip_achievement_incomplete':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseVip'], [noticeArr, [msgid, []]]);
              break;
            // VIP command success..

            case 'vip_success':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseVip'], noticeAndNull);
              break;
            // Mod command failed..

            case 'usage_mod':
            case 'bad_mod_banned':
            case 'bad_mod_mod':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseMod'], noticeAndMsgid);
              break;
            // Unmod command success..

            case 'unmod_success':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseUnmod'], noticeAndNull);
              break;
            // Unvip command success...

            case 'unvip_success':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseUnvip'], noticeAndNull);
              break;
            // Unmod command failed..

            case 'usage_unmod':
            case 'bad_unmod_mod':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseUnmod'], noticeAndMsgid);
              break;
            // Unvip command failed..

            case 'usage_unvip':
            case 'bad_unvip_grantee_not_vip':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseUnvip'], noticeAndMsgid);
              break;
            // Color command success..

            case 'color_changed':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseColor'], noticeAndNull);
              break;
            // Color command failed..

            case 'usage_color':
            case 'turbo_only_color':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseColor'], noticeAndMsgid);
              break;
            // Commercial command success..

            case 'commercial_success':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseCommercial'], noticeAndNull);
              break;
            // Commercial command failed..

            case 'usage_commercial':
            case 'bad_commercial_error':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseCommercial'], noticeAndMsgid);
              break;
            // Host command success..

            case 'hosts_remaining':
              {
                this.log.info(basicLog);
                var remainingHost = !isNaN(msg[0]) ? parseInt(msg[0]) : 0;
                this.emits(['notice', '_promiseHost'], [noticeArr, [null, ~~remainingHost]]);
                break;
              }
            // Host command failed..

            case 'bad_host_hosting':
            case 'bad_host_rate_exceeded':
            case 'bad_host_error':
            case 'usage_host':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseHost'], [noticeArr, [msgid, null]]);
              break;
            // r9kbeta command failed..

            case 'already_r9k_on':
            case 'usage_r9k_on':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseR9kbeta'], noticeAndMsgid);
              break;
            // r9kbetaoff command failed..

            case 'already_r9k_off':
            case 'usage_r9k_off':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseR9kbetaoff'], noticeAndMsgid);
              break;
            // Timeout command success..

            case 'timeout_success':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseTimeout'], noticeAndNull);
              break;

            case 'delete_message_success':
              this.log.info("[".concat(channel, " ").concat(msg, "]"));
              this.emits(['notice', '_promiseDeletemessage'], noticeAndNull);
              break;
            // Subscribersoff command failed..

            case 'already_subs_off':
            case 'usage_subs_off':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseSubscribersoff'], noticeAndMsgid);
              break;
            // Subscribers command failed..

            case 'already_subs_on':
            case 'usage_subs_on':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseSubscribers'], noticeAndMsgid);
              break;
            // Emoteonlyoff command failed..

            case 'already_emote_only_off':
            case 'usage_emote_only_off':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseEmoteonlyoff'], noticeAndMsgid);
              break;
            // Emoteonly command failed..

            case 'already_emote_only_on':
            case 'usage_emote_only_on':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseEmoteonly'], noticeAndMsgid);
              break;
            // Slow command failed..

            case 'usage_slow_on':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseSlow'], noticeAndMsgid);
              break;
            // Slowoff command failed..

            case 'usage_slow_off':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseSlowoff'], noticeAndMsgid);
              break;
            // Timeout command failed..

            case 'usage_timeout':
            case 'bad_timeout_admin':
            case 'bad_timeout_anon':
            case 'bad_timeout_broadcaster':
            case 'bad_timeout_duration':
            case 'bad_timeout_global_mod':
            case 'bad_timeout_mod':
            case 'bad_timeout_self':
            case 'bad_timeout_staff':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseTimeout'], noticeAndMsgid);
              break;
            // Unban command success..
            // Unban can also be used to cancel an active timeout.

            case 'untimeout_success':
            case 'unban_success':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseUnban'], noticeAndNull);
              break;
            // Unban command failed..

            case 'usage_unban':
            case 'bad_unban_no_ban':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseUnban'], noticeAndMsgid);
              break;
            // Delete command failed..

            case 'usage_delete':
            case 'bad_delete_message_error':
            case 'bad_delete_message_broadcaster':
            case 'bad_delete_message_mod':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseDeletemessage'], noticeAndMsgid);
              break;
            // Unhost command failed..

            case 'usage_unhost':
            case 'not_hosting':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseUnhost'], noticeAndMsgid);
              break;
            // Whisper command failed..

            case 'whisper_invalid_login':
            case 'whisper_invalid_self':
            case 'whisper_limit_per_min':
            case 'whisper_limit_per_sec':
            case 'whisper_restricted':
            case 'whisper_restricted_recipient':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseWhisper'], noticeAndMsgid);
              break;
            // Permission error..

            case 'no_permission':
            case 'msg_banned':
            case 'msg_room_not_found':
            case 'msg_channel_suspended':
            case 'tos_ban':
            case 'invalid_user':
              this.log.info(basicLog);
              this.emits(['notice', '_promiseBan', '_promiseClear', '_promiseUnban', '_promiseTimeout', '_promiseDeletemessage', '_promiseMods', '_promiseMod', '_promiseUnmod', '_promiseVips', '_promiseVip', '_promiseUnvip', '_promiseCommercial', '_promiseHost', '_promiseUnhost', '_promiseJoin', '_promisePart', '_promiseR9kbeta', '_promiseR9kbetaoff', '_promiseSlow', '_promiseSlowoff', '_promiseFollowers', '_promiseFollowersoff', '_promiseSubscribers', '_promiseSubscribersoff', '_promiseEmoteonly', '_promiseEmoteonlyoff', '_promiseWhisper'], [noticeArr, [msgid, channel]]);
              break;
            // Automod-related..

            case 'msg_rejected':
            case 'msg_rejected_mandatory':
              this.log.info(basicLog);
              this.emit('automod', channel, msgid, msg);
              break;
            // Unrecognized command..

            case 'unrecognized_cmd':
              this.log.info(basicLog);
              this.emit('notice', channel, msgid, msg);
              break;
            // Send the following msg-ids to the notice event listener..

            case 'cmds_available':
            case 'host_target_went_offline':
            case 'msg_censored_broadcaster':
            case 'msg_duplicate':
            case 'msg_emoteonly':
            case 'msg_verified_email':
            case 'msg_ratelimit':
            case 'msg_subsonly':
            case 'msg_timedout':
            case 'msg_bad_characters':
            case 'msg_channel_blocked':
            case 'msg_facebook':
            case 'msg_followersonly':
            case 'msg_followersonly_followed':
            case 'msg_followersonly_zero':
            case 'msg_slowmode':
            case 'msg_suspended':
            case 'no_help':
            case 'usage_disconnect':
            case 'usage_help':
            case 'usage_me':
            case 'unavailable_command':
              this.log.info(basicLog);
              this.emit('notice', channel, msgid, msg);
              break;
            // Ignore this because we are already listening to HOSTTARGET..

            case 'host_on':
            case 'host_off':
              break;

            default:
              if (msg.includes('Login unsuccessful') || msg.includes('Login authentication failed')) {
                this.wasCloseCalled = false;
                this.reconnect = false;
                this.reason = msg;
                this.log.error(this.reason);
                this.ws.close();
              } else if (msg.includes('Error logging in') || msg.includes('Improperly formatted auth')) {
                this.wasCloseCalled = false;
                this.reconnect = false;
                this.reason = msg;
                this.log.error(this.reason);
                this.ws.close();
              } else if (msg.includes('Invalid NICK')) {
                this.wasCloseCalled = false;
                this.reconnect = false;
                this.reason = 'Invalid NICK.';
                this.log.error(this.reason);
                this.ws.close();
              } else {
                this.log.warn("Could not parse NOTICE from tmi.twitch.tv:\n".concat(JSON.stringify(message, null, 4)));
                this.emit('notice', channel, msgid, msg);
              }

              break;
          }

          break;
        }
      // Handle subanniversary / resub..

      case 'USERNOTICE':
        {
          var username = tags['display-name'] || tags['login'];
          var plan = tags['msg-param-sub-plan'] || '';
          var planName = _.unescapeIRC(_.get(tags['msg-param-sub-plan-name'], '')) || null;
          var prime = plan.includes('Prime');
          var methods = {
            prime: prime,
            plan: plan,
            planName: planName
          };
          var streakMonths = ~~(tags['msg-param-streak-months'] || 0);
          var recipient = tags['msg-param-recipient-display-name'] || tags['msg-param-recipient-user-name'];
          var giftSubCount = ~~tags['msg-param-mass-gift-count'];
          tags['message-type'] = msgid;

          switch (msgid) {
            // Handle resub
            case 'resub':
              this.emits(['resub', 'subanniversary'], [[channel, username, streakMonths, msg, tags, methods]]);
              break;
            // Handle sub

            case 'sub':
              this.emits(['subscription', 'sub'], [[channel, username, methods, msg, tags]]);
              break;
            // Handle gift sub

            case 'subgift':
              this.emit('subgift', channel, username, streakMonths, recipient, methods, tags);
              break;
            // Handle anonymous gift sub
            // Need proof that this event occur

            case 'anonsubgift':
              this.emit('anonsubgift', channel, streakMonths, recipient, methods, tags);
              break;
            // Handle random gift subs

            case 'submysterygift':
              this.emit('submysterygift', channel, username, giftSubCount, methods, tags);
              break;
            // Handle anonymous random gift subs
            // Need proof that this event occur

            case 'anonsubmysterygift':
              this.emit('anonsubmysterygift', channel, giftSubCount, methods, tags);
              break;
            // Handle user upgrading from Prime to a normal tier sub

            case 'primepaidupgrade':
              this.emit('primepaidupgrade', channel, username, methods, tags);
              break;
            // Handle user upgrading from a gifted sub

            case 'giftpaidupgrade':
              {
                var sender = tags['msg-param-sender-name'] || tags['msg-param-sender-login'];
                this.emit('giftpaidupgrade', channel, username, sender, tags);
                break;
              }
            // Handle user upgrading from an anonymous gifted sub

            case 'anongiftpaidupgrade':
              this.emit('anongiftpaidupgrade', channel, username, tags);
              break;
            // Handle raid

            case 'raid':
              {
                var _username = tags['msg-param-displayName'] || tags['msg-param-login'];

                var viewers = +tags['msg-param-viewerCount'];
                this.emit('raided', channel, _username, viewers, tags);
                break;
              }
            // Handle ritual

            case 'ritual':
              {
                var ritualName = tags['msg-param-ritual-name'];

                switch (ritualName) {
                  // Handle new chatter ritual
                  case 'new_chatter':
                    this.emit('newchatter', channel, username, tags, msg);
                    break;
                  // All unknown rituals should be passed through

                  default:
                    this.emit('ritual', ritualName, channel, username, tags, msg);
                    break;
                }

                break;
              }
            // All other msgid events should be emitted under a usernotice event
            // until it comes up and needs to be added..

            default:
              this.emit('usernotice', msgid, channel, tags, msg);
              break;
          }

          break;
        }
      // Channel is now hosting another channel or exited host mode..

      case 'HOSTTARGET':
        {
          var msgSplit = msg.split(' ');

          var _viewers = ~~msgSplit[1] || 0; // Stopped hosting..


          if (msgSplit[0] === '-') {
            this.log.info("[".concat(channel, "] Exited host mode."));
            this.emits(['unhost', '_promiseUnhost'], [[channel, _viewers], [null]]);
          } // Now hosting..
          else {
            this.log.info("[".concat(channel, "] Now hosting ").concat(msgSplit[0], " for ").concat(_viewers, " viewer(s)."));
            this.emit('hosting', channel, msgSplit[0], _viewers);
          }

          break;
        }
      // Someone has been timed out or chat has been cleared by a moderator..

      case 'CLEARCHAT':
        // User has been banned / timed out by a moderator..
        if (message.params.length > 1) {
          // Duration returns null if it's a ban, otherwise it's a timeout..
          var duration = _.get(message.tags['ban-duration'], null);

          if (duration === null) {
            this.log.info("[".concat(channel, "] ").concat(msg, " has been banned."));
            this.emit('ban', channel, msg, null, message.tags);
          } else {
            this.log.info("[".concat(channel, "] ").concat(msg, " has been timed out for ").concat(duration, " seconds."));
            this.emit('timeout', channel, msg, null, ~~duration, message.tags);
          }
        } // Chat was cleared by a moderator..
        else {
          this.log.info("[".concat(channel, "] Chat was cleared by a moderator."));
          this.emits(['clearchat', '_promiseClear'], [[channel], [null]]);
        }

        break;
      // Someone's message has been deleted

      case 'CLEARMSG':
        if (message.params.length > 1) {
          var deletedMessage = msg;
          var _username2 = tags['login'];
          tags['message-type'] = 'messagedeleted';
          this.log.info("[".concat(channel, "] ").concat(_username2, "'s message has been deleted."));
          this.emit('messagedeleted', channel, _username2, deletedMessage, tags);
        }

        break;
      // Received a reconnection request from the server..

      case 'RECONNECT':
        this.log.info('Received RECONNECT request from Twitch..');
        this.log.info("Disconnecting and reconnecting in ".concat(Math.round(this.reconnectTimer / 1000), " seconds.."));
        this.disconnect()["catch"](function (err) {
          return _this.log.error(err);
        });
        setTimeout(function () {
          return _this.connect()["catch"](function (err) {
            return _this.log.error(err);
          });
        }, this.reconnectTimer);
        break;
      // Received when joining a channel and every time you send a PRIVMSG to a channel.

      case 'USERSTATE':
        message.tags.username = this.username; // Add the client to the moderators of this room..

        if (message.tags['user-type'] === 'mod') {
          if (!this.moderators[channel]) {
            this.moderators[channel] = [];
          }

          if (!this.moderators[channel].includes(this.username)) {
            this.moderators[channel].push(this.username);
          }
        } // Logged in and username doesn't start with justinfan..


        if (!_.isJustinfan(this.getUsername()) && !this.userstate[channel]) {
          this.userstate[channel] = tags;
          this.lastJoined = channel;
          this.channels.push(channel);
          this.log.info("Joined ".concat(channel));
          this.emit('join', channel, _.username(this.getUsername()), true);
        } // Emote-sets has changed, update it..


        if (message.tags['emote-sets'] !== this.emotes) {
          this._updateEmoteset(message.tags['emote-sets']);
        }

        this.userstate[channel] = tags;
        break;
      // Describe non-channel-specific state informations..

      case 'GLOBALUSERSTATE':
        this.globaluserstate = tags;
        this.emit('globaluserstate', tags); // Received emote-sets..

        if (typeof message.tags['emote-sets'] !== 'undefined') {
          this._updateEmoteset(message.tags['emote-sets']);
        }

        break;
      // Received when joining a channel and every time one of the chat room settings, like slow mode, change.
      // The message on join contains all room settings.

      case 'ROOMSTATE':
        // We use this notice to know if we successfully joined a channel..
        if (_.channel(this.lastJoined) === channel) {
          this.emit('_promiseJoin', null, channel);
        } // Provide the channel name in the tags before emitting it..


        message.tags.channel = channel;
        this.emit('roomstate', channel, message.tags);

        if (!_.hasOwn(message.tags, 'subs-only')) {
          // Handle slow mode here instead of the slow_on/off notice..
          // This room is now in slow mode. You may send messages every slow_duration seconds.
          if (_.hasOwn(message.tags, 'slow')) {
            if (typeof message.tags.slow === 'boolean' && !message.tags.slow) {
              var disabled = [channel, false, 0];
              this.log.info("[".concat(channel, "] This room is no longer in slow mode."));
              this.emits(['slow', 'slowmode', '_promiseSlowoff'], [disabled, disabled, [null]]);
            } else {
              var seconds = ~~message.tags.slow;
              var enabled = [channel, true, seconds];
              this.log.info("[".concat(channel, "] This room is now in slow mode."));
              this.emits(['slow', 'slowmode', '_promiseSlow'], [enabled, enabled, [null]]);
            }
          } // Handle followers only mode here instead of the followers_on/off notice..
          // This room is now in follower-only mode.
          // This room is now in <duration> followers-only mode.
          // This room is no longer in followers-only mode.
          // duration is in minutes (string)
          // -1 when /followersoff (string)
          // false when /followers with no duration (boolean)


          if (_.hasOwn(message.tags, 'followers-only')) {
            if (message.tags['followers-only'] === '-1') {
              var _disabled = [channel, false, 0];
              this.log.info("[".concat(channel, "] This room is no longer in followers-only mode."));
              this.emits(['followersonly', 'followersmode', '_promiseFollowersoff'], [_disabled, _disabled, [null]]);
            } else {
              var minutes = ~~message.tags['followers-only'];
              var _enabled = [channel, true, minutes];
              this.log.info("[".concat(channel, "] This room is now in follower-only mode."));
              this.emits(['followersonly', 'followersmode', '_promiseFollowers'], [_enabled, _enabled, [null]]);
            }
          }
        }

        break;
      // Wrong cluster..

      case 'SERVERCHANGE':
        break;

      default:
        this.log.warn("Could not parse message from tmi.twitch.tv:\n".concat(JSON.stringify(message, null, 4)));
        break;
    }
  } // Messages from jtv..
  else if (message.prefix === 'jtv') {
    switch (message.command) {
      case 'MODE':
        if (msg === '+o') {
          // Add username to the moderators..
          if (!this.moderators[channel]) {
            this.moderators[channel] = [];
          }

          if (!this.moderators[channel].includes(message.params[2])) {
            this.moderators[channel].push(message.params[2]);
          }

          this.emit('mod', channel, message.params[2]);
        } else if (msg === '-o') {
          // Remove username from the moderators..
          if (!this.moderators[channel]) {
            this.moderators[channel] = [];
          }

          this.moderators[channel].filter(function (value) {
            return value !== message.params[2];
          });
          this.emit('unmod', channel, message.params[2]);
        }

        break;

      default:
        this.log.warn("Could not parse message from jtv:\n".concat(JSON.stringify(message, null, 4)));
        break;
    }
  } // Anything else..
  else {
    switch (message.command) {
      case '353':
        this.emit('names', message.params[2], message.params[3].split(' '));
        break;

      case '366':
        break;
      // Someone has joined the channel..

      case 'JOIN':
        {
          var nick = message.prefix.split('!')[0]; // Joined a channel as a justinfan (anonymous) user..

          if (_.isJustinfan(this.getUsername()) && this.username === nick) {
            this.lastJoined = channel;
            this.channels.push(channel);
            this.log.info("Joined ".concat(channel));
            this.emit('join', channel, nick, true);
          } // Someone else joined the channel, just emit the join event..


          if (this.username !== nick) {
            this.emit('join', channel, nick, false);
          }

          break;
        }
      // Someone has left the channel..

      case 'PART':
        {
          var isSelf = false;
          var _nick = message.prefix.split('!')[0]; // Client left a channel..

          if (this.username === _nick) {
            isSelf = true;

            if (this.userstate[channel]) {
              delete this.userstate[channel];
            }

            var index = this.channels.indexOf(channel);

            if (index !== -1) {
              this.channels.splice(index, 1);
            }

            index = this.opts.channels.indexOf(channel);

            if (index !== -1) {
              this.opts.channels.splice(index, 1);
            }

            this.log.info("Left ".concat(channel));
            this.emit('_promisePart', null);
          } // Client or someone else left the channel, emit the part event..


          this.emit('part', channel, _nick, isSelf);
          break;
        }
      // Received a whisper..

      case 'WHISPER':
        {
          var _nick2 = message.prefix.split('!')[0];
          this.log.info("[WHISPER] <".concat(_nick2, ">: ").concat(msg)); // Update the tags to provide the username..

          if (!_.hasOwn(message.tags, 'username')) {
            message.tags.username = _nick2;
          }

          message.tags['message-type'] = 'whisper';

          var from = _.channel(message.tags.username); // Emit for both, whisper and message..


          this.emits(['whisper', 'message'], [[from, message.tags, msg, false]]);
          break;
        }

      case 'PRIVMSG':
        // Add username (lowercase) to the tags..
        message.tags.username = message.prefix.split('!')[0]; // Message from JTV..

        if (message.tags.username === 'jtv') {
          var name = _.username(msg.split(' ')[0]);

          var autohost = msg.includes('auto'); // Someone is hosting the channel and the message contains how many viewers..

          if (msg.includes('hosting you for')) {
            var count = _.extractNumber(msg);

            this.emit('hosted', channel, name, count, autohost);
          } // Some is hosting the channel, but no viewer(s) count provided in the message..
          else if (msg.includes('hosting you')) {
            this.emit('hosted', channel, name, 0, autohost);
          }
        } else {
          var messagesLogLevel = _.get(this.opts.options.messagesLogLevel, 'info'); // Message is an action (/me <message>)..


          var actionMessage = _.actionMessage(msg);

          message.tags['message-type'] = actionMessage ? 'action' : 'chat';
          msg = actionMessage ? actionMessage[1] : msg; // Check for Bits prior to actions message

          if (_.hasOwn(message.tags, 'bits')) {
            this.emit('cheer', channel, message.tags, msg);
          } else {
            //Handle Channel Point Redemptions (Require's Text Input)
            if (_.hasOwn(message.tags, 'msg-id')) {
              if (message.tags['msg-id'] === 'highlighted-message') {
                var rewardtype = message.tags['msg-id'];
                this.emit('redeem', channel, message.tags.username, rewardtype, message.tags, msg);
              } else if (message.tags['msg-id'] === 'skip-subs-mode-message') {
                var _rewardtype = message.tags['msg-id'];
                this.emit('redeem', channel, message.tags.username, _rewardtype, message.tags, msg);
              }
            } else if (_.hasOwn(message.tags, 'custom-reward-id')) {
              var _rewardtype2 = message.tags['custom-reward-id'];
              this.emit('redeem', channel, message.tags.username, _rewardtype2, message.tags, msg);
            }

            if (actionMessage) {
              this.log[messagesLogLevel]("[".concat(channel, "] *<").concat(message.tags.username, ">: ").concat(msg));
              this.emits(['action', 'message'], [[channel, message.tags, msg, false]]);
            } // Message is a regular chat message..
            else {
              this.log[messagesLogLevel]("[".concat(channel, "] <").concat(message.tags.username, ">: ").concat(msg));
              this.emits(['chat', 'message'], [[channel, message.tags, msg, false]]);
            }
          }
        }

        break;

      default:
        this.log.warn("Could not parse message:\n".concat(JSON.stringify(message, null, 4)));
        break;
    }
  }
}; // Connect to server..


client.prototype.connect = function connect() {
  var _this2 = this;

  return new Promise(function (resolve, reject) {
    _this2.server = _.get(_this2.opts.connection.server, 'irc-ws.chat.twitch.tv');
    _this2.port = _.get(_this2.opts.connection.port, 80); // Override port if using a secure connection..

    if (_this2.secure) {
      _this2.port = 443;
    }

    if (_this2.port === 443) {
      _this2.secure = true;
    }

    _this2.reconnectTimer = _this2.reconnectTimer * _this2.reconnectDecay;

    if (_this2.reconnectTimer >= _this2.maxReconnectInterval) {
      _this2.reconnectTimer = _this2.maxReconnectInterval;
    } // Connect to server from configuration..


    _this2._openConnection();

    _this2.once('_promiseConnect', function (err) {
      if (!err) {
        resolve([_this2.server, ~~_this2.port]);
      } else {
        reject(err);
      }
    });
  });
}; // Open a connection..


client.prototype._openConnection = function _openConnection() {
  var url = "".concat(this.secure ? 'wss' : 'ws', "://").concat(this.server, ":").concat(this.port, "/");
  /** @type {import('ws').ClientOptions} */

  var connectionOptions = {};

  if ('agent' in this.opts.connection) {
    connectionOptions.agent = this.opts.connection.agent;
  }

  this.ws = new _WebSocket(url, 'irc', connectionOptions);
  this.ws.onmessage = this._onMessage.bind(this);
  this.ws.onerror = this._onError.bind(this);
  this.ws.onclose = this._onClose.bind(this);
  this.ws.onopen = this._onOpen.bind(this);
}; // Called when the WebSocket connection's readyState changes to OPEN.
// Indicates that the connection is ready to send and receive data..


client.prototype._onOpen = function _onOpen() {
  var _this3 = this;

  if (!this._isConnected()) {
    return;
  } // Emitting "connecting" event..


  this.log.info("Connecting to ".concat(this.server, " on port ").concat(this.port, ".."));
  this.emit('connecting', this.server, ~~this.port);
  this.username = _.get(this.opts.identity.username, _.justinfan());

  this._getToken().then(function (token) {
    var password = _.password(token); // Emitting "logon" event..


    _this3.log.info('Sending authentication to server..');

    _this3.emit('logon');

    var caps = 'twitch.tv/tags twitch.tv/commands';

    if (!_this3._skipMembership) {
      caps += ' twitch.tv/membership';
    }

    _this3.ws.send('CAP REQ :' + caps); // Authentication..


    if (password) {
      _this3.ws.send("PASS ".concat(password));
    } else if (_.isJustinfan(_this3.username)) {
      _this3.ws.send('PASS SCHMOOPIIE');
    }

    _this3.ws.send("NICK ".concat(_this3.username));
  })["catch"](function (err) {
    _this3.emits(['_promiseConnect', 'disconnected'], [[err], ['Could not get a token.']]);
  });
}; // Fetches a token from the option.


client.prototype._getToken = function _getToken() {
  var passwordOption = this.opts.identity.password;
  var password;

  if (typeof passwordOption === 'function') {
    password = passwordOption();

    if (password instanceof Promise) {
      return password;
    }

    return Promise.resolve(password);
  }

  return Promise.resolve(passwordOption);
}; // Called when a message is received from the server..


client.prototype._onMessage = function _onMessage(event) {
  var _this4 = this;

  var parts = event.data.trim().split('\r\n');
  parts.forEach(function (str) {
    var msg = parse.msg(str);

    if (msg) {
      _this4.handleMessage(msg);
    }
  });
}; // Called when an error occurs..


client.prototype._onError = function _onError() {
  var _this5 = this;

  this.moderators = {};
  this.userstate = {};
  this.globaluserstate = {}; // Stop the internal ping timeout check interval..

  clearInterval(this.pingLoop);
  clearTimeout(this.pingTimeout);
  clearTimeout(this._updateEmotesetsTimer);
  this.reason = this.ws === null ? 'Connection closed.' : 'Unable to connect.';
  this.emits(['_promiseConnect', 'disconnected'], [[this.reason]]); // Reconnect to server..

  if (this.reconnect && this.reconnections === this.maxReconnectAttempts) {
    this.emit('maxreconnect');
    this.log.error('Maximum reconnection attempts reached.');
  }

  if (this.reconnect && !this.reconnecting && this.reconnections <= this.maxReconnectAttempts - 1) {
    this.reconnecting = true;
    this.reconnections = this.reconnections + 1;
    this.log.error("Reconnecting in ".concat(Math.round(this.reconnectTimer / 1000), " seconds.."));
    this.emit('reconnect');
    setTimeout(function () {
      _this5.reconnecting = false;

      _this5.connect()["catch"](function (err) {
        return _this5.log.error(err);
      });
    }, this.reconnectTimer);
  }

  this.ws = null;
}; // Called when the WebSocket connection's readyState changes to CLOSED..


client.prototype._onClose = function _onClose() {
  var _this6 = this;

  this.moderators = {};
  this.userstate = {};
  this.globaluserstate = {}; // Stop the internal ping timeout check interval..

  clearInterval(this.pingLoop);
  clearTimeout(this.pingTimeout);
  clearTimeout(this._updateEmotesetsTimer); // User called .disconnect(), don't try to reconnect.

  if (this.wasCloseCalled) {
    this.wasCloseCalled = false;
    this.reason = 'Connection closed.';
    this.log.info(this.reason);
    this.emits(['_promiseConnect', '_promiseDisconnect', 'disconnected'], [[this.reason], [null], [this.reason]]);
  } // Got disconnected from server..
  else {
    this.emits(['_promiseConnect', 'disconnected'], [[this.reason]]); // Reconnect to server..

    if (this.reconnect && this.reconnections === this.maxReconnectAttempts) {
      this.emit('maxreconnect');
      this.log.error('Maximum reconnection attempts reached.');
    }

    if (this.reconnect && !this.reconnecting && this.reconnections <= this.maxReconnectAttempts - 1) {
      this.reconnecting = true;
      this.reconnections = this.reconnections + 1;
      this.log.error("Could not connect to server. Reconnecting in ".concat(Math.round(this.reconnectTimer / 1000), " seconds.."));
      this.emit('reconnect');
      setTimeout(function () {
        _this6.reconnecting = false;

        _this6.connect()["catch"](function (err) {
          return _this6.log.error(err);
        });
      }, this.reconnectTimer);
    }
  }

  this.ws = null;
}; // Minimum of 600ms for command promises, if current latency exceeds, add 100ms to it to make sure it doesn't get timed out..


client.prototype._getPromiseDelay = function _getPromiseDelay() {
  if (this.currentLatency <= 600) {
    return 600;
  } else {
    return this.currentLatency + 100;
  }
}; // Send command to server or channel..


client.prototype._sendCommand = function _sendCommand(delay, channel, command, fn) {
  var _this7 = this;

  // Race promise against delay..
  return new Promise(function (resolve, reject) {
    // Make sure the socket is opened..
    if (!_this7._isConnected()) {
      // Disconnected from server..
      return reject('Not connected to server.');
    } else if (delay === null || typeof delay === 'number') {
      if (delay === null) {
        delay = _this7._getPromiseDelay();
      }

      _.promiseDelay(delay).then(function () {
        return reject('No response from Twitch.');
      });
    } // Executing a command on a channel..


    if (channel !== null) {
      var chan = _.channel(channel);

      _this7.log.info("[".concat(chan, "] Executing command: ").concat(command));

      _this7.ws.send("PRIVMSG ".concat(chan, " :").concat(command));
    } // Executing a raw command..
    else {
      _this7.log.info("Executing command: ".concat(command));

      _this7.ws.send(command);
    }

    if (typeof fn === 'function') {
      fn(resolve, reject);
    } else {
      resolve();
    }
  });
}; // Send a message to channel..


client.prototype._sendMessage = function _sendMessage(delay, channel, message, fn) {
  var _this8 = this;

  // Promise a result..
  return new Promise(function (resolve, reject) {
    // Make sure the socket is opened and not logged in as a justinfan user..
    if (!_this8._isConnected()) {
      return reject('Not connected to server.');
    } else if (_.isJustinfan(_this8.getUsername())) {
      return reject('Cannot send anonymous messages.');
    }

    var chan = _.channel(channel);

    if (!_this8.userstate[chan]) {
      _this8.userstate[chan] = {};
    } // Split long lines otherwise they will be eaten by the server..


    if (message.length >= 500) {
      var msg = _.splitLine(message, 500);

      message = msg[0];
      setTimeout(function () {
        _this8._sendMessage(delay, channel, msg[1], function () {});
      }, 350);
    }

    _this8.ws.send("PRIVMSG ".concat(chan, " :").concat(message));

    var emotes = {}; // Parse regex and string emotes..

    Object.keys(_this8.emotesets).forEach(function (id) {
      return _this8.emotesets[id].forEach(function (emote) {
        var emoteFunc = _.isRegex(emote.code) ? parse.emoteRegex : parse.emoteString;
        return emoteFunc(message, emote.code, emote.id, emotes);
      });
    }); // Merge userstate with parsed emotes..

    var userstate = Object.assign(_this8.userstate[chan], parse.emotes({
      emotes: parse.transformEmotes(emotes) || null
    }));

    var messagesLogLevel = _.get(_this8.opts.options.messagesLogLevel, 'info'); // Message is an action (/me <message>)..


    var actionMessage = _.actionMessage(message);

    if (actionMessage) {
      userstate['message-type'] = 'action';

      _this8.log[messagesLogLevel]("[".concat(chan, "] *<").concat(_this8.getUsername(), ">: ").concat(actionMessage[1]));

      _this8.emits(['action', 'message'], [[chan, userstate, actionMessage[1], true]]);
    } // Message is a regular chat message..
    else {
      userstate['message-type'] = 'chat';

      _this8.log[messagesLogLevel]("[".concat(chan, "] <").concat(_this8.getUsername(), ">: ").concat(message));

      _this8.emits(['chat', 'message'], [[chan, userstate, message, true]]);
    }

    if (typeof fn === 'function') {
      fn(resolve, reject);
    } else {
      resolve();
    }
  });
}; // Grab the emote-sets object from the API..


client.prototype._updateEmoteset = function _updateEmoteset(sets) {
  var _this9 = this;

  var setsChanges = sets !== undefined;

  if (setsChanges) {
    if (sets === this.emotes) {
      setsChanges = false;
    } else {
      this.emotes = sets;
    }
  }

  if (this._skipUpdatingEmotesets) {
    if (setsChanges) {
      this.emit('emotesets', sets, {});
    }

    return;
  }

  var setEmotesetTimer = function setEmotesetTimer() {
    if (_this9._updateEmotesetsTimerDelay > 0) {
      clearTimeout(_this9._updateEmotesetsTimer);
      _this9._updateEmotesetsTimer = setTimeout(function () {
        return _this9._updateEmoteset(sets);
      }, _this9._updateEmotesetsTimerDelay);
    }
  };

  this._getToken().then(function (token) {
    var url = "https://api.twitch.tv/kraken/chat/emoticon_images?emotesets=".concat(sets);
    /** @type {import('node-fetch').RequestInit} */

    var fetchOptions = {};

    if ('fetchAgent' in _this9.opts.connection) {
      fetchOptions.agent = _this9.opts.connection.fetchAgent;
    }
    /** @type {import('node-fetch').Response} */


    return _fetch(url, _objectSpread(_objectSpread({}, fetchOptions), {}, {
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Authorization': "OAuth ".concat(_.token(token)),
        'Client-ID': _this9.clientId
      }
    }));
  }).then(function (res) {
    return res.json();
  }).then(function (data) {
    _this9.emotesets = data.emoticon_sets || {};

    _this9.emit('emotesets', sets, _this9.emotesets);

    setEmotesetTimer();
  })["catch"](function () {
    return setEmotesetTimer();
  });
}; // Get current username..


client.prototype.getUsername = function getUsername() {
  return this.username;
}; // Get current options..


client.prototype.getOptions = function getOptions() {
  return this.opts;
}; // Get current channels..


client.prototype.getChannels = function getChannels() {
  return this.channels;
}; // Check if username is a moderator on a channel..


client.prototype.isMod = function isMod(channel, username) {
  var chan = _.channel(channel);

  if (!this.moderators[chan]) {
    this.moderators[chan] = [];
  }

  return this.moderators[chan].includes(_.username(username));
}; // Get readyState..


client.prototype.readyState = function readyState() {
  if (this.ws === null) {
    return 'CLOSED';
  }

  return ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'][this.ws.readyState];
}; // Determine if the client has a WebSocket and it's open..


client.prototype._isConnected = function _isConnected() {
  return this.ws !== null && this.ws.readyState === 1;
}; // Disconnect from server..


client.prototype.disconnect = function disconnect() {
  var _this10 = this;

  return new Promise(function (resolve, reject) {
    if (_this10.ws !== null && _this10.ws.readyState !== 3) {
      _this10.wasCloseCalled = true;

      _this10.log.info('Disconnecting from server..');

      _this10.ws.close();

      _this10.once('_promiseDisconnect', function () {
        return resolve([_this10.server, ~~_this10.port]);
      });
    } else {
      _this10.log.error('Cannot disconnect from server. Socket is not opened or connection is already closing.');

      reject('Cannot disconnect from server. Socket is not opened or connection is already closing.');
    }
  });
};

client.prototype.off = client.prototype.removeListener; // Expose everything, for browser and Node..

if (typeof module !== 'undefined' && module.exports) {
  module.exports = client;
}

if (typeof window !== 'undefined') {
  window.tmi = {
    client: client,
    Client: client
  };
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./api":2,"./commands":4,"./events":5,"./logger":6,"./parser":7,"./timer":8,"./utils":9,"node-fetch":10,"ws":10}],4:[function(require,module,exports){
"use strict";

var _ = require('./utils'); // Enable followers-only mode on a channel..


function followersonly(channel, minutes) {
  var _this = this;

  channel = _.channel(channel);
  minutes = _.get(minutes, 30); // Send the command to the server and race the Promise against a delay..

  return this._sendCommand(null, channel, "/followers ".concat(minutes), function (resolve, reject) {
    // Received _promiseFollowers event, resolve or reject..
    _this.once('_promiseFollowers', function (err) {
      if (!err) {
        resolve([channel, ~~minutes]);
      } else {
        reject(err);
      }
    });
  });
} // Disable followers-only mode on a channel..


function followersonlyoff(channel) {
  var _this2 = this;

  channel = _.channel(channel); // Send the command to the server and race the Promise against a delay..

  return this._sendCommand(null, channel, '/followersoff', function (resolve, reject) {
    // Received _promiseFollowersoff event, resolve or reject..
    _this2.once('_promiseFollowersoff', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
} // Leave a channel..


function part(channel) {
  var _this3 = this;

  channel = _.channel(channel); // Send the command to the server and race the Promise against a delay..

  return this._sendCommand(null, null, "PART ".concat(channel), function (resolve, reject) {
    // Received _promisePart event, resolve or reject..
    _this3.once('_promisePart', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
} // Enable R9KBeta mode on a channel..


function r9kbeta(channel) {
  var _this4 = this;

  channel = _.channel(channel); // Send the command to the server and race the Promise against a delay..

  return this._sendCommand(null, channel, '/r9kbeta', function (resolve, reject) {
    // Received _promiseR9kbeta event, resolve or reject..
    _this4.once('_promiseR9kbeta', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
} // Disable R9KBeta mode on a channel..


function r9kbetaoff(channel) {
  var _this5 = this;

  channel = _.channel(channel); // Send the command to the server and race the Promise against a delay..

  return this._sendCommand(null, channel, '/r9kbetaoff', function (resolve, reject) {
    // Received _promiseR9kbetaoff event, resolve or reject..
    _this5.once('_promiseR9kbetaoff', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
} // Enable slow mode on a channel..


function slow(channel, seconds) {
  var _this6 = this;

  channel = _.channel(channel);
  seconds = _.get(seconds, 300); // Send the command to the server and race the Promise against a delay..

  return this._sendCommand(null, channel, "/slow ".concat(seconds), function (resolve, reject) {
    // Received _promiseSlow event, resolve or reject..
    _this6.once('_promiseSlow', function (err) {
      if (!err) {
        resolve([channel, ~~seconds]);
      } else {
        reject(err);
      }
    });
  });
} // Disable slow mode on a channel..


function slowoff(channel) {
  var _this7 = this;

  channel = _.channel(channel); // Send the command to the server and race the Promise against a delay..

  return this._sendCommand(null, channel, '/slowoff', function (resolve, reject) {
    // Received _promiseSlowoff event, resolve or reject..
    _this7.once('_promiseSlowoff', function (err) {
      if (!err) {
        resolve([channel]);
      } else {
        reject(err);
      }
    });
  });
}

module.exports = {
  // Send action message (/me <message>) on a channel..
  action: function action(channel, message) {
    channel = _.channel(channel);
    message = "\x01ACTION ".concat(message, "\x01"); // Send the command to the server and race the Promise against a delay..

    return this._sendMessage(this._getPromiseDelay(), channel, message, function (resolve, _reject) {
      // At this time, there is no possible way to detect if a message has been sent has been eaten
      // by the server, so we can only resolve the Promise.
      resolve([channel, message]);
    });
  },
  // Ban username on channel..
  ban: function ban(channel, username, reason) {
    var _this8 = this;

    channel = _.channel(channel);
    username = _.username(username);
    reason = _.get(reason, ''); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, "/ban ".concat(username, " ").concat(reason), function (resolve, reject) {
      // Received _promiseBan event, resolve or reject..
      _this8.once('_promiseBan', function (err) {
        if (!err) {
          resolve([channel, username, reason]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Clear all messages on a channel..
  clear: function clear(channel) {
    var _this9 = this;

    channel = _.channel(channel); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, '/clear', function (resolve, reject) {
      // Received _promiseClear event, resolve or reject..
      _this9.once('_promiseClear', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Change the color of your username..
  color: function color(channel, newColor) {
    var _this10 = this;

    newColor = _.get(newColor, channel); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, '#tmijs', "/color ".concat(newColor), function (resolve, reject) {
      // Received _promiseColor event, resolve or reject..
      _this10.once('_promiseColor', function (err) {
        if (!err) {
          resolve([newColor]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Run commercial on a channel for X seconds..
  commercial: function commercial(channel, seconds) {
    var _this11 = this;

    channel = _.channel(channel);
    seconds = _.get(seconds, 30); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, "/commercial ".concat(seconds), function (resolve, reject) {
      // Received _promiseCommercial event, resolve or reject..
      _this11.once('_promiseCommercial', function (err) {
        if (!err) {
          resolve([channel, ~~seconds]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Delete a specific message on a channel
  deletemessage: function deletemessage(channel, messageUUID) {
    var _this12 = this;

    channel = _.channel(channel); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, "/delete ".concat(messageUUID), function (resolve, reject) {
      // Received _promiseDeletemessage event, resolve or reject..
      _this12.once('_promiseDeletemessage', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Enable emote-only mode on a channel..
  emoteonly: function emoteonly(channel) {
    var _this13 = this;

    channel = _.channel(channel); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, '/emoteonly', function (resolve, reject) {
      // Received _promiseEmoteonly event, resolve or reject..
      _this13.once('_promiseEmoteonly', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Disable emote-only mode on a channel..
  emoteonlyoff: function emoteonlyoff(channel) {
    var _this14 = this;

    channel = _.channel(channel); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, '/emoteonlyoff', function (resolve, reject) {
      // Received _promiseEmoteonlyoff event, resolve or reject..
      _this14.once('_promiseEmoteonlyoff', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Enable followers-only mode on a channel..
  followersonly: followersonly,
  // Alias for followersonly()..
  followersmode: followersonly,
  // Disable followers-only mode on a channel..
  followersonlyoff: followersonlyoff,
  // Alias for followersonlyoff()..
  followersmodeoff: followersonlyoff,
  // Host a channel..
  host: function host(channel, target) {
    var _this15 = this;

    channel = _.channel(channel);
    target = _.username(target); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(2000, channel, "/host ".concat(target), function (resolve, reject) {
      // Received _promiseHost event, resolve or reject..
      _this15.once('_promiseHost', function (err, remaining) {
        if (!err) {
          resolve([channel, target, ~~remaining]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Join a channel..
  join: function join(channel) {
    var _this16 = this;

    channel = _.channel(channel); // Send the command to the server ..

    return this._sendCommand(undefined, null, "JOIN ".concat(channel), function (resolve, reject) {
      var eventName = '_promiseJoin';
      var hasFulfilled = false;

      var listener = function listener(err, joinedChannel) {
        if (channel === _.channel(joinedChannel)) {
          // Received _promiseJoin event for the target channel, resolve or reject..
          _this16.removeListener(eventName, listener);

          hasFulfilled = true;

          if (!err) {
            resolve([channel]);
          } else {
            reject(err);
          }
        }
      };

      _this16.on(eventName, listener); // Race the Promise against a delay..


      var delay = _this16._getPromiseDelay();

      _.promiseDelay(delay).then(function () {
        if (!hasFulfilled) {
          _this16.emit(eventName, 'No response from Twitch.', channel);
        }
      });
    });
  },
  // Mod username on channel..
  mod: function mod(channel, username) {
    var _this17 = this;

    channel = _.channel(channel);
    username = _.username(username); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, "/mod ".concat(username), function (resolve, reject) {
      // Received _promiseMod event, resolve or reject..
      _this17.once('_promiseMod', function (err) {
        if (!err) {
          resolve([channel, username]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Get list of mods on a channel..
  mods: function mods(channel) {
    var _this18 = this;

    channel = _.channel(channel); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, '/mods', function (resolve, reject) {
      // Received _promiseMods event, resolve or reject..
      _this18.once('_promiseMods', function (err, mods) {
        if (!err) {
          // Update the internal list of moderators..
          mods.forEach(function (username) {
            if (!_this18.moderators[channel]) {
              _this18.moderators[channel] = [];
            }

            if (!_this18.moderators[channel].includes(username)) {
              _this18.moderators[channel].push(username);
            }
          });
          resolve(mods);
        } else {
          reject(err);
        }
      });
    });
  },
  // Leave a channel..
  part: part,
  // Alias for part()..
  leave: part,
  // Send a ping to the server..
  ping: function ping() {
    var _this19 = this;

    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(null, null, 'PING', function (resolve, _reject) {
      // Update the internal ping timeout check interval..
      _this19.latency = new Date();
      _this19.pingTimeout = setTimeout(function () {
        if (_this19.ws !== null) {
          _this19.wasCloseCalled = false;

          _this19.log.error('Ping timeout.');

          _this19.ws.close();

          clearInterval(_this19.pingLoop);
          clearTimeout(_this19.pingTimeout);
        }
      }, _.get(_this19.opts.connection.timeout, 9999)); // Received _promisePing event, resolve or reject..

      _this19.once('_promisePing', function (latency) {
        return resolve([parseFloat(latency)]);
      });
    });
  },
  // Enable R9KBeta mode on a channel..
  r9kbeta: r9kbeta,
  // Alias for r9kbeta()..
  r9kmode: r9kbeta,
  // Disable R9KBeta mode on a channel..
  r9kbetaoff: r9kbetaoff,
  // Alias for r9kbetaoff()..
  r9kmodeoff: r9kbetaoff,
  // Send a raw message to the server..
  raw: function raw(message) {
    // Send the command to the server and race the Promise against a delay..
    return this._sendCommand(null, null, message, function (resolve, _reject) {
      resolve([message]);
    });
  },
  // Send a message on a channel..
  say: function say(channel, message) {
    channel = _.channel(channel);

    if (message.startsWith('.') && !message.startsWith('..') || message.startsWith('/') || message.startsWith('\\')) {
      // Check if the message is an action message..
      if (message.substr(1, 3) === 'me ') {
        return this.action(channel, message.substr(4));
      } else {
        // Send the command to the server and race the Promise against a delay..
        return this._sendCommand(null, channel, message, function (resolve, _reject) {
          // At this time, there is no possible way to detect if a message has been sent has been eaten
          // by the server, so we can only resolve the Promise.
          resolve([channel, message]);
        });
      }
    } // Send the command to the server and race the Promise against a delay..


    return this._sendMessage(this._getPromiseDelay(), channel, message, function (resolve, _reject) {
      // At this time, there is no possible way to detect if a message has been sent has been eaten
      // by the server, so we can only resolve the Promise.
      resolve([channel, message]);
    });
  },
  // Enable slow mode on a channel..
  slow: slow,
  // Alias for slow()..
  slowmode: slow,
  // Disable slow mode on a channel..
  slowoff: slowoff,
  // Alias for slowoff()..
  slowmodeoff: slowoff,
  // Enable subscribers mode on a channel..
  subscribers: function subscribers(channel) {
    var _this20 = this;

    channel = _.channel(channel); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, '/subscribers', function (resolve, reject) {
      // Received _promiseSubscribers event, resolve or reject..
      _this20.once('_promiseSubscribers', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Disable subscribers mode on a channel..
  subscribersoff: function subscribersoff(channel) {
    var _this21 = this;

    channel = _.channel(channel); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, '/subscribersoff', function (resolve, reject) {
      // Received _promiseSubscribersoff event, resolve or reject..
      _this21.once('_promiseSubscribersoff', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Timeout username on channel for X seconds..
  timeout: function timeout(channel, username, seconds, reason) {
    var _this22 = this;

    channel = _.channel(channel);
    username = _.username(username);

    if (seconds !== null && !_.isInteger(seconds)) {
      reason = seconds;
      seconds = 300;
    }

    seconds = _.get(seconds, 300);
    reason = _.get(reason, ''); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, "/timeout ".concat(username, " ").concat(seconds, " ").concat(reason), function (resolve, reject) {
      // Received _promiseTimeout event, resolve or reject..
      _this22.once('_promiseTimeout', function (err) {
        if (!err) {
          resolve([channel, username, ~~seconds, reason]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Unban username on channel..
  unban: function unban(channel, username) {
    var _this23 = this;

    channel = _.channel(channel);
    username = _.username(username); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, "/unban ".concat(username), function (resolve, reject) {
      // Received _promiseUnban event, resolve or reject..
      _this23.once('_promiseUnban', function (err) {
        if (!err) {
          resolve([channel, username]);
        } else {
          reject(err);
        }
      });
    });
  },
  // End the current hosting..
  unhost: function unhost(channel) {
    var _this24 = this;

    channel = _.channel(channel); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(2000, channel, '/unhost', function (resolve, reject) {
      // Received _promiseUnhost event, resolve or reject..
      _this24.once('_promiseUnhost', function (err) {
        if (!err) {
          resolve([channel]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Unmod username on channel..
  unmod: function unmod(channel, username) {
    var _this25 = this;

    channel = _.channel(channel);
    username = _.username(username); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, "/unmod ".concat(username), function (resolve, reject) {
      // Received _promiseUnmod event, resolve or reject..
      _this25.once('_promiseUnmod', function (err) {
        if (!err) {
          resolve([channel, username]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Unvip username on channel..
  unvip: function unvip(channel, username) {
    var _this26 = this;

    channel = _.channel(channel);
    username = _.username(username); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, "/unvip ".concat(username), function (resolve, reject) {
      // Received _promiseUnvip event, resolve or reject..
      _this26.once('_promiseUnvip', function (err) {
        if (!err) {
          resolve([channel, username]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Add username to VIP list on channel..
  vip: function vip(channel, username) {
    var _this27 = this;

    channel = _.channel(channel);
    username = _.username(username); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, "/vip ".concat(username), function (resolve, reject) {
      // Received _promiseVip event, resolve or reject..
      _this27.once('_promiseVip', function (err) {
        if (!err) {
          resolve([channel, username]);
        } else {
          reject(err);
        }
      });
    });
  },
  // Get list of VIPs on a channel..
  vips: function vips(channel) {
    var _this28 = this;

    channel = _.channel(channel); // Send the command to the server and race the Promise against a delay..

    return this._sendCommand(null, channel, '/vips', function (resolve, reject) {
      // Received _promiseVips event, resolve or reject..
      _this28.once('_promiseVips', function (err, vips) {
        if (!err) {
          resolve(vips);
        } else {
          reject(err);
        }
      });
    });
  },
  // Send an whisper message to a user..
  whisper: function whisper(username, message) {
    var _this29 = this;

    username = _.username(username); // The server will not send a whisper to the account that sent it.

    if (username === this.getUsername()) {
      return Promise.reject('Cannot send a whisper to the same account.');
    } // Send the command to the server and race the Promise against a delay..


    return this._sendCommand(null, '#tmijs', "/w ".concat(username, " ").concat(message), function (_resolve, reject) {
      _this29.once('_promiseWhisper', function (err) {
        if (err) {
          reject(err);
        }
      });
    })["catch"](function (err) {
      // Either an "actual" error occured or the timeout triggered
      // the latter means no errors have occured and we can resolve
      // else just elevate the error
      if (err && typeof err === 'string' && err.indexOf('No response from Twitch.') !== 0) {
        throw err;
      }

      var from = _.channel(username);

      var userstate = Object.assign({
        'message-type': 'whisper',
        'message-id': null,
        'thread-id': null,
        username: _this29.getUsername()
      }, _this29.globaluserstate); // Emit for both, whisper and message..

      _this29.emits(['whisper', 'message'], [[from, userstate, message, true], [from, userstate, message, true]]);

      return [username, message];
    });
  }
};

},{"./utils":9}],5:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* istanbul ignore file */

/* eslint-disable */

/*
 * Copyright Joyent, Inc. and other Node contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}

module.exports = EventEmitter; // Backwards-compat with node 0.10.x

EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.

EventEmitter.defaultMaxListeners = 10; // Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.

EventEmitter.prototype.setMaxListeners = function (n) {
  if (!isNumber(n) || n < 0 || isNaN(n)) {
    throw TypeError("n must be a positive number");
  }

  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function (type) {
  var er, handler, len, args, i, listeners;

  if (!this._events) {
    this._events = {};
  } // If there is no 'error' event listener then throw.


  if (type === "error") {
    if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
      er = arguments[1];

      if (er instanceof Error) {
        throw er;
      }

      throw TypeError("Uncaught, unspecified \"error\" event.");
    }
  }

  handler = this._events[type];

  if (isUndefined(handler)) {
    return false;
  }

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;

      case 2:
        handler.call(this, arguments[1]);
        break;

      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower

      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;

    for (i = 0; i < len; i++) {
      listeners[i].apply(this, args);
    }
  }

  return true;
};

EventEmitter.prototype.addListener = function (type, listener) {
  var m;

  if (!isFunction(listener)) {
    throw TypeError("listener must be a function");
  }

  if (!this._events) {
    this._events = {};
  } // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".


  if (this._events.newListener) {
    this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
  } // Optimize the case of one listener. Don't need the extra array object.


  if (!this._events[type]) {
    this._events[type] = listener;
  } // If we've already got an array, just append.
  else if (isObject(this._events[type])) {
    this._events[type].push(listener);
  } // Adding the second element, need to change to array.
  else {
    this._events[type] = [this._events[type], listener];
  } // Check for listener leak


  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[type].length); // Not supported in IE 10

      if (typeof console.trace === "function") {
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener; // Modified to support multiple calls..

EventEmitter.prototype.once = function (type, listener) {
  if (!isFunction(listener)) {
    throw TypeError("listener must be a function");
  }

  var fired = false;

  if (this._events.hasOwnProperty(type) && type.charAt(0) === "_") {
    var count = 1;
    var searchFor = type;

    for (var k in this._events) {
      if (this._events.hasOwnProperty(k) && k.startsWith(searchFor)) {
        count++;
      }
    }

    type = type + count;
  }

  function g() {
    if (type.charAt(0) === "_" && !isNaN(type.substr(type.length - 1))) {
      type = type.substring(0, type.length - 1);
    }

    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);
  return this;
}; // Emits a "removeListener" event if the listener was removed..
// Modified to support multiple calls from .once()..


EventEmitter.prototype.removeListener = function (type, listener) {
  var list, position, length, i;

  if (!isFunction(listener)) {
    throw TypeError("listener must be a function");
  }

  if (!this._events || !this._events[type]) {
    return this;
  }

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener || isFunction(list.listener) && list.listener === listener) {
    delete this._events[type];

    if (this._events.hasOwnProperty(type + "2") && type.charAt(0) === "_") {
      var searchFor = type;

      for (var k in this._events) {
        if (this._events.hasOwnProperty(k) && k.startsWith(searchFor)) {
          if (!isNaN(parseInt(k.substr(k.length - 1)))) {
            this._events[type + parseInt(k.substr(k.length - 1) - 1)] = this._events[k];
            delete this._events[k];
          }
        }
      }

      this._events[type] = this._events[type + "1"];
      delete this._events[type + "1"];
    }

    if (this._events.removeListener) {
      this.emit("removeListener", type, listener);
    }
  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener || list[i].listener && list[i].listener === listener) {
        position = i;
        break;
      }
    }

    if (position < 0) {
      return this;
    }

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener) {
      this.emit("removeListener", type, listener);
    }
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function (type) {
  var key, listeners;

  if (!this._events) {
    return this;
  } // not listening for removeListener, no need to emit


  if (!this._events.removeListener) {
    if (arguments.length === 0) {
      this._events = {};
    } else if (this._events[type]) {
      delete this._events[type];
    }

    return this;
  } // emit removeListener for all listeners on all events


  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === "removeListener") {
        continue;
      }

      this.removeAllListeners(key);
    }

    this.removeAllListeners("removeListener");
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    while (listeners.length) {
      this.removeListener(type, listeners[listeners.length - 1]);
    }
  }

  delete this._events[type];
  return this;
};

EventEmitter.prototype.listeners = function (type) {
  var ret;

  if (!this._events || !this._events[type]) {
    ret = [];
  } else if (isFunction(this._events[type])) {
    ret = [this._events[type]];
  } else {
    ret = this._events[type].slice();
  }

  return ret;
};

EventEmitter.prototype.listenerCount = function (type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener)) {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
};

EventEmitter.listenerCount = function (emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === "function";
}

function isNumber(arg) {
  return typeof arg === "number";
}

function isObject(arg) {
  return _typeof(arg) === "object" && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],6:[function(require,module,exports){
"use strict";

var _ = require('./utils');

var currentLevel = 'info';
var levels = {
  'trace': 0,
  'debug': 1,
  'info': 2,
  'warn': 3,
  'error': 4,
  'fatal': 5
}; // Logger implementation..

function log(level) {
  // Return a console message depending on the logging level..
  return function (message) {
    if (levels[level] >= levels[currentLevel]) {
      console.log("[".concat(_.formatDate(new Date()), "] ").concat(level, ": ").concat(message));
    }
  };
}

module.exports = {
  // Change the current logging level..
  setLevel: function setLevel(level) {
    currentLevel = level;
  },
  trace: log('trace'),
  debug: log('debug'),
  info: log('info'),
  warn: log('warn'),
  error: log('error'),
  fatal: log('fatal')
};

},{"./utils":9}],7:[function(require,module,exports){
"use strict";

/*
	Copyright (c) 2013-2015, Fionn Kelleher All rights reserved.

	Redistribution and use in source and binary forms, with or without modification,
	are permitted provided that the following conditions are met:

		Redistributions of source code must retain the above copyright notice,
		this list of conditions and the following disclaimer.

		Redistributions in binary form must reproduce the above copyright notice,
		this list of conditions and the following disclaimer in the documentation and/or other materials
		provided with the distribution.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
	IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
	INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
	OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
	WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
	ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
	OF SUCH DAMAGE.
*/
var _ = require('./utils');

var nonspaceRegex = /\S+/g;

function parseComplexTag(tags, tagKey) {
  var splA = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
  var splB = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
  var splC = arguments.length > 4 ? arguments[4] : undefined;
  var raw = tags[tagKey];

  if (raw === undefined) {
    return tags;
  }

  var tagIsString = typeof raw === 'string';
  tags[tagKey + '-raw'] = tagIsString ? raw : null;

  if (raw === true) {
    tags[tagKey] = null;
    return tags;
  }

  tags[tagKey] = {};

  if (tagIsString) {
    var spl = raw.split(splA);

    for (var i = 0; i < spl.length; i++) {
      var parts = spl[i].split(splB);
      var val = parts[1];

      if (splC !== undefined && val) {
        val = val.split(splC);
      }

      tags[tagKey][parts[0]] = val || null;
    }
  }

  return tags;
}

module.exports = {
  // Parse Twitch badges..
  badges: function badges(tags) {
    return parseComplexTag(tags, 'badges');
  },
  // Parse Twitch badge-info..
  badgeInfo: function badgeInfo(tags) {
    return parseComplexTag(tags, 'badge-info');
  },
  // Parse Twitch emotes..
  emotes: function emotes(tags) {
    return parseComplexTag(tags, 'emotes', '/', ':', ',');
  },
  // Parse regex emotes..
  emoteRegex: function emoteRegex(msg, code, id, obj) {
    nonspaceRegex.lastIndex = 0;
    var regex = new RegExp('(\\b|^|\\s)' + _.unescapeHtml(code) + '(\\b|$|\\s)');
    var match; // Check if emote code matches using RegExp and push it to the object..

    while ((match = nonspaceRegex.exec(msg)) !== null) {
      if (regex.test(match[0])) {
        obj[id] = obj[id] || [];
        obj[id].push([match.index, nonspaceRegex.lastIndex - 1]);
      }
    }
  },
  // Parse string emotes..
  emoteString: function emoteString(msg, code, id, obj) {
    nonspaceRegex.lastIndex = 0;
    var match; // Check if emote code matches and push it to the object..

    while ((match = nonspaceRegex.exec(msg)) !== null) {
      if (match[0] === _.unescapeHtml(code)) {
        obj[id] = obj[id] || [];
        obj[id].push([match.index, nonspaceRegex.lastIndex - 1]);
      }
    }
  },
  // Transform the emotes object to a string with the following format..
  // emote_id:first_index-last_index,another_first-another_last/another_emote_id:first_index-last_index
  transformEmotes: function transformEmotes(emotes) {
    var transformed = '';
    Object.keys(emotes).forEach(function (id) {
      transformed = "".concat(transformed + id, ":");
      emotes[id].forEach(function (index) {
        return transformed = "".concat(transformed + index.join('-'), ",");
      });
      transformed = "".concat(transformed.slice(0, -1), "/");
    });
    return transformed.slice(0, -1);
  },
  formTags: function formTags(tags) {
    var result = [];

    for (var key in tags) {
      var value = _.escapeIRC(tags[key]);

      result.push("".concat(key, "=").concat(value));
    }

    return "@".concat(result.join(';'));
  },
  // Parse Twitch messages..
  msg: function msg(data) {
    var message = {
      raw: data,
      tags: {},
      prefix: null,
      command: null,
      params: []
    }; // Position and nextspace are used by the parser as a reference..

    var position = 0;
    var nextspace = 0; // The first thing we check for is IRCv3.2 message tags.
    // http://ircv3.atheme.org/specification/message-tags-3.2

    if (data.charCodeAt(0) === 64) {
      nextspace = data.indexOf(' '); // Malformed IRC message..

      if (nextspace === -1) {
        return null;
      } // Tags are split by a semi colon..


      var rawTags = data.slice(1, nextspace).split(';');

      for (var i = 0; i < rawTags.length; i++) {
        // Tags delimited by an equals sign are key=value tags.
        // If there's no equals, we assign the tag a value of true.
        var tag = rawTags[i];
        var pair = tag.split('=');
        message.tags[pair[0]] = tag.substring(tag.indexOf('=') + 1) || true;
      }

      position = nextspace + 1;
    } // Skip any trailing whitespace..


    while (data.charCodeAt(position) === 32) {
      position++;
    } // Extract the message's prefix if present. Prefixes are prepended with a colon..


    if (data.charCodeAt(position) === 58) {
      nextspace = data.indexOf(' ', position); // If there's nothing after the prefix, deem this message to be malformed.

      if (nextspace === -1) {
        return null;
      }

      message.prefix = data.slice(position + 1, nextspace);
      position = nextspace + 1; // Skip any trailing whitespace..

      while (data.charCodeAt(position) === 32) {
        position++;
      }
    }

    nextspace = data.indexOf(' ', position); // If there's no more whitespace left, extract everything from the
    // current position to the end of the string as the command..

    if (nextspace === -1) {
      if (data.length > position) {
        message.command = data.slice(position);
        return message;
      }

      return null;
    } // Else, the command is the current position up to the next space. After
    // that, we expect some parameters.


    message.command = data.slice(position, nextspace);
    position = nextspace + 1; // Skip any trailing whitespace..

    while (data.charCodeAt(position) === 32) {
      position++;
    }

    while (position < data.length) {
      nextspace = data.indexOf(' ', position); // If the character is a colon, we've got a trailing parameter.
      // At this point, there are no extra params, so we push everything
      // from after the colon to the end of the string, to the params array
      // and break out of the loop.

      if (data.charCodeAt(position) === 58) {
        message.params.push(data.slice(position + 1));
        break;
      } // If we still have some whitespace...


      if (nextspace !== -1) {
        // Push whatever's between the current position and the next
        // space to the params array.
        message.params.push(data.slice(position, nextspace));
        position = nextspace + 1; // Skip any trailing whitespace and continue looping.

        while (data.charCodeAt(position) === 32) {
          position++;
        }

        continue;
      } // If we don't have any more whitespace and the param isn't trailing,
      // push everything remaining to the params array.


      if (nextspace === -1) {
        message.params.push(data.slice(position));
        break;
      }
    }

    return message;
  }
};

},{"./utils":9}],8:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Initialize the queue with a specific delay..
var Queue = /*#__PURE__*/function () {
  function Queue(defaultDelay) {
    _classCallCheck(this, Queue);

    this.queue = [];
    this.index = 0;
    this.defaultDelay = defaultDelay === undefined ? 3000 : defaultDelay;
  } // Add a new function to the queue..


  _createClass(Queue, [{
    key: "add",
    value: function add(fn, delay) {
      this.queue.push({
        fn: fn,
        delay: delay
      });
    } // Go to the next in queue..

  }, {
    key: "next",
    value: function next() {
      var _this = this;

      var i = this.index++;
      var at = this.queue[i];

      if (!at) {
        return;
      }

      var next = this.queue[this.index];
      at.fn();

      if (next) {
        var delay = next.delay === undefined ? this.defaultDelay : next.delay;
        setTimeout(function () {
          return _this.next();
        }, delay);
      }
    }
  }]);

  return Queue;
}();

module.exports = Queue;

},{}],9:[function(require,module,exports){
(function (process){(function (){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// eslint-disable-next-line no-control-regex
var actionMessageRegex = /^\u0001ACTION ([^\u0001]+)\u0001$/;
var justinFanRegex = /^(justinfan)(\d+$)/;
var unescapeIRCRegex = /\\([sn:r\\])/g;
var escapeIRCRegex = /([ \n;\r\\])/g;
var ircEscapedChars = {
  s: ' ',
  n: '',
  ':': ';',
  r: ''
};
var ircUnescapedChars = {
  ' ': 's',
  '\n': 'n',
  ';': ':',
  '\r': 'r'
};
var urlRegex = new RegExp("^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))\\.?)(?::\\d{2,5})?(?:[/?#]\\S*)?$", 'i');
var regexEmoteRegex = /[|\\^$*+?:#]/;

var _ = module.exports = {
  // Return the second value if the first value is undefined..
  get: function get(a, b) {
    return typeof a === 'undefined' ? b : a;
  },
  // Indirectly use hasOwnProperty
  hasOwn: function hasOwn(obj, key) {
    return {}.hasOwnProperty.call(obj, key);
  },
  // Race a promise against a delay..
  promiseDelay: function promiseDelay(time) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, time);
    });
  },
  // Value is a finite number..
  isFinite: function (_isFinite) {
    function isFinite(_x) {
      return _isFinite.apply(this, arguments);
    }

    isFinite.toString = function () {
      return _isFinite.toString();
    };

    return isFinite;
  }(function (_int) {
    return isFinite(_int) && !isNaN(parseFloat(_int));
  }),
  // Parse string to number. Returns NaN if string can't be parsed to number..
  toNumber: function toNumber(num, precision) {
    if (num === null) {
      return 0;
    }

    var factor = Math.pow(10, _.isFinite(precision) ? precision : 0);
    return Math.round(num * factor) / factor;
  },
  // Value is an integer..
  isInteger: function isInteger(_int2) {
    return !isNaN(_.toNumber(_int2, 0));
  },
  // Value is a regex..
  isRegex: function isRegex(str) {
    return regexEmoteRegex.test(str);
  },
  // Value is a valid url..
  isURL: function isURL(str) {
    return urlRegex.test(str);
  },
  // Return a random justinfan username..
  justinfan: function justinfan() {
    return "justinfan".concat(Math.floor(Math.random() * 80000 + 1000));
  },
  // Username is a justinfan username..
  isJustinfan: function isJustinfan(username) {
    return justinFanRegex.test(username);
  },
  // Return a valid channel name..
  channel: function channel(str) {
    var channel = (str ? str : '').toLowerCase();
    return channel[0] === '#' ? channel : '#' + channel;
  },
  // Return a valid username..
  username: function username(str) {
    var username = (str ? str : '').toLowerCase();
    return username[0] === '#' ? username.slice(1) : username;
  },
  // Return a valid token..
  token: function token(str) {
    return str ? str.toLowerCase().replace('oauth:', '') : '';
  },
  // Return a valid password..
  password: function password(str) {
    var token = _.token(str);

    return token ? "oauth:".concat(token) : '';
  },
  actionMessage: function actionMessage(msg) {
    return msg.match(actionMessageRegex);
  },
  // Replace all occurences of a string using an object..
  replaceAll: function replaceAll(str, obj) {
    if (str === null || typeof str === 'undefined') {
      return null;
    }

    for (var x in obj) {
      str = str.replace(new RegExp(x, 'g'), obj[x]);
    }

    return str;
  },
  unescapeHtml: function unescapeHtml(safe) {
    return safe.replace(/\\&amp\\;/g, '&').replace(/\\&lt\\;/g, '<').replace(/\\&gt\\;/g, '>').replace(/\\&quot\\;/g, '"').replace(/\\&#039\\;/g, '\'');
  },
  // Escaping values:
  // http://ircv3.net/specs/core/message-tags-3.2.html#escaping-values
  unescapeIRC: function unescapeIRC(msg) {
    if (!msg || typeof msg !== 'string' || !msg.includes('\\')) {
      return msg;
    }

    return msg.replace(unescapeIRCRegex, function (m, p) {
      return p in ircEscapedChars ? ircEscapedChars[p] : p;
    });
  },
  escapeIRC: function escapeIRC(msg) {
    if (!msg || typeof msg !== 'string') {
      return msg;
    }

    return msg.replace(escapeIRCRegex, function (m, p) {
      return p in ircUnescapedChars ? "\\".concat(ircUnescapedChars[p]) : p;
    });
  },
  // Add word to a string..
  addWord: function addWord(line, word) {
    return line.length ? line + ' ' + word : line + word;
  },
  // Split a line but try not to cut a word in half..
  splitLine: function splitLine(input, length) {
    var lastSpace = input.substring(0, length).lastIndexOf(' '); // No spaces found, split at the very end to avoid a loop..

    if (lastSpace === -1) {
      lastSpace = length - 1;
    }

    return [input.substring(0, lastSpace), input.substring(lastSpace + 1)];
  },
  // Extract a number from a string..
  extractNumber: function extractNumber(str) {
    var parts = str.split(' ');

    for (var i = 0; i < parts.length; i++) {
      if (_.isInteger(parts[i])) {
        return ~~parts[i];
      }
    }

    return 0;
  },
  // Format the date..
  formatDate: function formatDate(date) {
    var hours = date.getHours();
    var mins = date.getMinutes();
    hours = (hours < 10 ? '0' : '') + hours;
    mins = (mins < 10 ? '0' : '') + mins;
    return "".concat(hours, ":").concat(mins);
  },
  // Inherit the prototype methods from one constructor into another..
  inherits: function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;

    var TempCtor = function TempCtor() {};

    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  },
  // Return whether inside a Node application or not..
  isNode: function isNode() {
    try {
      return (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && Object.prototype.toString.call(process) === '[object process]';
    } catch (e) {}

    return false;
  }
};

}).call(this)}).call(this,require('_process'))
},{"_process":11}],10:[function(require,module,exports){

},{}],11:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[1]);
