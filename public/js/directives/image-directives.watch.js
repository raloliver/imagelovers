angular.module('image-directives', [])
    .directive('imagePanel', function () {
        
        var ddo = {};

        ddo.restrict = "AE"        
        
        ddo.scope = {
            titulo: '@'
        }
        
        ddo.transclude = true;        

        ddo.templateUrl = 'js/directives/image-panel.html';
        
        return ddo;        
    })
    .directive('myPicture', function () {
        var ddo = {};
        
        ddo.restrict = "AE"
        
        ddo.scope = {
            titulo: '@',
            url: '@'
        };
        
        ddo.template = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}">';
        
        return ddo;
    })
    .directive('myButton', function () {
        var ddo = {};
        
        ddo.restrict = "E";
        
        ddo.scope = {
            // o @ é utilizado para copiar um valor, que deve ser sempre uma string
            text: '@',
            // no caso de expressões (funções por exemplo) para ser avaliada dentro da diretiva usamos o &, que o faz dentro do contexto do controller
            action: '&'
        };
        // como é bem pequeno, usamos o html direto mesmo
        ddo.template = '<button ng-click="action(picture)" class="btn btn-danger btn-block" style="margin-top:5px;">{{text}}</button>';
        
        return ddo;
    })
    .directive('myFocus', function () {
        var ddo = {};
        
        ddo.restrict = "A";
        
        ddo.scope = {
            //controller e diretiva vão trabalhar na mesma propriedade e para isso, usamos o =
            //alteração de dados bidirecional
            focused : '='
        };
        //link é o listener para saber se no controller o focus é true ou false
        //esse scope é o controle da diretiva
        ddo.link = function (scope, element) {
            //esse scope recebe dois parâmetros, primeiro o nome e segundo uma função 
            //essa função vai ser executar quando a propriedade do meu controller for alterada
            scope.$watch('focused', function(){
                if(scope.focused) {
                //aqui usamos o jqlite e js puro com a .focus
                    element[0].focus();                    
                //tanto controller quanto diretiva pode manipular o mesmo local
                    scope.focused = false;
                }
            });
        }
        
        return ddo;
    });