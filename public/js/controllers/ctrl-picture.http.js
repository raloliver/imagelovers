angular.module('imagelovers').controller('PictureController', function ($scope, $http, $routeParams) {
    
    $scope.picture = {};    
    // avisar sobre o envio da imagem
    $scope.message = '';
    //o $routeParams é para incluir na URL o ID e saber se é uma edição ou um item novo
    if($routeParams.pictureId) {
        $http.get('v1/fotos/' + $routeParams.pictureId)
        .success(function(picture){
            $scope.picture = picture;
        })
        .error(function(erro){
            console.log(erro);
        })
    }
    
    $scope.send = function () {
        //conferir se formulário é válido
        if ($scope.imageForm.$valid) {
            // necessário utilizar o padrão REST no backend
            // assim como o get, o post também retorna uma promisse
            //se eu quero editar, verifique se já tem ID, se não pode incluir
            if($scope.picture._id){
                //no mundo REST é put pra alterar e post pra incluir
                $http.put('v1/fotos/' + $scope.picture._id, $scope.picture)
                .success(function(){
                    $scope.message = 'Foto alterada!';
                })
                .error(function(erro){
                    console.log(erro);
                });
            } else {
                $http.post('v1/fotos', $scope.picture)
                .success(function(){
                    // limpar formulário
                    $scope.picture = {};
                    $scope.message = 'Foto enviada!';
                    //console.log('Foto enviada!'); 
                })
                .error(function(erro){
                    $scope.message = 'Erro ao enviar a foto.';
                    console.log(erro);
                });                
            }
            
        }
    };
    
});