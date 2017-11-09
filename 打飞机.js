/**
 * Created by apple on 16/6/29.
 */
//获得开始界面
var startDiv=document.getElementById("startdiv");
var mainDiv=document.getElementById("maindiv");
var suspendDiv=document.getElementById("suspenddiv");
var endDiv=document.getElementById("enddiv");
var selfPlane=new Plane(1,150,400,66,80,0,0,"plane/image/我的飞机.gif","","plane/image/本方飞机爆炸.gif");
var timeSet;
var endScore=document.getElementById("endscore");
var score=document.getElementById("scorelabel");
 var scoreNum=0;
var num=0;


/*1   子弹打到飞机  判断坐标   子弹 敌机,敌机hp-,当hp为0 的时候死,死->切换图片源(爆炸),分数增加,死飞机移除
n个子弹,n个敌机
for(i=0;i<子弹个数;i++){
    //每个子弹(1)
    for(j=0;j<敌机个数;j++){
        bulletArray[i] 与 enemyArray[j]比较 判断撞击
    }
}
2   我方飞机死:  判断:我方飞机-地方飞机, 我就死了,整个游戏停止,停止定时器
3   暂停: 鼠标点击,暂停 :定时器停止,暂停界面出现
* /
/*
 飞机:
 图片:
 爆炸图片:
 血条:HP
 坐标:x y
 飞机大小:w h
 飞机分数:score
 飞机速度:speed
 */

function Plane(hp,px,py,pw,ph,score,speed,imgSrc,aiImgSrc,boomImgSrc) {
    this.hp=hp;
    this.px=px;
    this.py=py;
    this.pw=pw;
    this.ph=ph;
    this.score=score;
    this.speed=speed;
    this.imgSrc=imgSrc;
    this.aiImgSrc=aiImgSrc;
    this.boomImgSrc=boomImgSrc;
    this.num=0;
    this.isDied=false;
    this.move=function () {
        //对敌机移动的调用
          this.image.style.top=this.image.offsetTop+this.speed+"px";
    };

    this.init=function () {
        this.image=document.createElement("img");
        this.image.src=this.imgSrc;
        this.image.style.left=this.px+"px";
        this.image.style.top=this.py+"px";
        //把img标签插入到maindiv标签下面
        mainDiv.appendChild(this.image);
    }
    this.init();

}
//子弹
function bullet(bx,by,bw,bh,imgSrc) {
    this.bx = bx;
    this.by = by;
    this.bw = bw;
    this.bh = bh;
    this.imgSrc = imgSrc;
    this.init = function () {
        this.image = document.createElement("img");
        this.image.src = this.imgSrc;
        this.image.style.left = this.bx + "px";
        this.image.style.top = this.by + "px";
        mainDiv.appendChild(this.image);
    }
    this.move=function () {
        this.image.style.top=this.image.offsetTop-20+"px";
    }
    this.init();
}
function daoJu(dx,dy,dw,dh,speed,imgSrc) {
     this.dx = dx;
    this.dy = dy;
     this.dw = dw;
    this.dh = dh;
    this.speed=speed;
    this.imgSrc = imgSrc;
     this.init = function () {
         this.image = document.createElement("img");
         this.image.src = this.imgSrc;
         this.image.style.left = this.dx + "px";
         this.image.style.top = this.dy + "px";
         mainDiv.appendChild(this.image);
    }
    this.move=function () {
        this.image.style.top=this.image.offsetTop+this.speed+"px";
    }
   this.init();
 }


/*
 敌方飞机出现特点;
 打飞机,中飞机,小飞机
 5个小+1个中
 20个小+1个大

 飞机都是从上往下飞
 飞机速度随机值   1-4
 飞机x坐标,随机值   0-320
 */
    function myrandom(min,max) {
        //floor向下取整
           return Math.floor(min+(max-min)*Math.random());
    }
var bulletArray=[];
    var enemyArray=[];
var daojuArray=[]
    var flag1=0;
    var flag2=0;
