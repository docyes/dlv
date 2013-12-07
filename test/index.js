(function() {
    module('DLV', {
        setup: function() {
        },
        teardown: function() {
        }
    });
    test('initialize with nothing', 1, function() {
        var dlv = new DLV();
        ok(!dlv.listeners, 'no constructor instance listeners');    
    });
    test('initialize with listeners', 1, function() {
        var listeners = {};
        var dlv = new DLV({
               listeners: listeners
            });
        strictEqual(dlv.listeners, listeners, 'constructor instance listeners');    
    });
    test('single event listener', 1, function() {
        var View = DLV.extend({
            listeners: {
                'change model': 'handler'
            },
            handler: function() {}
        });
        var model = new Backbone.Model();
        var view = new View({
            model: model
        });
        var spy = sinon.spy(view.handler);
        model.set('foo', 'bar');
        ok(spy.calledOnce, 'listener called');
    });
    test('single multi-event listener', 1, function() {
        var View = DLV.extend({
            listeners: {
                'change:foo change:bar model': 'handler'
            },
            handler: function() {}
        });
        var model = new Backbone.Model();
        var view = new View({
            model: model
        });
        var spy = sinon.spy(view.handler);
        model.set('foo', 'bar');
        model.set('bar', 'foo');
        ok(spy.calledTwice, 'listener called');
    });
   
})();
