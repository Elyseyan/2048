
function showNumberWithAnimation(x,y,number) {
    var numberCell=$('#number-cell-'+x+"-"+y);
    var name=designName(number);
    numberCell.css("background-color",getBackgroundColor(number));
    numberCell.css("color",getNumberColor(number));
   numberCell.text(name);
    numberCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(x,y),
        left:getPosLeft(x,y),
    });
}
function showMoveAnimation(fromX,fromY,toX,toY){
    var numberCell=$('#number-cell-'+fromX+'-'+fromY);
    numberCell.animate({
        top:getPosTop(toX,toY),
        left:getPosLeft(toX,toY)
    },200);
}