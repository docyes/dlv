var DLV = Backbone.View.extend({
    constructor: function(options) {
        options || (options = {});
        if (options.listeners) {
            this.listeners = options.listeners;
        }
        Backbone.View.apply(this, arguments);
        this.delegateListeners();
    },
    delegateListeners: function(listeners) {
        if (!(listeners || (listeners = _.result(this, 'listeners')))) {
            return this;
        }
        this.undelegateListeners();
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
            this.listenTo(other, match.join(' '), method);
        }
    },
    undelegateListeners: function() {
        for (var key in listeners) {
            var match = key.match(/\S+/g);
            var other = match.pop();
            other = (other === 'this') ? this : this[other];
            if (!other) {
                continue;
            }
            this.stopListening(other);
        }
    }
});
