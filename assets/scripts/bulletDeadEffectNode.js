// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_bulletEffect:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.m_gBulletEffect=this
    },

    createEffect(pos){
        let effect=cc.instantiate(this.m_bulletEffect)
        effect.parent=this.node
        effect.active=true
        effect.x=pos.x
        effect.y=pos.y

        let animation=effect.getComponent(cc.Animation)
        animation.play("bulletDead")
        animation.end=function(){
            animation.stop("bulletDead")
            effect.removeFromParent()
        }.bind(this)
    },

});