var flag3=0;
    function timerAction() {
        //敌方飞机
        //01  创建difangfeiji
flag3++;
        if(flag3==400){
            daojuArray.push(daoju );
            var daoju=new daoJu (myrandom(0,294),0,26,26,myrandom(1,3),"123.png");
            flag3=0;
        }



        flag1++;//如果定时器触发20次
        if(flag1==20)
        {
            for(var i = 0; i<enemyArray.length;i++) {

            }
            flag2++;
            if(flag2%5==0){
                //创建中型飞机
                var mplane=new Plane(5,myrandom(0,320-46),-100,46,60,200,myrandom(1,2),"plane/image/enemy3_fly_1.png","plane/image/中飞机挨打.png","plane/image/中飞机爆炸.gif");
                enemyArray.push(mplane);
            }
             if(flag2%20==0) {
                 //创建大飞机
                 var lplane = new Plane(20, myrandom(0, 210), -170, 110, 164, 500, 1, "plane/image/enemy2_fly_1.png","plane/image/大飞机挨打.png", "plane/image/大飞机爆炸.gif");
                 enemyArray.push(lplane); 
                 flag2=0;
             }


            else{
                 //创建小飞机
                var splane=new Plane(1,myrandom(0,284),-100,32,24,50,myrandom(1,3),"plane/image/enemy1_fly_1.png","","plane/image/小飞机爆炸.gif");
                enemyArray.push(splane);
               
            }
            flag1=0;
        }

        if(scoreNum>300){
            var bullets2 = new bullet(selfPlane.image.offsetLeft + 50, selfPlane.image.offsetTop - 5, 6, 14, "plane/image/bullet1.png");
            var bullets3 = new bullet(selfPlane.image.offsetLeft +10,selfPlane.image.offsetTop - 5, 6, 14, "plane/image/bullet1.png");
            bulletArray.push(bullets2);
            bulletArray.push(bullets3);
        }




        //02   敌方飞机行为
        for(var i=0;i<enemyArray.length;i++){
            //如果飞机没有死则移动
            if(enemyArray[i].isDied==false){
            enemyArray[i].move();
            }else{
                enemyArray[i].num++;
                if(enemyArray[i].num==30){
                    mainDiv.removeChild(enemyArray[i].image);
                    enemyArray.splice(i,1);
                }
            }
            //如果飞机已经抛出屏幕,则从数组中移除飞机,从maindiv移除img元素
           if(enemyArray[i].image.offsetTop>568){
               //从img标签移除
               mainDiv.removeChild(enemyArray[i].image);
               //数组中移除i元素
               enemyArray.splice(i,1);
           }
        }
        //三-----------子弹--------------------
        if(flag1%5==0) {
            var x = selfPlane.image.offsetLeft + 30;
            var y = selfPlane.image.offsetTop - 5;
            var bullets = new bullet(x, y, 6, 14, "plane/image/bullet1.png");
            bulletArray.push(bullets);
        }
            for(i=0;i<bulletArray.length;i++) {
                bulletArray[i].move();
                //如果子弹付出屏幕则删除
                if (bulletArray[i].image.offsetTop < 0) {
                    mainDiv.removeChild(bulletArray[i].image);
                    bulletArray.splice(i, 1);
                }
            }
        //子弹个数 挨打  爆炸  hp减少 去除 所有子弹与所有敌方飞机比较 加分 hp归零死
        //自己飞机与敌方飞机比较
        for(var j=0;j<bulletArray.length;j++){
            for( var i=0;i<enemyArray.length;i++){
               if( (bulletArray[j].image.offsetLeft+bulletArray[j].bw>enemyArray[i].image.offsetLeft&&
               bulletArray[j].image.offsetLeft<enemyArray[i].image.offsetLeft+enemyArray[i].pw)&&
                   ( bulletArray[j].image.offsetTop<enemyArray[i].image.offsetTop+enemyArray[i].ph ))
               {
                   //enemyArray[i].image.src=enemyArray[i].aiImgSrc;
                   mainDiv.removeChild(bulletArray[j].image);
                   bulletArray.splice(j,1);
                   enemyArray[i].hp--;
                   if(enemyArray[i].hp==0){
                       enemyArray[i].image.src=enemyArray[i].boomImgSrc;
                       enemyArray[i].isDied=true;
                       scoreNum+=enemyArray[i].score;
                       score.innerHTML=scoreNum;
                   }
               }
            }
        }
        for(i=0;i<enemyArray.length;i++){
            if(selfPlane.image.offsetLeft+selfPlane.pw>enemyArray[i].image.offsetLeft&&
            selfPlane.image.offsetLeft<enemyArray[i].image.offsetLeft+enemyArray[i].pw&&
                (selfPlane.image.offsetTop<enemyArray[i].image.offsetTop+enemyArray[i].ph&&
                selfPlane.image.offsetTop+selfPlane.ph>enemyArray[i].image.offsetTop)){

                selfPlane.image.src = selfPlane.boomImgSrc;
                endDiv.style.display="block";
                selfPlane.isDead = true;
                endScore.innerHTML=scoreNum;
                mainDiv.removeEventListener("mousemove",mouseMoveAction,true)
                clearInterval(timeSet);
            }
        }

    }

