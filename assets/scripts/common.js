
window.m_gMapDataManager=null;
window.m_gMonsterBuild=null;
window.m_gCannonBuild=null;
window.m_gBulletBuild=null
window.m_gCannonRange=230;
window.m_gBulletEffect=null
window.m_startGame=false

//生成从minNum到maxNum的随机数
window.random=function(minNum, maxNum) {
    switch (arguments.length) {
      case 1:
        return parseInt(Math.random() * minNum + 1, 10);
        break;
      case 2:
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        //或者 Math.floor(Math.random()*( maxNum - minNum + 1 ) + minNum );
        break;
      default:
        return 0;
        break;
    }
}
  
window.getAngle=function(start, end) {
    //两点的x、y值
    var x = end.x - start.x;
    var y = end.y - start.y;
    var hypotenuse = Math.sqrt(x * x + y * y);

    //斜边长度
    var cos = x / hypotenuse;

    var radian = Math.acos(cos);

    //求出弧度
    var angle = 180 / (Math.PI / radian);

    //用弧度算出角度
    if (y < 0) {
        angle = 0 - angle;
    }
    else if (y == 0 && x < 0) {
        angle = 180;
    }
    return angle;
}

window.getDistance=function(start,end){
    var pos = cc.v2(start.x - end.x,start.y - end.y);
    var dis = Math.sqrt(pos.x*pos.x + pos.y * pos.y);
    return dis;
}

function createGlobalData(){
  var obj = new Object();

  obj.cannonUpLevel = [
      //圆炮
      {type:6,level:0,atk:1},//0
      {type:6,level:1,atk:10},//1
      {type:6,level:2,atk:80},//2
      //闪电炮
      {type:1,level:0,atk:180},//3
      {type:1,level:1,atk:260},//4
      {type:1,level:2,atk:540},//5
      //导弹炮
      {type:3,level:0,atk:680},//6
      {type:3,level:1,atk:780},
      {type:3,level:2,atk:960},
      //音波炮
      {type:4,level:0,atk:1100},//10
      {type:4,level:1,atk:1200},
      {type:4,level:2,atk:1350},
      //紫光炮
      {type:2,level:0,atk:1300},//13
      {type:2,level:1,atk:1550},
      {type:2,level:2,atk:1680},
      
      //激光炮
      {type:0,level:0,atk:1980},//16
      {type:0,level:1,atk:2200},
      {type:0,level:2,atk:2800},
      
      //圆炮
      {type:6,level:3,atk:3800},//19
      {type:6,level:4,atk:4800},//
      {type:6,level:5,atk:6800},//
      
      //闪电炮
      {type:1,level:3,atk:9800},//22
      {type:1,level:4,atk:13500},//
      {type:1,level:5,atk:17000},//
  ];


  return obj;
}

function buildMonsterData(obj){
  obj.levelDesign = 
  [
      //第一关
      [   
          {type:0,id:0,hp:1,speed:0.8},
          {type:0,id:1,hp:1,speed:0.8},
          {type:0,id:1,hp:1,speed:0.8},
          {type:0,id:1,hp:1,speed:0.8},
          {type:0,id:1,hp:1,speed:0.8},
          {type:1,id:0,hp:5,speed:1.2},
          {type:0,id:2,hp:1,speed:0.8},
          {type:0,id:3,hp:1,speed:0.8},
          {type:0,id:4,hp:1,speed:0.8},
          {type:1,id:1,hp:5,speed:1.2},
          {type:0,id:6,hp:1,speed:0.8},
          {type:0,id:6,hp:1,speed:0.8},
          {type:0,id:7,hp:1,speed:0.8},
          {type:0,id:8,hp:1,speed:0.8},
          {type:0,id:8,hp:1,speed:0.8},
          {type:0,id:8,hp:1,speed:0.8},
      ]
  ];
  obj.levelDesign.getLevelData = function(level){
      var len = this.levelDesign.length;
      if( level >= len ){
        level=len
      }
      return this.levelDesign[level-1];
  }.bind(obj);
}

window.g_GlobalData = createGlobalData();
buildMonsterData(g_GlobalData);
  