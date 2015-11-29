define(function(require, exports, module){

    var Backbone = require('backbone');
    var Todo = require('models/todo');
    var firebase = require('firebase');
    var Firebase = require('backbonefire');

    module.exports = Backbone.Firebase.Collection.extend({
        model: Todo,
        url: 'https://scorching-inferno-9244.firebaseio.com',
        comparator: 'targetNum'
    });
});