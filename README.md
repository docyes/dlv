backvent
========

# Backbone Declarative Listeners

A simple declarative syntax for binding/unbinding listeners to View observables such as Model(s), Collection(s) and or Oneself(this).

```js
var View = new BackVent.extend({
    listeners: {
        'change:foo change:bar model': function() {
            alert(JSON.stringify(model.toJSON()));
        }
    }
});

var model = new Backbone.Model();
var view = new View({model: model});
model.set('bar', 'baz'); //fires
view.undelegateListeners();
model.set('foo', 'fooz'); //silent
```
