
window.m_gMapDataManager=null;
window.m_gMonsterBuild=null;
window.m_gCannonBuild=null;

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
  