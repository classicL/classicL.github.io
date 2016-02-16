/**
 * Created by xiaohu on 2015/4/21.
 */

//对象的克隆
Object.prototype.deepClone=function(){
    function cloneObj(){}
    cloneObj.prototype = this;
    var obj = new cloneObj();
    for(var o in obj){if(typeof(obj[o])=="object")obj[o]=obj[o].deepClone();}
    return obj;
};

//方块组的构造函数
function Cubes(){
    for (var i = 0; i < 4; i++) {
        this[i] = [];
        for (var j = 0; j < 4; j++) {
            this[i][j] = new Cube(0, i, j);
        }
    }
    this.emptyCube = 16;//cubes中的空方个数
    this.score = 0;//得分
}


var cubes = new Cubes();//创建游戏中用到的方块组

Cubes.prototype.draw = function(ctx){

    ctx.clearRect(0,0,450,450);

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            cubes[i][j].draw(ctx);
        }
    }
};

//Cubes中随机产生value为2的方块
Cubes.prototype.setRandomCube = function(count){
    var c = [],
        len = 0,
        r = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if(this[i][j].value == 0){
                c.push(this[i][j]);
            }
        }
    }
    for(var i = 0; i < count; i++){
        len = c.length;
        r = Math.floor(Math.random()*len);

        c[r].value = 2;
        c.splice(r,1);
        this.emptyCube = len - 1;
    }
};

