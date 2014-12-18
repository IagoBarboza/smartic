(function() {
    'use strict';  

    angular.module('ic.user', [])

    //USERS SERVICE
    .factory('UserService', function($http){
        var server = 'http://179.235.154.163:8084';
        var students = [];
        var teachers = [];
        var employees = [];

        //UPDATE USERS LISTS
        function updateUsersList(type, callback){
            
            if(type == 'student'){
                $http({
                    method: 'GET',
                    url: server+'/api/student/list',
                    // headers:{
                    //     'Access-Control-Allow-Origin': '*',
                    //     'Content-Type': 'application/json'
                    // }
                })
                .success(function(response){
                    students = response;
                    callback();
                })
                .error(function(response){
                    console.log(response);
                });    
            }

            if(type == 'teacher'){
                $http({
                    method: 'GET',
                    url: server+'/api/teacher/list'
                })
                .success(function(response){
                    teachers = response;
                    callback();
                })
                .error(function(response){
                    console.log(response);
                });
            }

            if(type == 'employee'){
                $http({
                    method: 'GET',
                    url: server+'/api/employees/list'
                })
                .success(function(response){
                    employees = response;
                    callback();
                })
                .error(function(response){
                    console.log(response);
                });   
            }
        }

        //GET USER LIST
    	function getUsersList(type){
    		if(type == 'student') return students;
            if(type == 'teacher') return teachers;
            if(type == 'employee') return employees;
    	}

        //ADD USER
        function addUser(name, address, type_client, cpf, email, phone_number, matricula, workPlace, callback){
            
            //STUDENT
            if(type_client == 'ALUNO'){
                var data = {
                    client: {
                        phone_number: phone_number,
                        email: email,
                        cpf: cpf,
                        type_client: type_client,
                        address: address,
                        name: name
                    },
                    matricula: matricula
                };

                $http({
                    method: 'POST',
                    url: server+'/api/student/save',
                    data: data
                })
                .success(function(response){
                    callback(response);
                    alert(response);
                })
                .error(function(response){
                    alert('Não foi possível cadastrar o usuário. Por favor entre em contato com o desenvolvedor do sistema!');
                    alert(response);
                });
            }

            //TEACHER
            if(type_client == 'PROFESSOR'){
                var data = {
                    client: {
                        phone_number: phone_number,
                        email: email,
                        cpf: cpf,
                        type_client: type_client,
                        address: address,
                        name: name
                    },
                    workPlace: workPlace
                };

                $http({
                    method: 'POST',
                    url: server+'/api/teacher/save',
                    data: data
                })
                .success(function(response){
                    callback(response);
                })
                .error(function(response){
                    alert('Não foi possível cadastrar o usuário. Por favor entre em contato com o desenvolvedor do sistema!');
                });
            }

            //EMPLOYEE
            if(type_client == 'SERVIDOR'){
                var data = {
                    client: {
                        phone_number: phone_number,
                        email: email,
                        cpf: cpf,
                        type_client: type_client,
                        address: address,
                        name: name
                    },
                    workPlace: workPlace
                };

                $http({
                    method: 'POST',
                    url: server+'/api/employees/save',
                    data: data
                })
                .success(function(response){
                    callback(response);
                })
                .error(function(response){
                    console.log(response);
                    alert('Não foi possível cadastrar o usuário. Por favor entre em contato com o desenvolvedor do sistema!');
                });
            }
        }

        //DELETE USER
        function deleteUser(type, id, callback){
            //STUDENT
            if(type == 'STUDENT'){
                $http({
                    method: 'DELETE',
                    url: server+'/api/student/delete/'+id
                })
                .success(function(response){
                    callback(response);
                })
                .error(function(response){
                    alert('O usuário não pôde ser deleteado. Por favor, entre em contato com o desenvolvedor do sistema!');
                });
            }

            //TEACHER
            if(type == 'TEACHER'){
                $http({
                    method: 'DELETE',
                    url: server+'/api/teacher/delete/'+id
                })
                .success(function(response){
                    callback(response);
                })
                .error(function(response){
                    alert('O usuário não pôde ser deleteado. Por favor, entre em contato com o desenvolvedor do sistema!');
                });
            }

            //EMPLOYEE
            if(type == 'EMPLOYEE'){
                $http({
                    method: 'DELETE',
                    url: server+'/api/employees/delete/'+id
                })
                .success(function(response){
                    callback(response);
                })
                .error(function(response){
                    alert('O usuário não pôde ser deleteado. Por favor, entre em contato com o desenvolvedor do sistema!');
                });
            }
        }

        //UPDATE USER
        function updateUser(type, user, callback){
            //STUDENT
            if(type == 'STUDENT'){
                $http({
                    method: 'PUT',
                    url: server+'/api/student/update',
                    data: {
                        client: user.client,
                        matricula: user.matricula,
                        id: user.id
                    }
                })
                .success(function(response){
                    callback(response);
                })
                .error(function(response){
                    alert('Erro! Os dados do estudante não foram atualizados. Entre em contato com o desenvolvedor do sistema!');
                    console.log(response);
                });
            }

            //TEACHER
            if(type == 'TEACHER'){
                $http({
                    method: 'PUT',
                    url: server+'/api/teacher/update',
                    data: {
                        client: user.client,
                        workPlace: user.workPlace,
                        id: user.id
                    }
                })
                .success(function(response){
                    callback(response);
                })
                .error(function(response){
                    alert('Erro! Os dados do professor não foram atualizados. Entre em contato com o desenvolvedor do sistema!');
                    console.log(response);
                });
            }

            //EMPLOYEE
            if(type == 'EMPLOYEE'){
                $http({
                    method: 'PUT',
                    url: server+'/api/employees/update',
                    data: {
                        client: user.client,
                        workPlace: user.workPlace,
                        id: user.id
                    }
                })
                .success(function(response){
                    callback(response);
                })
                .error(function(response){
                    alert('Erro! Os dados do servidor não foram atualizados. Entre em contato com o desenvolvedor do sistema!');
                    console.log(response);
                });
            }
        }

    	return {
    	   updateUsersList : updateUsersList,
           getUsersList: getUsersList,
           addUser: addUser,
           deleteUser: deleteUser,
           updateUser: updateUser
    	}
    })
    
    //USERS MANAGER CONTROLLER
    .controller('UsersManagerCtrl', function($scope, UserService){
        //NEW USERS OBJECTS
        $scope.newStudent = {};
        $scope.newTeacher = {};
        $scope.newEmployee = {};

        //DEFAULT USER MODE
        $scope.userMode = 'student';
        $scope.student = true; 
        $scope.teacher = false;
        $scope.employee = false;  

        //UPDATING USERS LIST
        updateUsersList();

        //USER MODE CHANGING
        $scope.$watch('userMode', function(newValue, oldValue){
            $scope.student = false;
            $scope.teacher = false;
            $scope.employee = false;

            updateUsersList();

            if(newValue == 'student') $scope.student = true;
            if(newValue == 'teacher') $scope.teacher = true;
            if(newValue == 'employee') $scope.employee = true;
        });

        function updateUsersList(){
            //UPDATE THE LIST OF STUDENTS
            UserService.updateUsersList('student', function(){
                $scope.students = UserService.getUsersList('student');
            });

            //UPDATE THE LIST OF TEACHERS
            UserService.updateUsersList('teacher', function(){
                $scope.teachers = UserService.getUsersList('teacher');
            });

            //UPDATE THE LIST OF EMPLOYEES
            UserService.updateUsersList('employee', function(){
                $scope.employees = UserService.getUsersList('employee');
            });    
        }

        //ADD NEW STUDENT
        $scope.onAddStudentButton = function(){
            
            UserService.addUser($scope.newStudent.name, $scope.newStudent.address, 'ALUNO', $scope.newStudent.cpf, 
            $scope.newStudent.email, $scope.newStudent.phoneNumber, $scope.newStudent.code, null, function(response){
                if(response){
                    alert('Estudante cadastrado com sucesso!');
                    //UPDATE THE LIST OF USERS
                    updateUsersList();
                    //CLEAR STUDENT FORM
                    $scope.newStudent.name = "";
                    $scope.newStudent.address = "";
                    $scope.newStudent.cpf = "";
                    $scope.newStudent.email = "";
                    $scope.newStudent.phoneNumber = "";
                    $scope.newStudent.code = "";
                }
            });
        }

        //ADD NEW TEACHER
        $scope.onAddTeacherButton = function(){
            UserService.addUser($scope.newTeacher.name, $scope.newTeacher.address, 'PROFESSOR', $scope.newTeacher.cpf, 
            $scope.newTeacher.email, $scope.newTeacher.phoneNumber, null, $scope.newTeacher.workPlace, function(response){
                if(response){
                    alert('Professor cadastrado com sucesso!');
                    //UPDATE THE LIST OF USERS
                    updateUsersList();
                    //CLEAR TEACHER FORM
                    $scope.newTeacher.name = "";
                    $scope.newTeacher.address = "";
                    $scope.newTeacher.cpf = "";
                    $scope.newTeacher.email = "";
                    $scope.newTeacher.phoneNumber = "";
                    $scope.newTeacher.workPlace = "";
                }
            });
        }

        //ADD NEW EMPLOYEE
        $scope.onAddEmployeeButton = function(){
            console.log('on add employee button!');
            UserService.addUser($scope.newEmployee.name, $scope.newEmployee.address, 'SERVIDOR', $scope.newEmployee.cpf, 
            $scope.newEmployee.email, $scope.newEmployee.phoneNumber, null, $scope.newEmployee.workPlace, function(response){
                if(response){
                    alert('Servidor cadastrado com sucesso!');
                    //UPDATE THE LIST OF USERS
                    updateUsersList();
                    //CLEAR EMPLOYEE FORM
                    $scope.newEmployee.name = "";
                    $scope.newEmployee.address = "";
                    $scope.newEmployee.cpf = "";
                    $scope.newEmployee.email = "";
                    $scope.newEmployee.phoneNumber = "";
                    $scope.newEmployee.workPlace = "";
                }
            });
        }

        //DELETE STUDENT
        $scope.onDeleteStudentButton = function(id){
            UserService.deleteUser('STUDENT', id, function(response){
                if(response.sucesso == 'Aluno deletado com sucesso'){
                    alert('Aluno deletado com sucesso!');
                    updateUsersList();
                }
            });
        }

        //DELETE TEACHER
        $scope.onDeleteTeacherButton = function(id){
            console.log(id);
            UserService.deleteUser('TEACHER', id, function(response){
                if(response.sucesso == 'Professor deletado com sucesso'){
                    alert('Professor deletado com sucesso!');
                    updateUsersList();
                }
            });
        }

        //DELETE EMPLOYEE
        $scope.onDeleteEmployeeButton = function(id){
            console.log('on delete employee button');
            UserService.deleteUser('EMPLOYEE', id, function(response){
                if(response.sucesso == 'Servidor deletado com sucesso'){
                    alert('Servidor deletado com sucesso!');
                    updateUsersList();
                }
            });
        }

        //UPDATE STUDENT
        $scope.onUpdateStudentButton = function(student){
            UserService.updateUser('STUDENT', student, function(response){
                if(response.id){
                    alert('Os dados do estudante foram atualizados com sucesso!');
                    updateUsersList();
                }
                else{
                    alert('Erro! Os dados do estudante não foram atualizados. Entre em contado com o desenvolvedor do sistema!');
                }
            });
        }

        //UPDATE TEACHER
        $scope.onUpdateTeacherButton = function(teacher){
            UserService.updateUser('TEACHER', teacher, function(response){
                if(response.id){
                    alert('Os dados do professor foram atualizados com sucesso!');
                    updateUsersList();
                }
                else{
                    alert('Erro! Os dados do professor não foram atualizados. Entre em contado com o desenvolvedor do sistema!');
                }
            });
        }

        //UPDATE EMPLOYEE
        $scope.onUpdateEmployeeButton = function(employee){
            UserService.updateUser('EMPLOYEE', employee, function(response){
                if(response.id){
                    alert('Os dados do servidor foram atualizados com sucesso!');
                    updateUsersList();
                }
                else{
                    alert('Erro! Os dados do servidor não foram atualizados. Entre em contado com o desenvolvedor do sistema!');
                }
            });
        }

    });

}());