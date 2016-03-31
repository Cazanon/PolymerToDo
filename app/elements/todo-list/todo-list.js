(function(Polymer){

	'use strict';

	Polymer({
		is: 'todo-list',
		properties: {
			todos: {
				type: Array,
				notify: true
			}
		},
		_initTodos: function(){
			this.todos = [];
		},
		newItem: function(item){
			if(!item.label.trim()) return;
			this.push('todos', item);
		},
		deleteItem: function(item){
			this.todos = this.todos.filter(function(element){
				return element.label !== item.label;
			});
		},
		existItem: function(label){
			return this.todos.filter(function(element){
				return element.label === label;
			});
		}
	});

})(Polymer)