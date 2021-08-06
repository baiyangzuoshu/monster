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
       m_bullet:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_animation=this.node.getComponent(cc.Animation)
    },

    beginFire(target){
        this.m_target=target
        this.m_fire.active=true;
        this.m_animation.play("fire");
    },
    endFire(target){
        this.m_target=target;
        this.m_fire.active=false;
        this.m_animation.stop("fire");
    },

    over(){
        this.endFire(this.m_target);
        this.createBullet()
        this.m_target=null
    },

    createBullet(){
        let bullet=cc.instantiate(this.m_bullet)
        bullet.m_target=this.m_target

        m_gBulletBuild.createBullet(bullet,this.node)
    },

    // update (dt) {},
});
