angular.module('imagelovers').controller('PictureController', function ($scope, pictureRegister, pictureResource, $routeParams) {
    
    $scope.picture = {};    
    $scope.message = '';
    
    //removemos o $http e o $resource pq o pictureResource esta escapsulando tudo isso junto    
    if($routeParams.pictureId) {
        pictureResource.get({pictureId : $routeParams.pictureId}, function(picture){
            $scope.picture = picture;
        }, function(erro){
            console.log(erro);
            $scope.message = 'Não foi possível obter a foto.';
        });
    }
    
    $scope.send = function () {
        if ($scope.imageForm.$valid) {
            
            pictureRegister.register($scope.picture)  
            .then(function (data) {
                $scope.message = data.message;
                //como é uma inclusão, eu posso limpar o formulário após o cadastro
                if(data.include) $scope.picture = {};
                //o focus é para informar que nessa função eu quero usar o foco
                //o meu botão começa com focus false, mas ao enviar (send) ai sim ele é true
                $scope.focused = true;
            })
            .catch(function (data) {
                $scope.message = data.message;
            })       
        }
    };
    
});