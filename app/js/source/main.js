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
    $('td[data-x='+x+'][data-y='+y+']').removeClass('piece player1 player2 king');
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
          isDoubleJump(x, y, offY);
          captured(x2, y2);
          return true;
        }
      } else {
        if((offY < 0 || isKing()) && isOppPiece(x2,y2,'player1')){
          isDoubleJump(x, y, offY);
          captured(x2, y2);
        return true;
        }
      }
    }
    return false;
  }

  function isDoubleJump(x, y, offY){
    var topLeft = [x-1, y-1];
    var topRight = [x+1, y-1];
    var bottomLeft = [x-1, y+1];
    var bottomRight = [x+1, y+1];

    if($('.selected').hasClass('player1')){
      if ((offY > 0 || isKing()) && isOppPiece(topLeft[0], topLeft[1], 'player2') && !$('td[data-x='+(x-2)+'][data-y='+(y-2)+']').hasClass('piece')){
        captured(topLeft[0], topLeft[1]);
        move('td[data-x='+ (x-2) +'][data-y='+ (y-2) +']');
        $('td[data-x='+x+'][data-y='+y+']').removeClass('player2 piece king current selected');
        if (y-2 === 0){
          $('td[data-x='+(x-2)+'][data-y='+(y-2)+']').addClass('king');
        }
      } else if ((offY > 0 || isKing()) && isOppPiece(topRight[0], topRight[1], 'player2') && !$('td[data-x='+(x+2)+'][data-y='+(y-2)+']').hasClass('piece')){
        captured(topRight[0], topRight[1]);
        move('td[data-x='+ (x+2) +'][data-y='+ (y-2) +']');
        $('td[data-x='+x+'][data-y='+y+']').removeClass('player2 piece king current selected');
        if (y-2 === 0){
          $('td[data-x='+(x+2)+'][data-y='+(y-2)+']').addClass('king');
        }
      } else if (isKing() && isOppPiece(bottomLeft[0], bottomLeft[1], 'player2') && !$('td[data-x='+(x-2)+'][data-y='+(y+2)+']').hasClass('piece')){
          captured(bottomLeft[0], bottomLeft[1]);
          move('td[data-x='+ (x-2) +'][data-y='+ (y+2) +']');
          $('td[data-x='+x+'][data-y='+y+']').removeClass('player2 piece king current selected');
      } else if (isKing() && isOppPiece(bottomRight[0], bottomRight[1], 'player2') && !$('td[data-x='+(x+2)+'][data-y='+(y+2)+']').hasClass('piece')){
          captured(bottomRight[0], bottomRight[1]);
          move('td[data-x='+ (x+2) +'][data-y='+ (y+2) +']');
          $('td[data-x='+x+'][data-y='+y+']').removeClass('player2 piece king current selected');
      }
    }

    if($('.selected').hasClass('player2')){
      if (isKing() && isOppPiece(topLeft[0], topLeft[1], 'player1') && !$('td[data-x='+(x-2)+'][data-y='+(y-2)+']').hasClass('piece')){
        captured(topLeft[0], topLeft[1]);
        move('td[data-x='+ (x-2) +'][data-y='+ (y-2) +']');
        $('td[data-x='+x+'][data-y='+y+']').removeClass('player1 piece king current selected');
      } else if (isKing() && isOppPiece(topRight[0], topRight[1], 'player1') && !$('td[data-x='+(x+2)+'][data-y='+(y-2)+']').hasClass('piece')){
        captured(topRight[0], topRight[1]);
        move('td[data-x='+ (x+2) +'][data-y='+ (y-2) +']');
        $('td[data-x='+x+'][data-y='+y+']').removeClass('player1 piece king current selected');
      } else if ((offY < 0 || isKing()) && isOppPiece(bottomLeft[0], bottomLeft[1], 'player1') && !$('td[data-x='+(x-2)+'][data-y='+(y+2)+']').hasClass('piece')){
          captured(bottomLeft[0], bottomLeft[1]);
          move('td[data-x='+ (x-2) +'][data-y='+ (y+2) +']');
          $('td[data-x='+x+'][data-y='+y+']').removeClass('player1 piece king current selected');
          if (y+2 === 7){
            $('td[data-x='+(x-2)+'][data-y='+(y+2)+']').addClass('king');
          }
      } else if ((offY < 0 || isKing()) && isOppPiece(bottomRight[0], bottomRight[1], 'player1') && !$('td[data-x='+(x+2)+'][data-y='+(y+2)+']').hasClass('piece')){
          captured(bottomRight[0], bottomRight[1]);
          move('td[data-x='+ (x+2) +'][data-y='+ (y+2) +']');
          $('td[data-x='+x+'][data-y='+y+']').removeClass('player1 piece king current selected');
        if (y+2 === 7){
          $('td[data-x='+(x+2)+'][data-y='+(y+2)+']').addClass('king');
        }
      }
    }



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
      $('.selected').removeClass('player1 piece king current selected');
      $(current).addClass('player1 piece');
      $('.player1').removeClass('current');
      $('.player2').addClass('current');
    } else if($('.selected').hasClass('player2')) {
      $('.selected').removeClass('player2 piece king current selected');
      $(current).addClass('player2 piece');
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
