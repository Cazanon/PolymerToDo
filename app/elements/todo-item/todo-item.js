(function(Polymer){

	'use strict';

	Polymer({
		is: 'todo-item',

		behaviors: [
      		Polymer.NeonAnimationRunnerBehavior
    	],

		properties: {
			todos : {
				type : Object,
				notify : true
			},
			edit : {
				type : Boolean,
				value : false,
				reflectToAttribute: true
			},
			_editIcon : {
				type : String,
				computed : 'editIcon(edit)'
			},
			animationConfig: {
				type: Object,
				value: function() {
					return {
						'entry': [{
					  		name: 'scale-up-animation',
					  		node: this
						}],
						'save': [{
					  			name: 'fade-out-animation',
					  			node: this.$$('#inputItem')
							},{
					  			name: 'fade-in-animation',
					  			node: this.$$('#item')
						}],
						'edit': [{
					  			name: 'fade-out-animation',
					  			node: this.$$('#item')
							},{
					  			name: 'fade-in-animation',
					  			node: this.$$('#inputItem')
						}],
						'exit': [
							{
						  		name: 'slide-right-animation',
						  		timing: {
						  			duration: 800 
						  		},
						  		node: this
							},
							{
						  		name: 'fade-out-animation',
						  		timing: {
						  			delay: 20,
						  			duration: 700 
						  		},
						  		node: this
						  	}
						]
					}
				}
			}
		},

		listeners : {
			'item.change'			: 'toggleTodoStatus',
			'edit.tap' 				: 'onEdit',
			'delete.tap' 			: 'onDelete',
			'neon-animation-finish' : '_onAnimationFinish',
			'inputItem.keyup'		: '_onKeyUp'
		},

		toggleTodoStatus: function (e){
			e.stopPropagation();			
			this.set('todo.done',!this.todo.done);	
			this.fire('toggle-todo', this.todo);
		},

		onEdit: function (e){
			e.stopPropagation();
			this.set('edit',!this.edit);	
			if(this.edit){
				this.playAnimation('edit');
				return this.$$('#inputItem').focus();	
			}
			this.playAnimation('save');
			return this.set('todo.label',this.$$('#inputItem').value);
		},

		onDelete: function(e){
			e.stopPropagation();			
			this.playAnimation('exit');
			this.fire('delete-todo', this.todo);
		},

		editIcon: function(){
			return (this.edit ? 'done' : 'create');
		},

		_onAnimationFinish: function(e) {
			console.log(e);	 	  	    
			//this.fire('delete-todo', this.todo);
		},

		_onKeyUp: function (e){			
			var ENTER_KEY = 13;
			var input = this.$['newTodo'];
			if(e.keyCode === ENTER_KEY){
				return this.onEdit(e);
			}
		}

	});

})(Polymer)