var DLV = Backbone.View.extend({
    constructor: function(options) {
        options || (options = {});
        if (options.listeners) {
            this.listeners = options.listeners;
        }
        if (options.reverseListeners) {
            this.reverseListeners = options.reverseListeners;
        }
        Backbone.View.apply(this, arguments);
        this.delegateListeners();
    },
    _implementListeners: function(listeners, implementation, options) {
        if (!(listeners || (listeners = _.result(this, 'listeners')))) {
            return;
        }
        options || (options = {});
        nextListener: for (var key in listeners) {
            var method = listeners[key];
            if (!_.isFunction(method)) {
                method = this[listeners[key]];
            }
            if (!method) {
                continue;
            }
            var match = key.match(/\S+/g),
                other,
                others = match[this.reverseListeners ? 'shift' : 'pop']().split('.');
            for (var i = 0; i < others.length; i++) {
                if (i === 0) {
                    other = (others[i] === 'this') ? this : this[others[i]];
                } else {
                    other = other[others[i]];
                }
                if (!other) {
                    continue nextListener;
                }
            }
            this[implementation](other, match.join(' '), method);
        }
    },
    delegateListeners: function(listeners) {
        this._implementListeners(listeners, 'stopListening');
        this._implementListeners(listeners, 'listenTo');
        return this;
    },
    undelegateListeners: function(listeners) {
        this._implementListeners(listeners, 'stopListening');
        return this;
    }
});
