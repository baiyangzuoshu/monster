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
       m_cannonPrefab:cc.Prefab,
       m_touchNode:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.m_gCannonBuild=this;
        this._cannonList=this.m_mapData.json._cannonList;
        this.m_cannonPool=new cc.NodePool();
        this.initCannonData();
        this.initTouchEvent();
    },
/**
 * 创建炮台
 * @returns 
 */
    getOrCreateCannon(){
        let cannon
        if(this.m_cannonPool.size()>0)
            cannon=this.m_cannonPool.get()
        else
            cannon=cc.instantiate(this.m_cannonPrefab)
        return cannon
    },
    recycleCannon(cannon){
        cannon.getComponent("cannon").resetCannon();
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
        let cannon=this.getOrCreateCannon();
        let js=cannon.getComponent("cannon");
        js.initCannon(0);
        cannon.x=_x;
        cannon.y=_y;
        cannon.parent=this.node;

        let data=this.m_cannonData[index];
        data.cannon=cannon;
        data.isMakeBuilded=true;
        //action
        let endPos=cc.v2(data.x*106+106/2,-data.y*106-106/2);
        cc.tween(cannon).to(0.4,{scale:4}).to(0.4,{scale:1}).delay(0.2).start();
        cc.tween(cannon).to(1.0,{position:endPos}).call(()=>{
            js.resetBuildingState()
        }).start()

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
    //自动合成
    autoSynthetic(){
        let levelObj={}
        for(let i=0;i<this.m_cannonData.length;i++){
            if(this.m_cannonData[i].isMakeBuilded){
                let js=this.m_cannonData[i].cannon.getComponent("cannon")
                if(!levelObj.hasOwnProperty(js.getCurLevel())){
                    levelObj[js.getCurLevel()]=0
                }
                levelObj[js.getCurLevel()]++
            }
        }

        let levelArr=[]
        for(let i in levelObj ){
            if(levelObj[i]<2)
                continue//两个以上参与排序

            levelArr.push({
                level:parseInt(i),
                count:parseInt(levelObj[i])
            })
        }

        if(levelArr.length<=0)
            return//没有可以合成的目标

        levelArr.sort((a,b)=>{
            return a.level>b.level//自动合成从最小等级开始
        })

        for(let i=0;i<this.m_cannonData.length;i++){
            if(this.m_cannonData[i].isMakeBuilded){
                for(let j=0;j<this.m_cannonData.length;j++){
                    if(i!=j&&this.m_cannonData[j].isMakeBuilded){
                        let selected_js=this.m_cannonData[i].cannon.getComponent("cannon");
                        let target_js=this.m_cannonData[j].cannon.getComponent("cannon");
                        if(target_js.isSynthetic(selected_js)
                        &&levelArr[0].level==target_js.getCurLevel()){//等级相同可以合成
                            target_js.levelUp()
                            this.recycleCannonByIndex(i);
                            return
                        }
                    }
                }
            }
        }
    },
/**
 * 炮塔拖动事件
 */
    initTouchEvent(){
        this.m_touchNode.on("touchstart",this.onTouchStart,this);
        this.m_touchNode.on("touchmove",this.onTouchMove,this);
        this.m_touchNode.on("touchend",this.onTouchEnd,this);
        this.m_touchNode.on("touchcancel",this.onTouchCancel,this);
    },

    onTouchStart(event){
        let nodeP=this.node.convertToNodeSpaceAR(event.getLocation())
        let index=this.getCannonIndexByNodePos(nodeP);
        if(index>-1){
            if(this.m_cannonData[index].isMakeBuilded){
                let cannon=this.m_cannonData[index].cannon;
                this.m_curSelectedIndex=index;
                if(this.m_curCopyConnon){
                    this.recycleCannon(this.m_curCopyConnon);
                }
                this.m_curCopyConnon=cc.instantiate(cannon);
                this.m_curCopyConnon.parent=this.node;
                cannon.opacity=127;

                this.showCannonHit(cannon);
            }
        }
    },
    onTouchMove(event){
        if(this.m_curCopyConnon){
            let nodePos=this.node.convertToNodeSpaceAR(event.getLocation());
            this.m_curCopyConnon.x=nodePos.x;
            this.m_curCopyConnon.y=nodePos.y;
            let index=this.getCannonIndexByNodePos(nodePos);
            if(index>-1){
                if(this.m_cannonData[index].isMakeBuilded){
                    let cannon=this.m_cannonData[index].cannon;
                    this.showCannonRange(cannon);
                }
            }
        }
    },
    onTouchEnd(event){
        if(this.m_curCopyConnon){
            this.recycleCannon(this.m_curCopyConnon);
            this.m_curCopyConnon=null;
            this.resetAllCannonOpacity();
            this.hideCannonHit();
            this.hideCannonRange();

            let nodePos=this.node.convertToNodeSpaceAR(event.getLocation());
            let index=this.getCannonIndexByNodePos(nodePos);
            if(-1==index||index==this.m_curSelectedIndex){
                this.m_curSelectedIndex=-1;
                return;
            }
            
            let data=this.m_cannonData[index];
            let selectedCannon=this.m_cannonData[this.m_curSelectedIndex].cannon;

            if(data.isMakeBuilded){
                let cannon=data.cannon;
                let target_js=cannon.getComponent("cannon");
                let selected_js=selectedCannon.getComponent("cannon");
                if(target_js.isSynthetic(selected_js)){//合成
                    target_js.levelUp();
                    this.recycleCannonByIndex(this.m_curSelectedIndex);
                }
                else{//交换位置
                    this.m_cannonData[index].cannon=selectedCannon;
                    selectedCannon.x=106*this.m_cannonData[index].x+106/2;
                    selectedCannon.y=-106*this.m_cannonData[index].y-106/2;
                    this.m_cannonData[this.m_curSelectedIndex].cannon=cannon;
                    cannon.x=106* this.m_cannonData[this.m_curSelectedIndex].x+106/2;
                    cannon.y=-106* this.m_cannonData[this.m_curSelectedIndex].y-106/2;
                }
            }
            else{
                let cannon=cc.instantiate(selectedCannon);
                cannon.parent=this.node;
                cannon.x=data.x*106+106/2;
                cannon.y=-data.y*106-106/2;

                data.cannon=cannon;
                data.isMakeBuilded=true;

                let target_js=cannon.getComponent("cannon");
                let selected_js=selectedCannon.getComponent("cannon"); 
                selected_js.depthCopyData(target_js);

                this.recycleCannonByIndex(this.m_curSelectedIndex);
            }
        }
        
        this.m_curSelectedIndex=-1;
    },
    onTouchCancel(event){
        if(this.m_curCopyConnon){
            this.recycleCannon(this.m_curCopyConnon);
            this.resetAllCannonOpacity();
            this.hideCannonHit();
            this.hideCannonRange();
        }
        this.m_curCopyConnon=null;
        this.m_curSelectedIndex=-1;
    },
/**
 * 
 *数据
 */
    getCannonIndexByNodePos(nodePos){
        for(let i=0;i<this.m_cannonData.length;i++){
            //锚点0,1,
            let _x=this.m_cannonData[i].x*106+106/2;
            let _y=-this.m_cannonData[i].y*106-106/2;
            //位置为中间位置
            if(nodePos.x>=_x-106/2&&nodePos.x<=_x+106/2
                &&nodePos.y>=_y-106/2&&nodePos.y<=_y+106/2){
                    return i;
                }
        }

        return -1;
    },

    resetAllCannonOpacity(){
        for(let i=0;i<this.m_cannonData.length;i++){
            if(this.m_cannonData[i].isMakeBuilded){
                this.m_cannonData[i].cannon.opacity=255;
            }
        }
    },

    recycleCannonByIndex(index){
        let data=this.m_cannonData[index]
        data.isMakeBuilded=false
        this.recycleCannon(data.cannon)
        data.cannon=null
    },

    showCannonHit(cannon){
        for(let i=0;i<this.m_cannonData.length;i++){
            if(this.m_cannonData[i].isMakeBuilded){
                let cur_js=cannon.getComponent("cannon")
                let next_js=this.m_cannonData[i].cannon.getComponent("cannon")
                if(cur_js.isSynthetic(next_js)){//合成
                    next_js.showHit();
                }
            }
        }
    },
    hideCannonHit(){
        for(let i=0;i<this.m_cannonData.length;i++){
            if(this.m_cannonData[i].isMakeBuilded){
                this.m_cannonData[i].cannon.getComponent("cannon").hideHit();
            }
        }
    },

    showCannonRange(cannon){
        this.hideCannonRange();
        cannon.getComponent("cannon").showRange();
    },
    hideCannonRange(){
        for(let i=0;i<this.m_cannonData.length;i++){
            if(this.m_cannonData[i].isMakeBuilded){
                this.m_cannonData[i].cannon.getComponent("cannon").hideRange();
            }
        }
    },

    start () {

    },
/*测试
*/
    testTarget(monster){
        for(let i=0;i<this.m_cannonData.length;i++){
            if(this.m_cannonData[i].isMakeBuilded){
                this.m_cannonData[i].cannon.getComponent("cannon").setTarget(monster);
            }
        }
    },
    // update (dt) {},
});
