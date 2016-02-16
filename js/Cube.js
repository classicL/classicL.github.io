/**
 * Created by xiaohu on 2015/4/20.
 */


function  Cube(value,i,j) {
    if(this == window){
        alert('Create Cube False');
        return;
    }

    this.value = value;
    this.sideLen = 100;
    this.y = 10+i*(this.sideLen+10);
    this.x = 10+j*(this.sideLen+10);
    this.newY = 10+i*(this.sideLen+10);
    this.newX = 10+j*(this.sideLen+10);
    this.color = ['#fff','#eee','#ddd','#ccc','#bbb','#aaa','#999','#888','#777','#666','#555','#444'];

}

Cube.prototype.draw = function(ctx){
    if(this.value == 0){return}
    ctx.beginPath();
    ctx.fillStyle = this.color[parseInt(Math.log(this.value)/Math.log(2))];
    ctx.fillRect(this.x,this.y,100,100);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '20px Verdana';
    ctx.fillText(this.value,this.x+50,this.y+50,100);
    ctx.closePath();
};





