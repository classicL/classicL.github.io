/**
 * Created by xiaohu on 2015/4/20.
 */

window.onload = function(){

    var canvas = document.getElementsByTagName('canvas')[0],
        ctx = canvas.getContext('2d'),
        scoreDiv = document.getElementById('score'),
        restartBtn = document.getElementById('btn');

    init(ctx);

    restartBtn.onclick = function(){
        init(ctx);
    };

    window.onkeydown =function(event){
        keydownFunc(event);
    };

    function keyDown(event){

        window.onkeydown = null;
        var e = window.event||event;
        var dir;

        switch (e.keyCode){
            case 37:
                dir = 'l';
                break;
            case 38:
                dir = 'u';
                break;
            case 39:
                dir = 'r';
                break;
            case 40:
                dir = 'd';
                break;
        }

        cubes.move(dir,ctx,setKey);

        scoreDiv.innerHTML = '得分：' + cubes.score;

    }

    function setKey(){
        window.onkeydown =function(event){
            keydownFunc(event);
        };
    }

    function init(ctx){
        cubes = new Cubes();
        cubes.setRandomCube(2);
        cubes.draw(ctx);
        scoreDiv.innerHTML = '得分：' + cubes.score;
    }
    function keydownFunc(event){
        var e = window.event||event;
            if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40){
                keyDown(event)
            }
    }
};






