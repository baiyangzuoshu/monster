cc.Class({
    extends: cc.Component,

    properties: {
        m_coinLab:cc.Label,
        m_coinPrefab:cc.Prefab,
        m_coin:cc.Node,
        m_goldLab:cc.Label,
        m_resultPrefab:cc.Prefab,
        m_bossView:cc.Prefab,
        m_mapViewPrefab:cc.Prefab,
        m_chapterLab:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.m_gGameUI=this
        //window.g_LocalData.delData()
        this.updateGold()
        this.updateCoin()
        this.updateChapterInfo()
        this.m_coinPool=new cc.NodePool()
    },

    showMapView(){
        if(this.m_mapView==null){
            let view=cc.instantiate(this.m_mapViewPrefab)
            view.parent=window.m_gGame.node//屏蔽其他事件传递
            view.active=false
            view.zIndex=1000
            this.m_mapView=view
        }

        let js=this.m_mapView.getComponent("mapView")
        js.show()
    },

    showBossView(){
        let view=cc.instantiate(this.m_bossView)
        view.parent=this.node
        let js=view.getComponent("bossView")
        js.play()
    },

    showGameResult(result){//1胜利 -1失败
        let levelDesign=window.g_GlobalData.levelDesign
        let data=levelDesign.getLevelData(window.m_gkLevel)
        let resultNode=cc.instantiate(this.m_resultPrefab)
        resultNode.parent=this.node
        let js=resultNode.getComponent("result")
        if(-1==result){
            js.setLose(data.fail)
        }
        else if(1==result){
            js.setWin(data.success)
        }
    },

    updateChapterInfo(){
        let levelDesign=window.g_GlobalData.levelDesign
        let data=levelDesign.getLevelData(window.m_gkLevel)
        this.m_chapterLab.string="关卡 "+data.chapter+"-"+data.level
    },

    playCoinFlyAction(worldPos,cb){
        let monsterNodePos=this.node.convertToNodeSpaceAR(worldPos)

        let coinWorldPos=this.m_coin.convertToWorldSpaceAR(cc.v2(0,0))
        let nodePos=this.node.convertToNodeSpaceAR(coinWorldPos)
        let dis=window.getDistance(nodePos,monsterNodePos)
        let coinFly=this.createCoinFly()
        coinFly.x=monsterNodePos.x
        coinFly.y=monsterNodePos.y
        coinFly.parent=this.node

        let posArr=[]
        posArr.push(cc.v2(monsterNodePos.x,monsterNodePos.y))
        posArr.push(cc.v2(monsterNodePos.x+100,monsterNodePos.y-dis/2))
        posArr.push(nodePos)

        let action=cc.bezierTo(1.0,posArr)
        let action2=cc.callFunc(()=>{
            this.recycleCoinFly(coinFly)
            cb()
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
    }

});
