angular.module('imagelovers').controller('PictureController', function ($scope, pictureResource, $routeParams) {
    
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
            
            // no caso desses dois resources, ainda temos código repetido, tanto para a ação, quanto para tratativa de erro e mensagens
            if($scope.picture._id){
                pictureResource.update({pictureId : $scope.picture._id}, $scope.picture, function(){
                    $scope.message = 'Foto alterada!';
                }, function(erro){
                    console.log(erro);
                    $scope.message = 'Não foi possível alterar a foto.';
                });               

            } else {
                pictureResource.save($scope.picture, function(){
                    $scope.picture = {};
                    $scope.message = 'Foto enviada!';
                }, function(erro){
                    $scope.message = 'Erro ao enviar a foto.';
                    console.log(erro);
                });                               
            }            
        }
    };
    
});