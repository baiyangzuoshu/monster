// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_coinLab:cc.Label,
        m_goldLab:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.g_GameUI=this
        //window.g_LocalData.delData()
        this.updateGold()
        this.updateCoin()
    },

    updateCoin(){
        let curCoin=window.g_LocalData.getCoin()
        this.m_coinLab.string=curCoin+""
    },
    updateGold(){
        let curGold=window.g_LocalData.getGold()
        this.m_goldLab.string=curGold+""
    },

    start () {

    },

    // update (dt) {},
});
