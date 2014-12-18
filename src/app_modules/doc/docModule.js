angular.module('ic.doc', [])
	
	//DOCS SERVICE
	.factory('DocsService', function($http){
		var server = 'http://179.235.154.163:8084';
		var docs = [];

		//UPDATE DOCUMENTS LIST
		function updateDocsList(callback){
			$http({
				method: 'GET',
				url: server+'/api/document/list'
			})
			.success(function(response){
				callback(response);
			})
			.error(function(response){
				console.log('Erro: ' + response);
			});
		}

		//DELETE DOCUMENT
		function deleteDoc(id, callback){
			$http({
				method: 'DELETE',
				url: server+'/api/document/delete/'+id
			})
			.success(function(response){
				callback(response);
			})
			.error(function(response){
				console.log('Erro: '+ response);
			});
		}

		//UPDATE DOCUMENT
		function updateDoc(doc, callback){
			$http({
				method: 'PUT',
				url: server+'/api/document/update',
				data: doc
			})
			.success(function(response){
				callback(response);
			})
			.error(function(response){
				console.log(response);
			})
		}

		return {
			updateDocsList: updateDocsList,
			deleteDoc: deleteDoc,
			updateDoc: updateDoc
		}

	})

	//DOC MANAGER CONTROLLER
	.controller('DocsManagerCtrl', function($scope, DocsService){
		
		updateDocsList();
		
		function updateDocsList(){
			DocsService.updateDocsList(function(response){
				$scope.docs = response;
			});
		}

		$scope.isToDo = function(status){
			if(status == 'TODO') return true;
			return false;
		}

		$scope.isDoing = function(status){
			if(status == 'DOING') return true;
			return false;
		}

		$scope.isDone = function(status){
			if(status == 'DONE') return true;
			return false;
		}

		$scope.onDeleteButton = function(id){
			DocsService.deleteDoc(id, function(response){
				if(response == 'Document deletado com sucesso'){
					alert('Documento deletado com sucesso!');
					updateDocsList();
				}
			});
		}

		$scope.onUpdateButton = function(doc){
			DocsService.updateDoc(doc, function(response){
				if(response.id){
					alert('As informações do documento foram atualizadas com sucesso!');
					updateDocsList();
				}
				else{
					alert('Erro! Entre em contato com o desenvolvedor do sistema!');
				}
			});
		}


	});