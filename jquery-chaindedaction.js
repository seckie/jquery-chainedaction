/**
 * ChainedAction
 *
 * @author     Naoki Sekiguchi (RaNa gRam)
 * @url        https://github.com/seckie/jquery-chainedaction
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @requires   jQuery.js
 *
 * Usage example:
 *
 *  var chainedAction = new ChainedAction({
 *    action: [
 *      function () { ... }, // must return Deferred promise object
 *      function () { ... }, // must return Deferred promise object
 *      ...
 *    ],
 *    chainComplete: function () {
 *      // callback
 *    }
 *  });
 *  chainedAction.run();
 */

window.ChainedAction = function (options) {
	this.opt = {
		action: [],
		chainComplete: function () {}
	};
	_.extend(this.opt, options);
};
window.ChainedAction.prototype = {
	run: function () {
		var action = this.opt.action;
		if (typeof action != 'object' ||
			!action.length ||
			typeof action[0] != 'function') {
			return;
		}
		var chained = action[0]();
		for (var i=1,l=action.length; i<l ; i++) {
			chained = chained.then(action[i]);
		}
		chained.done(_.bind(this.opt.chainComplete, this));
	}
};

