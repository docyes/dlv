# Backbone Declarative Listener View (DLV) 

A simple declarative syntax for binding/unbinding listeners to View observables such as Model(s), Collection(s) and/or Oneself (this).

## Basic Listener
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

## Multi-Event Listeners
```js
var View = new BackVent.extend({
    listeners: {
        'change:foo change:bar model': function() {
            alert('foo or bar changed');
        }
    }
});

var model = new Backbone.Model();
var view = new View({model: model});
model.set('foo', 'bar');
```

## Disable Listeners
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
view.stopListening();
model.set('foo', 'bar');
```

## Named Callback
```js
var View = new BackVent.extend({
    listeners: {
        'change:foo model': 'fooHandler'
    },
    fooHandler: function() {
        alert(this.model.get('foo'));
    } 
});

var model = new Backbone.Model();
var view = new View({model: model});
model.set('foo', 'bar');
```

## View Listeners
```js
var View = new BackVent.extend({
    listeners: {
        'boo this': function() {
            alert('Boo!');
        }
    }
});

var view = new View();
view.trigger('boo');
```




