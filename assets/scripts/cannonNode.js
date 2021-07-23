// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       m_mapData:cc.JsonAsset,
       m_cannonSp:cc.Node,
       m_cannonPrefab:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.m_gCannonBuild=this;
        this._cannonList=this.m_mapData.json._cannonList;
        this.m_cannonPool=new cc.NodePool();
        this.initCannonData();
    },

    getCannon(){
        let cannon;
        if(this.m_cannonPool.size()>0)
            cannon=this.m_cannonPool.get();
        else
            cannon=cc.instantiate(this.m_cannonPrefab);
        return cannon;
    },
    recycleCannon(cannon){
        this.m_cannonPool.put(cannon)
    },

    initCannonData(){
        this.m_cannonData=[];
        for(let i=0;i<this._cannonList.length;i++){
            this.m_cannonData.push({
                x:this._cannonList[i].x,
                y:this._cannonList[i].y,
                isMakeBuilded:false
            });
        }
    },

    getCannonBuildIndex(){
        for(let i=0;i<this.m_cannonData.length;i++){
            if(false==this.m_cannonData[i].isMakeBuilded){
                return i;
            }
        }
        return -1;
    },

    build(){
        let index=this.getCannonBuildIndex();
        if(-1==index)return false;

        let _x=this.m_cannonSp.x;
        let _y=this.m_cannonSp.y;
        let data=this.m_cannonData[index];
        let endPos=cc.v2(data.x*106+106/2,-data.y*106-106/2);

        let cannon=this.getCannon();
        cannon.x=_x;
        cannon.y=_y;
        cannon.parent=this.node;
        data.cannon=cannon;
        data.isMakeBuilded=true;

        let js=cannon.getComponent("cannon");
        js.initCannon();

        //action
        cc.tween(cannon).to(0.4,{scale:4}).to(0.4,{scale:1}).delay(0.2).start();
        cc.tween(cannon).to(1.0,{position:endPos}).start();

        return true;
    },

    clearAllCannon(){
        for(let i=0;i<this.m_cannonData.length;i++){
            if(this.m_cannonData[i].isMakeBuilded){
                this.m_cannonData[i].isMakeBuilded=false;
                this.recycleCannon(this.m_cannonData[i].cannon);
            }
        }
    },

    start () {

    },

    // update (dt) {},
});
