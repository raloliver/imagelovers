angular.module('imagelovers').controller('PicturesController', function ($scope, $http){
    $scope.pictures = [];
    $scope.pesquisa = '';
    $scope.message = '';

    $http.get('v1/fotos')
    .success(function (pictures) {
         $scope.pictures = pictures
    })
    .error(function (erro) {
         console.log(erro);
    });
    
    $scope.deletePic = function (picture) {
        $http.delete('v1/fotos/' + picture._id)
        .success(function(){
            // ao inves de fazer mais um requisição, só deleta a foto apagada da lista (depois tentar com o $index do próprio angular)
            var index = $scope.pictures.indexOf(picture);
            $scope.pictures.splice(index, 1);
            //aviso de foto removida
            $scope.message = 'Foto ' +picture.titulo+ ' deletada!';
            
        })
        .error(function(erro){
            console.log(erro);
            $scope.message = 'Não foi possível apagar a foto '+picture.titulo;
        })
    };
});
