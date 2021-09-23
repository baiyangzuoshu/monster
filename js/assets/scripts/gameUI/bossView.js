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

    play(){
        let animation=this.node.getComponent(cc.Animation)
        animation.play("bossView")
    },

    over(){
        let animation=this.node.getComponent(cc.Animation)
        animation.stop("bossView")
        this.scheduleOnce(()=>{
            this.node.destroy()
            window.m_gMonsterSpeed=10
            window.m_gGame.setGameState(window.GAME_START)
            window.m_gGameUI.updateChapterInfo()
        },2.0)
    },

    onLoad () {

    },

    start () {

    },

    // update (dt) {},
});
