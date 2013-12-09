var DLV = Backbone.View.extend({
    constructor: function(options) {
        options || (options = {});
        if (options.listeners) {
            this.listeners = options.listeners;
        }
        Backbone.View.apply(this, arguments);
        this.delegateListeners();
    },
    _implementListeners: function(listeners, implementation) {
        if (!(listeners || (listeners = _.result(this, 'listeners')))) {
            return;
        }
        for (var key in listeners) {
            var method = listeners[key];
            if (!_.isFunction(method)) {
                method = this[listeners[key]];
            }
            if (!method) {
                continue;
            }
            var match = key.match(/\S+/g);
            var other = match.pop();
            other = (other === 'this') ? this : this[other];
            if (!other) {
                continue;
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
