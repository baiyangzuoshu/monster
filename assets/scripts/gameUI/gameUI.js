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
        m_coinPrefab:cc.Prefab,
        m_coin:cc.Node,
        m_goldLab:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.g_GameUI=this
        //window.g_LocalData.delData()
        this.updateGold()
        this.updateCoin()
        this.m_coinPool=new cc.NodePool()
    },

    playCoinFlyAction(monsterWorldPos){
        let monsterNodePos=this.node.convertToNodeSpaceAR(monsterWorldPos)

        let worldPos=this.m_coin.convertToWorldSpaceAR(cc.v2(0,0))
        let nodePos=this.node.convertToNodeSpaceAR(worldPos)
        let dis=window.getDistance(nodePos,monsterNodePos)
        let coinFly=this.createCoinFly()
        coinFly.x=monsterNodePos.x
        coinFly.y=monsterNodePos.y
        coinFly.parent=this.node

        let posArr=[]
        posArr.push(cc.v2(monsterNodePos.x,monsterNodePos.y))
        posArr.push(cc.v2(monsterNodePos.x+100,monsterNodePos.y-dis/2))
        posArr.push(nodePos)

        let action=cc.bezierTo(0.5,posArr)
        let action2=cc.callFunc(()=>{
            this.recycleCoinFly(coinFly)
        })
        cc.tween(coinFly).then(action).then(action2).start()
    },
    createCoinFly(){
        let coinFly
        if(this.m_coinPool.size()>0)
            coinFly=this.m_coinPool.get()
        else
            coinFly=cc.instantiate(this.m_coinPrefab)
        return coinFly
    },
    recycleCoinFly(coin){
        this.m_coinPool.put(coin)
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
