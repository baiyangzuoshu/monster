// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_monsterItem:cc.Prefab,
        m_coinPrefab:cc.Prefab,
        m_coin:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_gkLevel=1
        this.m_monsterIndex=0
        window.m_gMonsterBuild=this;
        this.m_monsterArr=[];
        this.m_monsterPool=new cc.NodePool();
        this.m_coinPool=new cc.NodePool()
        this.schedule(this.updateMonsterZIndex,1.0);
        this.schedule(this.monsterAutoBuild,1.0)
    },

    playCoinFlyAction(pos){
        let worldPos=this.m_coin.convertToWorldSpaceAR(cc.v2(0,0))
        let nodePos=this.node.convertToNodeSpaceAR(worldPos)
        let dis=window.getDistance(nodePos,pos)
        let coinFly=this.createCoinFly()
        coinFly.x=pos.x
        coinFly.y=pos.y
        coinFly.parent=this.node

        let posArr=[]
        posArr.push(cc.v2(pos.x,pos.y))
        posArr.push(cc.v2(pos.x+100,pos.y-dis/2))
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

    createMonster(){
        let monster;
        if(this.m_monsterPool.size()>0)
            monster=this.m_monsterPool.get();   
        else
            monster=cc.instantiate(this.m_monsterItem);
        return monster;
    },
    recycleMonster(monster){
        let index=this.m_monsterArr.indexOf(monster);
        this.m_monsterArr.splice(index,1);
        monster.opacity=0
       // this.m_monsterPool.put(monster);
    },

    monsterAutoBuild(){
        if(window.m_startGame){
            let pathList=window.m_gMapDataManager.getPathData()
            let levelDesign=window.g_GlobalData.levelDesign
            let data=levelDesign.getLevelData(this.m_gkLevel)
            let curData=data[this.m_monsterIndex++]
            let type=curData.type
            let index=curData.id
            let hp=curData.hp
            let speed=curData.speed
            this.buildMonster(pathList,type,index,hp,speed);
            if(this.m_monsterIndex>=data.length)
                this.m_monsterIndex=0
        }
        
    },

    build(){
        let pathList=window.m_gMapDataManager.getPathData();
        let type=window.random(0,2);
        let index=window.random(0,10);
        this.buildMonster(pathList,type,index);
    },

    buildMonster(pathList,type,index,hp,speed){
        let monster=this.createMonster();
        monster.parent=this.node
        this.m_monsterArr.push(monster);
        
        let js=monster.getComponent("monsterItem");
        js.init(pathList,type,index,hp,speed);
    },

    updateMonsterZIndex(){
        this.m_monsterArr.sort((a,b)=>{
            if(a.y>b.y){
                return -1;
            }
            return 1;
        })

        for(let i=0;i<this.m_monsterArr.length;i++){
            this.m_monsterArr[i].zIndex=i;
        }
    },

    distanceCannonMinMonster(cannon){
        let minMonster=null;
        let minDis=9999;
        for(let i=0;i<this.m_monsterArr.length;i++){
           let monster=this.m_monsterArr[i];
           let js=monster.getComponent("monsterItem")
           if(js&&js.isDie())continue

           let dis=Math.abs(window.getDistance(cc.v2(monster.x,monster.y),cc.v2(cannon.x,cannon.y)));
           if(dis<window.m_gCannonRange&&dis<minDis){
                minDis=dis;
                minMonster=monster;
           }
        }
        return minMonster;
    },

    start () {

    },

    //update (dt) {},
});
