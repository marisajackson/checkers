(function(){
  'use strict';

  $(document).ready(initialize);

  function initialize(){
    setupBoard();
    $('.validSpace').click(selectPiece);
  }

  function selectPiece(){
    if ($('.selected').length > 0){
      $('.selected').removeClass('selected');
    }
    $(this).addClass('selected');
  }

  function setupBoard(){
    $('tr:nth-child(2n) td:nth-child(2n +1)').addClass('validSpace');
    $('tr:nth-child(2n - 1) td:nth-child(2n)').addClass('validSpace');
    var spaces = $('.validSpace');
    for (var i = 0; i < 12; i++){
      $(spaces[i]).addClass('player2');
    }
    for(i = 20; i < 32; i++){
      $(spaces[i]).addClass('player1');
    }
  }


})();
