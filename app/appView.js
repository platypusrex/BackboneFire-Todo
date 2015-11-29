define(function(require, exports, module){

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Sortable = require('sortable');
    var bootstrapSelect = require('bootstrap-select');

    var TodoView = require('views/todoView');
    var Todos = require('collections/todos');

    module.exports = Backbone.View.extend({
        el: $('#todoapp'),

        events: {
            'click #add-todo': 'createTodo',
            'input #edit-todo': 'captureKeypress',
            'click #save-btn': 'changeListText',
            'click #close-btn': 'clearInput',
            'click #close-icon': 'clearInput',
            'blur #edit-modal': 'clearDataAttr',
            'drop .list-group-item': 'updateNumOnDrop'
        },

        initialize: function(){
            this.collection = new Todos();

            this.list = this.$('.todo-list');
            this.input = this.$('#new-todo');
            this.modalTitle = this.$('.modal-title');


            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'remove', this.updateTargetNums);
        },

        addOne: function(todo){
            var view = new TodoView({model: todo});
            this.list.prepend(view.render().el);

            Sortable.create(simpleList, {
                dataIdAttribute: 'data-num',
                group: "localStorage-example",
                store: {
                    get: function (sortable) {
                        console.log('hey');
                        var order = localStorage.getItem(sortable.options.group);
                        return order ? order.split('|') : [];
                    },
                    set: function (sortable) {
                        console.log('dude');
                        var order = sortable.toArray();
                        localStorage.setItem(sortable.options.group, order.join('|'));
                    }
                }
            });
        },

        createTodo: function(){
            if(!this.input.val()){return;}

            this.collection.create({
                title: this.input.val(),
                targetNum: this.collection.length + 1
            });
            this.input.val('');
        },

        updateTargetNums: function(){
            var count = 1;
            this.collection.forEach(function(model){
                model.save('targetNum', count, {patch: true});
                count++;
            });
        },

        captureKeypress: function(e){
            var el = e.target;
            this.modalTitle.html(el.value);
        },

        changeListText: function(){
            var li = this.list.find($('[data-id]')).find('.item-container');
            var model = this.collection.findWhere({targetNum: parseInt(li.parent().attr('data-id'))});

            li.text(this.modalTitle.text());
            model.save('title', this.modalTitle.text(), {patch: true});
            li.parent().removeAttr('data-id');
        },

        clearInput: function(){
            var li = this.$el.find($('[data-id]'));
            li.removeAttr('data-id');
            this.$el.find('#edit-todo').val('');
        },

        clearDataAttr: function(){
            var li = this.list.find($('[data-id]'));
            if($('#edit-modal').css('display') === 'none'){
                li.removeAttr('data-id');
            }
        },

        updateNumOnDrop: function(){
            var li = this.list.find('.list-group-item');
            var arr = [];

            li.each(function(i){
                $(this).attr('data-num', i + 1);
                arr.push([$(this).text(), parseInt($(this).attr('data-num'))]);
            });

            this.collection.forEach(function(model){
                for(var i = 0; i < arr.length; i++){
                    if(model.get('title') === arr[i][0]){
                        model.save('targetNum', arr[i][1], {patch: true});
                    }
                }
            });

            var group = this.collection.sort();
        }
    });
});