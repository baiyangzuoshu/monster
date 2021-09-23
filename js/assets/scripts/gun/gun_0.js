// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       m_bullet:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    beginFire(target,atk){
        this.m_atk=atk

        let bullet=cc.instantiate(this.m_bullet)
        bullet.m_target=target
        let targetPos=target.convertToWorldSpaceAR(cc.v2(0,0))
        let gunPos=this.node.convertToWorldSpaceAR(cc.v2(0,0))
        let dis=Math.abs(window.getDistance(targetPos,gunPos));//距离判断
        dis+=target.width/2
        let js=bullet.getComponent("bullet_0")
        js.setAtk(atk)
        js.init(dis)

        let worldPos=this.node.convertToWorldSpaceAR(cc.v2(0,0))
        let nodePos=window.m_gBulletBuild.node.convertToNodeSpaceAR(worldPos)
        var angle = window.getAngle(bullet.getPosition(),nodePos)
        bullet.setPosition(nodePos)
        bullet.active=true
        bullet.parent=window.m_gBulletBuild.node
        bullet.angle=angle
    },
    // update (dt) {},
});
