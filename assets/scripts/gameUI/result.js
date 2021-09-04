// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_winBg:cc.Node,
        m_loseBg:cc.Node,
        m_coin:cc.Node,
        m_coinLabel:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_winBg.active=false
        this.m_loseBg.active=false
        this.m_coinLabel.string="0"
    },

    setWin(number){
        this.m_winBg.active=true
        this.m_coinLabel.string=""+number
        window.m_gGameUI.playCoinFlyAction(this.m_coin.convertToWorldSpaceAR(cc.v2(0,0)),()=>{
            this.actionCB(number)
            window.m_gGame.startGame()
        })
    },

    setLose(number){
        this.m_loseBg.active=true
        this.m_coinLabel.string=""+number
        window.m_gGameUI.playCoinFlyAction(this.m_coin.convertToWorldSpaceAR(cc.v2(0,0)),()=>{
            this.actionCB(number)
        })
    },

    actionCB(number){
        window.g_LocalData.addCoin(number)
        this.node.destroy()
    }
});
