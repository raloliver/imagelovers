//angular é o core do angular que me permite executar uma série de tarefas
//para criar o módulo, eu deve chamar a função module
//no primeiro parâmetro o módulo recebe o nome e no segundo um array com as depedências, caso elas existam
//sem o array, eu apenas estou usando um outro módulo já existente e não criando um novo
angular.module('imagelovers', ['image-directives','ngAnimate']);
