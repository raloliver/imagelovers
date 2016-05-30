//angular é o core do angular que me permite executar uma série de tarefas
//para criar o módulo, eu deve chamar a função module
//no primeiro parâmetro o módulo recebe o nome e no segundo um array com as depedências, caso elas existam
//sem o array, eu apenas estou usando um outro módulo já existente e não criando um novo
angular.module('imagelovers', ['image-directives','ngAnimate','ngRoute', 'myServices'])
//as rotas do CS (clientside) são chamadas a partir do serviço $routeProvider
    .config(function ($routeProvider, $locationProvider) {
        
        $routeProvider.when('/pictures', {
            templateUrl: 'partials/main.html',
            controller: 'PicturesController'
        });
        
        $routeProvider.when('/pictures/new', {
            templateUrl: 'partials/create.html',
            controller: 'PictureController'
        });
        
        $routeProvider.when('/pictures/edit/:pictureId', {
            templateUrl: 'partials/create.html',
            controller: 'PictureController'
        });
        
        //e se a rota não existir? redireciona para a padrão ;)        
        $routeProvider.otherwise({ redirectTo:'/pictures' });
        
        //ainda é possível remover a # desde que o browser dê suporte (html5 historyAPI) e o servidor também
        $locationProvider.html5Mode(true);
    });
