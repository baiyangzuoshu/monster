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
        window.m_gMonsterBuild=this;
        this.m_monsterArr=[];
        this.m_monsterPool=new cc.NodePool();
        this.schedule(this.updateMonster,1.0);
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
        this.m_monsterPool.put(monster);
    },

    buildMonster(pathList,type,index){
        let monster=this.createMonster();
        monster.parent=this.node
        this.m_monsterArr.push(monster);
        
        let js=monster.getComponent("monsterItem");
        js.init(pathList,type,index);
    },

    updateMonster(){
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

    start () {

    },

    //update (dt) {},
});
