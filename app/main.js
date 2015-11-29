define(function(require, exports, module){

    var $ = require('jquery');
    var App = require('./appView');

    $(function(){
        window.todo_app = new App();
    });
});
