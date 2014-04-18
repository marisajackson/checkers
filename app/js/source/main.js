(function(){
  'use strict';

  $(document).ready(initialize);

  function initialize(){
    setupBoard();
    $('#board').on('click', '.validSpace.current.piece', selectPiece);
    $('#board').on('click', 'td:not(.piece)', move);
  }

  function move(){
    if ($('.selected').length > 0){
      if($('.selected').hasClass('player1')){
        $(this).addClass('player1 piece');
        $('.selected').removeClass('player1 piece selected current');
        $('.player1').removeClass('current');
        $('.player2').addClass('current');
      } else {
        $(this).addClass('player2 piece');
        $('.selected').removeClass('player2 piece selected current');
        $('.player2').removeClass('current');
        $('.player1').addClass('current');
      }
    }
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
      $(spaces[i]).addClass('player2 piece');
    }
    for(i = 20; i < 32; i++){
      $(spaces[i]).addClass('player1 piece current');
    }
  }


})();