function goOn(){
    suspendDiv.style.display="none";
    timeSet=setInterval(timerAction,20);
    mainDiv.addEventListener("mousemove",mouseMoveAction,true);
    pauseFlag=0;
}
function restart(){
    mainDiv.addEventListener("mousemove",mouseMoveAction,true);
    suspendDiv.style.display="none";
    for(var i=0;i<enemyArray.length;i++){
    mainDiv.removeChild(enemyArray[i].image);
    }
    enemyArray.splice(0,enemyArray.length);
    for(var j=0;j<bulletArray.length;j++){
        mainDiv.removeChild(bulletArray[j].image);
    }
    bulletArray.splice(0,bulletArray.length);
    pauseFlag=0;
   timeSet=setInterval(timerAction,20);
    scoreNum=0;
}
function huiDaoYouXi(){
    mainDiv.addEventListener("mousemove",mouseMoveAction,true);
    startDiv.style.display="block";
    mainDiv.style.display="none";
    suspendDiv.style.display="none";
    endDiv.style.display="none";
    for(var i=0;i<enemyArray.length;i++){
        mainDiv.removeChild(enemyArray[i].image);
    }
    //enemyArray.splice(0,enemyArray.length);
    enemyArray=[];
    for(var j=0;j<bulletArray.length;j++){
        mainDiv.removeChild(bulletArray[j].image);
    }
    bulletArray=[];
    selfPlane.image.src=selfPlane.imgSrc;
    scoreNum=0;
    pauseFlag=0;
}

function mouseMoveAction() {
    var e=window.event;
    var x=e.clientX-200;
    var y=e.clientY;
    if(x>0&&x<320&&y>0&&y<568){
    selfPlane.image.style.left=x-selfPlane.pw/2+"px";
    selfPlane.image.style.top=y-selfPlane.ph/2+"px";
    }
}
var pauseFlag=0;
function clickAction() {

    if(pauseFlag==0){
        mainDiv.removeEventListener("mousemove",mouseMoveAction,true);
        suspendDiv.style.display="block";
        clearInterval(timeSet);
        pauseFlag=1;
    }
    else{
        suspendDiv.style.display="none";
       timeSet=setInterval(timerAction,20);
       pauseFlag=0;
        mainDiv.addEventListener("mousemove",mouseMoveAction,true);
    }
}
//添加事件监听
function addEventsListener() {
    //鼠标移动
    mainDiv.addEventListener("mousemove",mouseMoveAction,true);
    //鼠标点击
    selfPlane.image.addEventListener("click",clickAction,true);
}

function begin() {
    startDiv.style.display="none";
    mainDiv.style.display="block";
   timeSet=setInterval(timerAction,20);
    addEventsListener();
}

