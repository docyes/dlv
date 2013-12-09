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
    test('single event listener entry', 1, function() {
        var View = DLV.extend({
            listeners: {
                'change model': 'handler'
            },
            handler: sinon.spy()
        });
        var model = new Backbone.Model();
        var view = new View({
            model: model
        });
        model.set('foo', 'bar');
        ok(view.handler.calledOnce, 'listener called');
    });
    test('single multi-event listener entry', 1, function() {
        var View = DLV.extend({
            listeners: {
                'change:foo change:bar model': 'handler'
            },
            handler: sinon.spy()
        });
        var model = new Backbone.Model();
        var view = new View({
            model: model
        });
        model.set('foo', 'bar');
        model.set('bar', 'foo');
        ok(view.handler.calledTwice, 'listener called');
    });
    test('many event listener entries', 2, function() {
        var View = DLV.extend({
            listeners: {
                'change:foo model': 'fooHandler',
                'change:bar model': 'barHandler'
            },
            fooHandler: sinon.spy(),
            barHandler: sinon.spy()
        });
        var model = new Backbone.Model();
        var view = new View({
            model: model
        });
        model.set('foo', 'foo');
        model.set('bar', 'bar');
        ok(view.fooHandler.calledOnce, 'foo listener called');
        ok(view.barHandler.calledOnce, 'bar listener called');
    });
})();
