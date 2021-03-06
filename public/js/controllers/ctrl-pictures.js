angular.module('imagelovers').controller('PicturesController', function ($scope, pictureResource){
    $scope.pictures = [];
    $scope.pesquisa = '';
    $scope.message = '';
    
    //primeiro parâmetro: função se obteve sucesso na consulta, o segundo o erro (assim como no $http)
    pictureResource.query(function (pictures){
        $scope.pictures = pictures;
    }, function (erro) {
        console.log(erro)
    });   
    
    $scope.deletePic = function (picture) {
        //no primeiro parametro recebe o que será apagado (em formato de objeto)
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
