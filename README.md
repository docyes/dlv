# Declarative Listener View (DLV) ![alt text](https://api.travis-ci.org/docyes/dlv.png?branch=master "Build Status")

A simple declarative syntax for binding/unbinding listeners to Backbone.View observables such as Model(s), Collection(s) and/or Oneself (this).
```json
{
    'event (object|this)': (function|'name')
}
```

## Object Attribute (Model, Collection, etc...) Listener
```js
var View = new DLV.extend({
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

## Deep Object Attribute (Model, Collection, etc...) Listener
```js
var View = new DLV.extend({
    listeners: {
        'change:foo model.associated': function() {
            alert(this.model.get('foo'));
        }
    }
});

var model = new Backbone.Model();
model.associated = new Backbone.Model();
var view = new View({model: model});
model.associated.set('foo', 'bar');
```

## this (View) Listeners
```js
var View = new DLV.extend({
    listeners: {
        'boo this': function() {
            alert('Boo!');
        }
    }
});

var view = new View();
view.trigger('boo');
```

## Disable Listeners
```js
var View = new DLV.extend({
    listeners: {
        'change:foo model': function() {
            alert(this.model.get('foo'));
        }
    }
});

var model = new Backbone.Model();
var view = new View({model: model});
view.undelegateListeners();
model.set('foo', 'bar');
```

## Multi-Event Listeners
```js
var View = new DLV.extend({
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

## Named Callback
```js
var View = new DLV.extend({
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

## Listeners As A Function
```js
var View = new DLV.extend({
    listeners: function() {
        return {
            'change: model': function() {
                alert(this.model.get('foo'));
            }
        };
    }
});

var model = new Backbone.Model();
var view = new View({model: model});
model.set('foo', 'bar');
```

## Listeners As A Constructor Argument
```js
var model = new Backbone.Model();
var view = new DLV({
    listeners: {
        'change:foo model': function() {
            alert(this.model.get('foo'));
        }
    },
    model: model
});
model.set('foo', 'bar');
```

## Add Delegate Listeners By Reference
```js
var model = new Backbone.Model();
var view = new DLV({
   model: model
});
var listeners = {
    'change:foo model': function() {
        alert(this.model.get('foo'));
    }
}
view.delegateListeners(listeners);
model.set('foo', 'bar');
```

## Remove Delegate Listeners By Reference
```js
var model = new Backbone.Model();
var view = new DLV({
   model: model
});
var listeners = {
    'change:foo model': function() {
        alert(this.model.get('foo'));
    }
}
view.delegateListeners(listeners);
view.undelegateListeners(listeners);
model.set('foo', 'bar');
```




