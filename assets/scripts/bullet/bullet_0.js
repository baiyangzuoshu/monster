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
        
    },

    init (dis) {
        this.isDie=false
        let bullet=this.node
        bullet.width=dis
        cc.tween(bullet)
            .delay(0.5)
            .call(()=>{
                this.isDie=true
                this.hit(this.getAtk(),this.node.m_target)
                bullet.removeFromParent()
            })
            .start()
    },

    update (dt) {
        let bullet=this.node
        let target=bullet.m_target
        if(!target||this.isDie)return

        let targetPos=window.m_gBulletBuild.node.convertToNodeSpaceAR(target.convertToWorldSpaceAR(cc.v2(0,0)))
        
        //转向角度
        var angle = window.getAngle(bullet.getPosition(),targetPos);
        bullet.angle=angle
    },
});
