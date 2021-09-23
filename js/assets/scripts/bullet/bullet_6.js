// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
let bulletBase=require("../bulletBase")

cc.Class({
    extends: bulletBase,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.isDie=false
    },

    start () {

    },

    onDestroy(){
        //console.log("onDestroy")
    },

    onCollisionEnter: function (other, self) {
        let bullet=this.node
        let animation=bullet.getComponent(cc.Animation)
        animation.play("effect")
        cc.tween(bullet)//帧事件回调有问题，改为缓动动画
            .delay(0.5)
            .call(()=>{
                animation.stop("effect")
                this.removeSelf()
            })
            .start()
    },

    update (dt) {
        let move=200*dt
        let bullet=this.node
        let target=bullet.m_target
        if(!target||this.isDie)return

        let targetPos=window.m_gBulletBuild.node.convertToNodeSpaceAR(target.convertToWorldSpaceAR(cc.v2(0,0)))
        //转向角度
        var angle = window.getAngle(bullet.getPosition(),targetPos);
        //数学公式计算
        var x = Math.cos(angle * (Math.PI/180)) * move ;
        var y = Math.sin(angle * (Math.PI/180)) * move ;

        bullet.x += x;
        bullet.y += y;
        bullet.angle=angle
    },
});
