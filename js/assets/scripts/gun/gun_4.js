// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       m_bullet:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_animation=this.node.getComponent(cc.Animation)
    },

    beginFire(target,atk){
        this.m_atk=atk
        let bullet=cc.instantiate(this.m_bullet)
        bullet.m_target=target
        let js=bullet.getComponent("bullet_4")
        js.setAtk(atk)

        let worldPos=this.node.convertToWorldSpaceAR(cc.v2(0,0))
        let nodePos=window.m_gBulletBuild.node.convertToNodeSpaceAR(worldPos)
        var angle = window.getAngle(bullet.getPosition(),nodePos)
        bullet.setPosition(nodePos)
        bullet.active=true
        bullet.parent=window.m_gBulletBuild.node
        bullet.isDie=false
        bullet.angle=angle
    },

    // update (dt) {},
});
