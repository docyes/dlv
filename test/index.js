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
})();
