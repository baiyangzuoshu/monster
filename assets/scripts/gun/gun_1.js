// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       m_fire:cc.Node,
       m_bullet:cc.Node,
       m_buuletEffect:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_animation=this.node.getComponent(cc.Animation)
    },

    beginFire(target,atk){
        this.m_atk=atk
        this.m_target=target
        this.m_fire.active=true;
        this.m_animation.play("fire");
        
    },
    endFire(target,atk){
        this.m_atk=atk
        this.m_target=target;
        this.m_fire.active=false;
        this.m_animation.stop("fire");
    },

    over(){
        this.endFire(this.m_target,this.m_atk);
        this.createBullet()
        this.m_target=null
    },

    createBullet(){
        let bullet=cc.instantiate(this.m_bullet)
        bullet.m_target=this.m_target
        let targetPos=this.m_target.convertToWorldSpaceAR(cc.v2(0,0))
        let gunPos=this.node.convertToWorldSpaceAR(cc.v2(0,0))
        let dis=Math.abs(window.getDistance(targetPos,gunPos));//距离判断
        let js=bullet.getComponent("bullet_1")
        js.setAtk(this.m_atk)
        js.init(dis)

        let worldPos=this.node.convertToWorldSpaceAR(cc.v2(0,0))
        let nodePos=window.m_gBulletBuild.node.convertToNodeSpaceAR(worldPos)
        var angle = window.getAngle(bullet.getPosition(),nodePos)
        bullet.setPosition(nodePos)
        bullet.active=true
        bullet.parent=window.m_gBulletBuild.node
        bullet.angle=angle-90
    },

    // update (dt) {},
});
