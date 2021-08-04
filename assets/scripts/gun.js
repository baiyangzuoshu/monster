// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       m_fire:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_animation=this.node.getComponent(cc.Animation)
    },

    beginFire(){
        this.m_fire.active=true;
        this.m_animation.play("fire");
    },
    endFire(){
        this.m_fire.active=false;
        this.m_animation.stop("fire");
    },

    over(){
        this.endFire();
    },

    start () {

    },

    // update (dt) {},
});