//按下方向键到移动完成的整个过程
Cubes.prototype.move = function(dir,ctx,func){


    var timer = null,//定时器，用来控制方块运动
        steps = 0;//本次运动移动步数，用来控制没有移动时不产生随机cube

    //newCubes为移动完成后方块组状态，完成运动之后会将cubes替换为newCubes
    var newCubes = new Cubes();
    newCubes.score = cubes.score;

    /*
    1.按下键盘，计算本次运动完成之后各个方块的状态，写入newCubes
     */
    if(dir == 'r'){
        for(var i = 0; i < 4; i++){
            var pos = 3,//移动之后newCubes中每一行需要填充的位置，初始为3
                combine = true;//方块是否可以合并，用来剔除三个或四个相同方块合并。合并后将其置于false；只有移动，没有合并，将其置于true；
            for(var j = 3; j >= 0; j--){
                if(cubes[i][j].value !== 0){
                    if(pos == 3){
                        cubes[i][j].newX = 10 + pos*(cubes[i][j].sideLen + 10);
                        newCubes[i][pos] = cubes[i][j].deepClone();
                        newCubes[i][pos].x = newCubes[i][pos].newX;
                        pos -= 1;
                    }else{
                        if(cubes[i][j].value == newCubes[i][pos+1].value && combine == true){
                            cubes[i][j].newX = 10 + (pos + 1)*(cubes[i][j].sideLen + 10);
                            newCubes[i][pos + 1] = new Cube(cubes[i][j].value * 2,i,pos+1);
                            cubes.score = cubes.score + cubes[i][j].value * 2;
                            newCubes.score = cubes.score;
                            combine = false;
                        }else{
                            cubes[i][j].newX = 10 + pos*(cubes[i][j].sideLen + 10);
                            newCubes[i][pos] = cubes[i][j].deepClone();
                            newCubes[i][pos].x = newCubes[i][pos].newX;
                            pos -= 1;
                            combine = true;
                        }
                    }
                }
            }
            //将newCubes中没有被填充的位置填上空方格
            for(;pos>=0;pos--){
                newCubes[i][pos] = new Cube(0,i,pos);
            }
        }
    }else if(dir == 'l'){
        for(var i = 0; i < 4; i++) {
            var pos = 0,
                combine = true;

            for(var j = 0; j <4; j++){
                if(cubes[i][j].value !== 0){
                	if(pos == 0){
                        cubes[i][j].newX = 10 + pos*(cubes[i][j].sideLen + 10);
                        newCubes[i][pos] = cubes[i][j].deepClone();
                        newCubes[i][pos].x = newCubes[i][pos].newX;
                        pos += 1;
                    }else{
                        if(cubes[i][j].value == newCubes[i][pos-1].value && combine == true){
                            cubes[i][j].newX = 10 + (pos - 1)*(cubes[i][j].sideLen + 10);
                            newCubes[i][pos - 1] = new Cube(cubes[i][j].value * 2,i,pos - 1);
                            cubes.score = cubes.score + cubes[i][j].value * 2;
                            newCubes.score = cubes.score;
                            combine = false;
                        }else{
                            cubes[i][j].newX = 10 + pos*(cubes[i][j].sideLen + 10);
                            newCubes[i][pos] = cubes[i][j].deepClone();
                            newCubes[i][pos].x = newCubes[i][pos].newX;
                            pos += 1;
                            combine = true;
                        }
                    }
                }
            }
            for(;pos < 4; pos++){
                newCubes[i][pos] = new Cube(0,i,pos);
            }
        }
    }else if(dir == 'd'){
        for(var j = 0; j < 4; j++){
            var pos = 3,
                combine = true;
            for(var i = 3; i >= 0; i--){
                if(cubes[i][j].value !== 0){
                	if(pos == 3){
                        cubes[i][j].newY = 10 + pos*(cubes[i][j].sideLen + 10);
                        newCubes[pos][j] = cubes[i][j].deepClone();
                        newCubes[pos][j].y = newCubes[pos][j].newY;
                        pos -= 1;
                    }else{
                        if(cubes[i][j].value == newCubes[pos+1][j].value && combine == true){
                            cubes[i][j].newY = 10 + (pos + 1)*(cubes[i][j].sideLen + 10);
                            newCubes[pos + 1][j] = new Cube(cubes[i][j].value * 2,pos+1,j);
                            cubes.score = cubes.score + cubes[i][j].value * 2;
                            newCubes.score = cubes.score;
                            combine = false;
                        }else{
                            cubes[i][j].newY = 10 + pos*(cubes[i][j].sideLen + 10);
                            newCubes[pos][j] = cubes[i][j].deepClone();
                            newCubes[pos][j].y = newCubes[pos][j].newY;
                            pos -= 1;
                            combine = true;
                        }
                    }
                }
            }
            for(;pos>=0;pos--){
                newCubes[pos][j] = new Cube(0,pos,j);
            }
        }
    }else if(dir == 'u'){
        for(var j = 0; j < 4; j++){
            var pos = 0,
                combine = true;
            for(var i = 0; i <4; i++){
                if(cubes[i][j].value !== 0){
                    if(pos == 0){
                        cubes[i][j].newY = 10 + pos*(cubes[i][j].sideLen + 10);
                        newCubes[pos][j] = cubes[i][j].deepClone();
                        newCubes[pos][j].y = newCubes[pos][j].newY;
                        pos += 1;
                    }else{
                        if(cubes[i][j].value == newCubes[pos - 1][j].value && combine == true){
                            cubes[i][j].newY = 10 + (pos - 1)*(cubes[i][j].sideLen + 10);
                            newCubes[pos - 1][j] = new Cube(cubes[i][j].value * 2,pos - 1,j);
                            cubes.score = cubes.score + cubes[i][j].value * 2;
                            newCubes.score = cubes.score;
                            combine = false;
                        }else{
                            cubes[i][j].newY = 10 + pos*(cubes[i][j].sideLen + 10);
                            newCubes[pos][j] = cubes[i][j].deepClone();
                            newCubes[pos][j].y = newCubes[pos][j].newY;
                            pos += 1;
                            combine = true;
                        }
                    }
                }
            }
            for(;pos < 4;pos++){
                newCubes[pos][j] = new Cube(0,pos,j);
            }
        }
    }

    /*
    2.cubes中方块根据其x和newX产生移动动画
     */
    timer = setInterval(function(){
        var speed = 0;
        if(dir == 'r' || dir == 'd'){
            speed = 10;
        }else{
            speed = -10
        }

        cubes.arrival = true;
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(cubes[i][j].x != cubes[i][j].newX){
                    cubes.arrival = false;
                    cubes[i][j].x += speed;
                    steps += 1;
                }
                if(cubes[i][j].y != cubes[i][j].newY){
                    cubes.arrival = false;
                    cubes[i][j].y += speed;
                    steps += 1;
                }
            }
        }


        cubes.draw(ctx);

        //所有移动到达，将cubes替换为newCubes
        if(cubes.arrival){
            var flag = true;//判断每个方格四周是否有与其value相同的方格标志
            //cubes.score = newCubes.score;
            cubes = newCubes;

            document.getElementById('score').innerHTML = '得分：' + cubes.score;

            //如果有方块移动，产生一个随机方块
            if(steps){
                cubes.setRandomCube(1);
            }
            cubes.draw(ctx);
            clearInterval(timer);
            func();

            //判断每个方格四周是否有与其value相同的方格
            // gameOver:for(var i = 0;i < 4; i++){
            //     for(var j = 0;j < 4; j++){

            //         var bi = i == 3 ? 2 : i + 1;//处于最下方位置的方格，不能与i=4行比，所以将其+1行定为第三行，其他行的+1行不变，便可以直接用下面的方法比较
            //         var si = i == 0 ? 1 : i - 1;
            //         var bj = j == 3 ? 2 : j + 1;
            //         var sj = j == 0 ? 1 : j - 1;
            //         if(cubes[i][j].value == cubes[bi][j].value || cubes[i][j].value == cubes[si][j].value ||
            //             cubes[i][j].value == cubes[i][bj].value || cubes[i][j].value == cubes[i][sj].value){

            //             flag = false;
            //             break gameOver;
            //         }
            //     }
            // }
            gameOverX:for(var i = 0; i < 4; i ++){
            	for(var j = 0; j < 3; j++){
            		if(cubes[i][j].value === cubes[i][j+1].value){
            			flag = false;
            			break gameOverX;
            		}
            	}
            }
            gameOverY:for (var i = 0; i < 3; i++) {
            	for(var j = 0; j < 4; j++){
            		if(cubes[i][j].value === cubes[i+1][j].value){
            			flag = false;
            			break gameOverY;
            		}
            	}	
            };

            //在移动和产生新方块之后，如果空方格为0并且没法方格不与value相同的方格相邻，游戏结束；
            if(flag == true && cubes.emptyCube == 0){
                alert('game over');
            }
        }
    },5);
};
