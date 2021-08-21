// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_bulletEffect:cc.Node,
        m_lab:cc.Prefab
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
    createLabel(pos,hp){
        let labNode=cc.instantiate(this.m_lab)
        let lab=labNode.getComponent(cc.Label)
        lab.string=hp+""
        labNode.parent=this.node

        let array=[]
        array.push(cc.v2(pos.x,pos.y))
        array.push(cc.v2(pos.x+-25,pos.y+50))
        array.push(cc.v2(pos.x+-50,pos.y+0))
        var action1 = cc.cardinalSplineBy(0.3, array, 0)
        let action2=cc.callFunc(()=>{labNode.removeFromParent()})
        cc.tween(labNode).then(action1).then(action2).start()
    }
});
