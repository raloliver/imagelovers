//aqui criamos um novo módulo apenas para os serviços, onde apenas nele teremos o ngResource
angular.module('myServices',['ngResource'])
//aqui usamos a função factory para retornar um objeto, onde o primeiro parametro deve ser o nome do serviço
    .factory('pictureResource', function ($resource) {
        //ao inves de usarmos uma variável, retornamos um serviço
        return $resource('v1/fotos/:pictureId', null, {
        update : {
            method: 'PUT'
            }
        });
    });