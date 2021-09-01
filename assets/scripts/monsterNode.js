// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_monsterItem:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_monsterIndex=0
        this.m_monsterDieCount=0
        window.m_gMonsterBuild=this;
        this.m_monsterArr=[];
       
        this.schedule(this.updateMonsterZIndex,1.0);
        this.schedule(this.monsterAutoBuild,1.0)
    },

    createMonster(){
        let monster=cc.instantiate(this.m_monsterItem)

        return monster
    },
    recycleMonster(monster){
        this.m_monsterDieCount++
        monster.opacity=0
    },
    clearAllMonster(){
        for(let i=this.m_monsterArr.length-1;i>=0;i--){
            this.m_monsterArr[i].destroy()
        }
        this.m_monsterDieCount=0
        this.m_monsterIndex=0
        this.m_monsterArr=[];
    },

    monsterAutoBuild(){
        if(window.m_gGame.isPlaying()){
            let pathList=window.m_gMapDataManager.getPathData()
            let levelDesign=window.g_GlobalData.levelDesign
            let data=levelDesign.getLevelData(window.m_gkLevel).data
            if(this.m_monsterIndex<data.length)
            {
                let curData=data[this.m_monsterIndex++]
                let type=curData.type
                let index=curData.id
                let hp=curData.hp
                let speed=curData.speed
                this.buildMonster(pathList,type,index,hp,speed)
            }
            else if(this.m_monsterDieCount>=this.m_monsterIndex)
            {
                window.m_gGame.setGameState(window.GAME_STOP)//下一帧
            }
        }
        else if(window.GAME_STOP==window.m_gGame.getGameState()){
            window.m_gGame.nextChapter()
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
        for(let i=0;i<this.node.children.length;i++){
           let monster=this.node.children[i];
           let js=monster.getComponent("monsterItem")
           if((js&&js.isDie()))continue

           let dis=Math.abs(window.getDistance(monster.getPosition(),cannon.getPosition()));
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
