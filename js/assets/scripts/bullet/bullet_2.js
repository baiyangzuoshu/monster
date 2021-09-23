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
        m_effect:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.isDie=false
    },

    start () {

    },

    onCollisionEnter: function (other, self) {
        this.node.active=false
        this.effect=cc.instantiate(this.m_effect)
        this.effect.x=this.node.x
        this.effect.y=this.node.y
        this.effect.active=true
        this.effect.parent=this.node.parent

        let animation=this.effect.getComponent(cc.Animation)
        animation.play("effect")
        animation.over=function(){
            animation.stop("effect")
            this.effect.destroy()

           this.removeSelf()
        }.bind(this)
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
