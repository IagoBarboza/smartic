angular.module('ic.mainMenu', [])
	.factory('MainMenuService', function(){
		//PRIVATE

		var items = [
			{
				id: 'users-manager',
				description: 'Gerenciador de Usuários',
				icon: 'glyphicon-user',
				initialItemClass: 'item-container-selected'
			},
			{
				id: 'rooms-manager',
				description: 'Gerenciador de Salas',
				icon: 'glyphicon-home',
				initialItemClass: ''
			},
			{
				id: 'docs-manager',
				description: 'Gerenciador de Documentos',
				icon: 'glyphicon-file',
				initialItemClass: ''
			}
		];

		var currentItem = items[0];

		function getItems(){
			return items;
		}

		function routeTo(item){
			
			currentItem = item;

	    	for(var i=0; i<items.length; i++){
	    		document.getElementById(items[i].id).classList.remove('item-container-selected');
	    		items[i].initialItemClass = '';
	      	}

	      	document.getElementById(item.id).classList.add('item-container-selected');
	        
	        window.location.href = "#/" + item.id;
    	}

    	function getCurrentItem(){
    		return currentItem;
    	}

		//PUBLIC

		return{
			getItems:getItems,
			routeTo: routeTo,
			getCurrentItem: getCurrentItem
		};
	});