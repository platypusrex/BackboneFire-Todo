define(function(require, exports, module){

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var bootstrap = require('bootstrap');

    module.exports = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item',
        template: require('tpl!templates/todo.ejs'),

        events: {
            'click .fa-times-circle-o': 'delete',
            'click .fa-edit': 'displayModal'
        },

        initialize: function(){
            this.currentModel = this.model;
            this.id = 0;

            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.unrender);
            //this.listenTo(this.model, 'change:owner', this.removeListItem)
        },

        render: function(){
            this.$el.html(this.template(this));
            return this;
        },

        unrender: function(){
            this.$el.remove();
        },

        delete: function(){
            this.model.destroy();
        },

        displayModal: function(){
            $('.modal-title').html(this.model.get('title'));
            $('#edit-todo').val(this.model.get('title'));
            this.$el.attr('data-id', this.model.get('targetNum'));
            $('.selectpicker').selectpicker('val', '');
        },

        removeClass: function(){
            this.model.set({title: $('#edit-todo').val()});
            this.model.save();
        },

        removeListItem: function(){
            if(this.model.get('owner') !== ''){
                this.$el.remove();
            }
        }
    });

});