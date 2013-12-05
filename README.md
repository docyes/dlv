backvent
========

# Backbone Declarative Listeners

A simple declarative syntax for binding/unbinding listeners to View observables such as Model(s), Collection(s) and/or Oneself(this).

## Example
```js
var View = new BackVent.extend({
    listeners: {
        'change:foo model': function() {
            alert(this.model.get('foo'));
        }
    }
});

var model = new Backbone.Model();
var view = new View({model: model});
model.set('foo', 'bar');
```
