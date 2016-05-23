//aqui chamei o modulo criado anteriormente, e criei um novo controller
//este novo controller, recebe um nome e uma função que define ele
//toda variável declarada dentro de uma função é privada, ela não é enxergada dentro do escopo global
//a dependencia aqui é o $scope, e com isso, ele injeta a dependência e libera as variáveis confinadas
//o $scope serve para disponibilizar dados para minha view
//$http: responsável por fazer requisições AJAX
angular.module('imagelovers').controller('PicturesController', function ($scope, $http){
    //objeto único
    /*
    $scope.picture = {
        title: 'Tia Velha',
        alt: 'Tia Velha',
        url: 'http://nomadev.com.br/content/images/2014/May/wat-1.png'
    };
    */

    //lista de itens com array
    /*
    $scope.pictures = [
        {
            title: 'Ui Ui Ui',
            alt: 'Meme: Ui Ui Ui',
            url: 'http://nomadev.com.br/content/images/2014/May/ui_meme_agora_a_porra_ficou_s_ria.png'
        },
        {
            title: 'Tia Velha',
            alt: 'Tia Velha',
            url: 'http://nomadev.com.br/content/images/2014/May/wat-1.png'
        }
    ];
    */

    //solicite do backend a lista de fotos que você precisa acessar, geralmente um json (array javascript)
    //get para obter informações do servidor, se eu quiser enviar é post, apagar: delete, atualizar: put
    $scope.pictures = [];
    
    //filtro com uma string em branco
    $scope.pesquisa = '';

    //$http é uma requisição assíncrona, você não sabe quando ela vai terminar e ele te devolve uma promessa, uma promisse
    //$http diz que se conseguir retornar os dados do servidor (promise) ele te retorna os dados do servidor
    //se der algum tipo de erro (catch) retorne o que aconteceu
    /*
    var promise = $http.get('v1/fotos')
    promise.then(function (callback) {
         $scope.pictures = callback.data;
    }).catch(function (error) {
         console.log(error) ;
    })
    */

    $http.get('v1/fotos')
    .success(function (pictures) {
         $scope.pictures = pictures
    })
    .error(function (error) {
         console.log(error);
    })

});
