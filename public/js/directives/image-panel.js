(function() {
    'use strict';

    angular.module('image-directives', [])
    .directive('imagePanel', function () {
        
        //ddo Directive Definition Object
        var ddo = {};
        
        //aqui restringimos o uso da diretiva para A (atribute: recebendo atributos em elementos) E (element: como componente)
        ddo.restrict = "AE"        
        
        //para um bom uso da reutilização do código, devemos deixar os dados da diretiva restritos
        //@titulo é um atribulto do componente, exemplo: <image-panel titulo="Israel">; caso seja o mesmo nome, posso deixar apenas o @
        ddo.scope = {
            titulo: '@'
        }
        
        //mecanismo de transclude para receber elementos filhos de uma diretiva
        ddo.transclude = true;
        
        //aqui criamos o template para a diretiva
        /*
        ddo.template = 
        //posso escrever o html direto, mas fica veio e meio confuso concaternar aqui, por isso existem os templates
              '<div class="panel panel-default">'
            + '    <div class="panel-heading">'
            + '        <h3 class="panel-title text-center">{{titulo}}</h3>'
            + '    </div>'
            + '    <div class="panel-body" ng-transclude>'
            + '    </div>'
            + '</div>'
        */
        
        ddo.templateUrl = 'js/directives/image-panel.html';
        
        return ddo;        
    });
})();