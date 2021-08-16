// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       m_bulletNode:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_animation=this.node.getComponent(cc.Animation)
    },

    beginFire(target,atk){
        this.m_atk=atk
        this.m_target=target
        this.m_animation.play("action")
    },
    endFire(target,atk){
        this.m_atk=atk
        this.m_target=target
        this.m_animation.stop("action")
    },

    over(){
        this.endFire(this.m_target,this.m_atk);
        this.createBullet()
        this.m_target=null
    },

    createBullet(){
        let bullet=cc.instantiate(this.m_bulletNode)
        bullet.m_target=this.m_target
        let js=bullet.getComponent("bullet_3")
        js.setAtk(this.m_atk)

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
