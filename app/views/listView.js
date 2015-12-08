define(function(require, exports, module){

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var bootstrap = require('bootstrap');

    module.exports = Backbone.View.extend({
        tagName: 'div',
        className: 'list-group panel',
        template: require('tpl!templates/list.ejs'),

        events: {
            'click .list-group-item': 'toggleListItem'
        },

        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'remove', this.unrender);
            this.listenTo(this.model, 'change:owner', this.moveListItem)
        },

        render: function(){
            var listText = this.model.get('title');

            this.$el.html(this.template(this));
            return this;
        },

        unrender: function(){
            this.$el.slideUp('slow').promise().done(function(){
                $(this).remove();
            });
        },

        toggleListItem: function(e){
            var $panelBody = $(e.currentTarget).next('.panel-body');
            if($panelBody){
                $panelBody.collapse('toggle');
            }
        },

        moveListItem: function(){
            this.$el.fadeOut('slow');
        }

    });

});