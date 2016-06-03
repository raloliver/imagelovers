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
    }) //aqui criamos um novo serviço para gravação das fotos, e ele depende de outro serviço
       //$rootScope: $scope pai de todos os controladores
    .factory('pictureRegister', function(pictureResource, $q, $rootScope){
        
        var service = {};
        //para criarmos uma promisse dentro do angularjs, usamos o serviço $q
        
        var event = 'pictureSend';
        service.register = function(picture) {
            //o primeiro parametro deve ser passado para o then (retorno bem sucedido da promisse)
            return $q(function (resolve, reject) {
                if(picture._id){                    
                    pictureResource.update({pictureId: picture._id}, picture, function(){
                        //serviço para disparar o evento de foco quando a foto é cadastrada
                        $rootScope.$broadcast(event);
                        resolve({
                            //quem usar a função register, eu devo passar dois parametros: 1 a mensagem e 2 se é uma inclusão: sim ou não
                            message: 'Foto'+ picture.titulo + ' atualizada com sucesso!',
                            include: false
                        });
                    }, function(erro){
                        console.log(erro);
                        reject({
                            message: 'Não foi possível alterar a foto '+ picture.titulo
                        });
                    });
                    //aqui o nosso resource, com a função save que recebe três parâmetro: 1 a foto pra gravar, 2 o callback da operação bem sucedida e 3 o erro.
                } else {
                    pictureResource.save(picture, function(){
                        //tanto para alteração quando para inclusão
                        $rootScope.$broadcast(event);
                        resolve({
                            message: 'Foto'+ picture.titulo + ' cadastrada com sucesso!',
                            include: true
                        });
                    }, function(erro){
                       console.log(erro);
                       reject({
                           message: 'Não foi possível cadastrar a foto '+ picture.titulo
                       }); 
                    });
                }
            });
        };
        
        return service;
    });