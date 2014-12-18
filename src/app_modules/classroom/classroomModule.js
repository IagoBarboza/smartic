angular.module('ic.classroom', [])

	//CLASS ROOMS SERVICE
	.factory('ClassRoomService', function($http){
		var server = 'http://172.20.9.99:8084';
		var classRooms = [];

		function addClassRoom(classroom, callback){
			$http({
				method: 'POST',
				url: server + '/api/classroom/save',
				data: classroom
			})
			.success(function(response){
				callback(response);
			})
			.error(function(response){
				console.log(response);
			});
		}

		function updateClassRoomsList(callback){
			$http({
				method: 'GET',
				url: server+'/api/classroom/list'
			})
			.success(function(response){
				classRooms = response;
				callback(response);
			})
			.error(function(response){
				alert('Error: ' + response);
				console.log(response);
			});
		}

		function getClassRoomsList(){
			return classRooms;
		}

		function updateClassRoom(classRoom, callback){
			$http({
				method: 'PUT',
				url: server+'/api/classroom/update',
				data: classRoom 
			})
			.success(function(response){
				callback(response);
			})
			.error(function(response){
				alert('Error: ' + response);
				console.log(response);
			});
		}

		function deleteClassRoom(id, callback){
			$http({
				method: 'DELETE',
				url: server+'/api/classroom/delete/'+id
			})
			.success(function(response){
				callback(response);
			})
			.error(function(response){
				alert('Error: ' + response);
				console.log(response);
			});
		}

		return {
			addClassRoom: addClassRoom,
			updateClassRoomsList: updateClassRoomsList,
			getClassRoomsList: getClassRoomsList,
			updateClassRoom: updateClassRoom,
			deleteClassRoom: deleteClassRoom
		}
	})
	
	//CLASS ROOMS MANAGER CONTROLLER
	.controller('ClassRoomsManagerCtrl', function($scope,ClassRoomService){
		updateClassRoomsList();
		$scope.newClassRoom = {};

		// UPDATE CLASS ROOMS SCOPE LIST
		function updateClassRoomsList(){
			ClassRoomService.updateClassRoomsList(function(response){
				$scope.classRooms = ClassRoomService.getClassRoomsList();
			});
		}
		
		//ADD CLASSROOM BUTTON EVENT ON 
		$scope.onAddClassRoomButton = function(){
			var classroom = {
				local: $scope.newClassRoom.location,
				name: $scope.newClassRoom.name
			};
			ClassRoomService.addClassRoom(classroom, function(response){
				if(response.id){
					alert('Sala criada com sucesso!');
					$scope.newClassRoom.name = "";
					$scope.newClassRoom.location = "";
					updateClassRoomsList();
				}
			});
		}

		//UPDATE A CLASSROOM INFORMATIONS
		$scope.onUpdateClassRoomButton = function(classRoom){
			ClassRoomService.updateClassRoom(classRoom, function(response){
				if(response.id){
					alert('Sala atualizada com sucesso!');
				}
				else {
					alert('Error: ' + response);
				}
			})
		}

		//DELETE CLASSROOM BY ID
		$scope.onDeleteClassRoomButton = function(id){
			ClassRoomService.deleteClassRoom(id, function(response){
				if(response == 'Classroom deletado com sucesso'){
					updateClassRoomsList();
					alert('Sala de Aula deletada com sucesso!');
				}
				else{
					alert('Erro: '+ response);
				}
			});
		}

		
	});