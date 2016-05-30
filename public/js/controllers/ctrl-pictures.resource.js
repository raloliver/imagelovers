angular.module('imagelovers').controller('PicturesController', function ($scope, pictureResources){
    $scope.pictures = [];
    $scope.pesquisa = '';
    $scope.message = '';
    var pictureResource = $resource('v1/fotos/:pictureId');
    
    pictureResource.query(function (pictures){
        $scope.pictures = pictures;
    }, function (erro) {
        console.log(erro)
    });
    
    $scope.deletePic = function (picture) {
        pictureResource.delete({pictureId: picture._id}, function(){
            var index = $scope.pictures.indexOf(picture);
            $scope.pictures.splice(index, 1);            
            $scope.message = 'Foto ' +picture.titulo+ ' deletada!';
        }, function(erro){
            console.log(erro);
            $scope.message = 'Não foi possível apagar a foto '+picture.titulo;
        });     
    };
});
