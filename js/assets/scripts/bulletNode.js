// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.m_gBulletBuild=this
    },

    clearAllBullet(){
        for(let i=0;i<this.node.childrenCount;i++){
            this.node.children[i].destroy()
        }
    },

    update (dt) {
    
    },

});
