(function(){
  'use strict';

  $(document).ready(initialize);

  function initialize(){
    setupBoard();
    $('#board').on('click', '.current.piece', selectPiece);
    $('#board').on('click', 'td:not(.piece)', checkSpace);
  }

  function checkSpace(){
    if ($('.selected').length && $(this).hasClass('validSpace')){
      if (isDiag($(this).data('x'), $(this).data('y'))){
        if (($('.selected').hasClass('player1') && $(this).data('y') === 0) ||
          ($('.selected').hasClass('player2') && $(this).data('y') === 7)){
          $(this).addClass('king');
        } 
        move(this);
      }
    }
  }

  function captured(x, y){
    $('td[data-x='+x+'][data-y='+y+']').removeClass('piece player1 player2');
  }

  function isDiag(x,y){
    var currXY = getCurrentPiecePos();
    var offX = currXY[0] - x;
    var offY = currXY[1]-y;

    if(Math.abs(offX) === 1 && Math.abs(offY) === 1) {
      if($('.selected').hasClass('player1')) {
        return ((offY > 0) || isKing());
      } else {
        return ((offY < 0) || isKing());
      }
    }

    if (Math.abs(offX) === 2 && Math.abs(offY) === 2) { //trying to jump
      var x2 = currXY[0]-(offX/2);
      var y2 = currXY[1]-(offY/2);
      if($('.selected').hasClass('player1')) {
        if ((offY > 0 || isKing()) && isOppPiece(x2,y2,'player2')){
          captured(x2, y2);
          return true;
        }
      } else {
        if((offY < 0 || isKing()) && isOppPiece(x2,y2,'player1')){
        captured(x2, y2);
        return true;
        }
      }
    }
    return false;
  }

  function isKing(){
    return $('.selected').hasClass('king');
  }

  function isOppPiece(x,y,player){
    return $('td[data-x='+x+'][data-y='+y+']').hasClass(player);
  }

  function getCurrentPiecePos(){
    var xy=[];
    xy[0] = $('.selected').data('x');
    xy[1] = $('.selected').data('y');
    return xy;
  }

  function move(current){
    if($('.selected').hasClass('king')){
      $(current).addClass('king');
    }
    if($('.selected').hasClass('player1')){
      $(current).addClass('player1 piece');
      $('.selected').removeClass('player1 piece selected king current');
      $('.player1').removeClass('current');
      $('.player2').addClass('current');
    } else {
      $(current).addClass('player2 piece');
      $('.selected').removeClass('player2 piece selected king current');
      $('.player2').removeClass('current');
      $('.player1').addClass('current');
    }
  }

  function selectPiece(){
    if ($('.selected').length){
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
