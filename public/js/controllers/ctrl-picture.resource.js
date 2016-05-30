angular.module('imagelovers').controller('PictureController', function ($scope, $http, $resource, $routeParams) {
    
    $scope.picture = {};    
    $scope.message = '';
    
    //aqui passamos um null (no caso poderia ser umq auqery string com a URL da foto) e em segundo lugar, um objeto que vai ter como nome, o mesmo nome da função que você deseja utilizar no recurso
    var pictureResource = $resource('v1/fotos/:pictureId', null, {
        // este objeto, recebe um novo objeto
        update : {
            method: 'PUT'
        }
    });
    
    if($routeParams.pictureId) {
        pictureResource.get({pictureId : $routeParams.pictureId}, function(picture){
            $scope.picture = picture;
        }, function(erro){
            console.log(erro);
            $scope.message = 'Não foi possível obter a foto.';
        });
        /*
        $http.get('v1/fotos/' + $routeParams.pictureId)
        .success(function(picture){
            $scope.picture = picture;
        })
        .error(function(erro){
            console.log(erro);
        })
        */
    }
    
    $scope.send = function () {
        if ($scope.imageForm.$valid) {
            if($scope.picture._id){
                //primeiro parâmetro: o dado da foto, o segundo é qual foto sera deletada
                pictureResource.update({pictureId : $scope.picture._id}, $scope.picture, function(){
                    $scope.message = 'Foto alterada!';
                }, function(erro){
                    console.log(erro);
                    $scope.message = 'Não foi possível alterar a foto.';
                });
                
                /*
                $http.put('v1/fotos/' + $scope.picture._id, $scope.picture)
                .success(function(){
                    $scope.message = 'Foto alterada!';
                })
                .error(function(erro){
                    console.log(erro);
                });
                */
            } else {
                $http.post('v1/fotos', $scope.picture)
                .success(function(){
                    $scope.picture = {};
                    $scope.message = 'Foto enviada!';
                })
                .error(function(erro){
                    $scope.message = 'Erro ao enviar a foto.';
                    console.log(erro);
                });                
            }            
        }
    };
    
});