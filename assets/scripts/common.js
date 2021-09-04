
window.m_gMapDataManager=null;
window.m_gMonsterBuild=null;
window.m_gCannonBuild=null;
window.m_gBulletBuild=null
window.m_gCannonRange=230;
window.m_gBulletEffect=null
window.m_gGameUI=null
window.m_gMapBuild=null
window.m_gMonsterSpeed=10
window.m_gGame=null
window.m_gkLevel=1

window.GAME_INIT=0
window.GAME_START=1
window.GAME_OVER=2
window.GAME_STOP=3
window.GAME_END=4
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
    {
      "chapter":1,"level":1,"success":10000,"fail":1000,"type":0,"data": [   
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
        {type:0,id:8,hp:1,speed:0.8}]
    },
    {
      "chapter":1,"level":2,"success":10000,"fail":1000,"type":1,"data": [   
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
        {type:0,id:8,hp:1,speed:0.8}]
    },
    {
      "chapter":1,"level":3,"success":10000,"fail":1000,"type":0,"data": [   
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
        {type:0,id:8,hp:1,speed:0.8}]
    },
    {
      "chapter":1,"level":4,"success":10000,"fail":1000,"type":1,"data": [   
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
        {type:0,id:8,hp:1,speed:0.8}]
    }
  ]
  
  obj.levelDesign.getLevelData = function(level){
      var len = this.levelDesign.length;
      if( level >= len ){
        level=len
      }
      return this.levelDesign[level-1];
  }.bind(obj);
}

window.g_GlobalData = createGlobalData();
buildMonsterData(window.g_GlobalData);
///////////////////////////////////////////////////数据本地存储
window.g_LocalData={}
window.g_LocalData.m_data={}
window.g_LocalData.m_data.m_gold=0
window.g_LocalData.m_data.m_coin=0
window.g_LocalData.saveData=function(){
  let jsonData=JSON.stringify(window.g_LocalData.m_data)
  cc.sys.localStorage.setItem("LocalData",jsonData)
} 
window.g_LocalData.delData=function(){
  cc.sys.localStorage.removeItem("LocalData")
  cc.sys.localStorage.clear()
  window.g_LocalData.saveData()
}
window.g_LocalData.getData=function(){
  let jsonData=cc.sys.localStorage.getItem("LocalData")
  if(!jsonData){
    window.g_LocalData.m_data={}
    window.g_LocalData.m_data.m_gold=0
    window.g_LocalData.m_data.m_coin=0
    return
  }
  window.g_LocalData.m_data=JSON.parse(jsonData)
}

window.g_LocalData.getGold=function(){
  window.g_LocalData.getData()

  return  window.g_LocalData.m_data.m_gold
}
window.g_LocalData.addGold=function(_gold){
  window.g_LocalData.getData()

  window.g_LocalData.m_data.m_gold+=_gold
  if(0>window.g_LocalData.m_data.m_gold)
    window.g_LocalData.m_data.m_gold=0
  window.g_LocalData.saveData()

  window.m_gGameUI.updateGold()
}

window.g_LocalData.getCoin=function(){
  window.g_LocalData.getData()

  return  window.g_LocalData.m_data.m_coin
}
window.g_LocalData.addCoin=function(_coin){
  window.g_LocalData.getData()

  window.g_LocalData.m_data.m_coin+=_coin
  if(0>window.g_LocalData.m_data.m_coin)
    window.g_LocalData.m_data.m_coin=0
  window.g_LocalData.saveData()

  window.m_gGameUI.updateCoin()
}
  