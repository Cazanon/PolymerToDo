(function(Polymer){

	'use strict';

	Polymer({
		is: 'my-todos',
		properties: {
			items: {
				type: Array
			},
			myModel: {
				type: Object
			},
			modelId: {
				type: String
			},
			filter: {
				type: String
			}
		},
		listeners: {
			'toggle-todo'	: 'toggleTodo',
			'delete-todo'	: 'deleteTodo',
			'newTodo.keyup'	: '_keyUpAction'
		},
		attached: function(){
			this.myModel = document.querySelector('#' + this.modelId);
			console.log(this.filter);
			console.log(this.tasks);
		},
		_keyUpAction: function(e){
			var ENTER_KEY = 13;
			var input = this.$['newTodo'];
			if(e.keyCode === ENTER_KEY){
				this.addItem(input.value);
				input.value = '';
			}
		},
		addItem: function(value){
			if(this.myModel.existItem(value).length){
				this.$.toast.text = 'Task ' + value + ' already exists!';
				this.$.toast.open();
				return;
			}
			this.myModel.newItem({label: value, done: false});
		},
		toggleTodo: function(e, todo){					
			//console.log(todo);
		},

		deleteTodo: function(e, todo){
			this.$.toast.text = 'Task ' + todo.label + ' removed';
			this.$.toast.open();
			this.myModel.deleteItem(todo);
			//console.log('Delete ',todo);
		}
	});

})(Polymer)