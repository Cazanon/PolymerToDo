(function(Polymer){

	'use strict';

	Polymer({
		is: 'todo-list',
		properties: {
			tasks: {
				type: Array,
				notify: true
			}
		},
		_initTodos: function(){
			this.tasks = [];
		},
		newItem: function(item){
			if(!item.label.trim()) return;
			this.push('tasks', item);
		},
		deleteItem: function(item){
			this.tasks = this.tasks.filter(function(element){
				return element.label !== item.label;
			});
		},
		existItem: function(label){
			return this.tasks.filter(function(element){
				return element.label === label;
			});
		}
	});

})(Polymer)