// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EventManager } from "../base/common/EventManager";
import { UIView } from "../base/ui/UIView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameView extends UIView {

    @property(cc.JsonAsset)
    jsonData:cc.JsonAsset=null
    @property(cc.Node)
    mapNode:cc.Node=null
    @property(cc.SpriteAtlas)
    mapSpriteAtlas:cc.SpriteAtlas=null
    @property(cc.Prefab)
    monsterPrefab:cc.Prefab=null
    // LIFE-CYCLE CALLBACKS:
    pathList:Array<cc.Vec2>=null

    onLoad () {
        let _cannonList=this.jsonData.json._cannonList
        let _mapBlockData=this.jsonData.json._mapBlockData
        this.pathList=this.jsonData.json._pathList
        // console.log("_cannonList",_cannonList)
        // console.log("_mapBlockData",_mapBlockData)
        //console.log("_pathList",this.pathList)

        this.loadMap(_mapBlockData)

        EventManager.getInstance().addEventListener("gameView_createMonster",this.createMonster,this)
    }

    createMonster(data:any){
        let x=this.pathList[0].x
        let y=this.pathList[0].y
        let monster=cc.instantiate(this.monsterPrefab)
        monster.parent=this.mapNode
        monster.x=x*106+106/2
        monster.y=-y*106-106/2

        let ts=monster.getComponent("monster")
        let [type,pos]=ts.getRondomTypeAndPos()
        ts.init(this.pathList,type,pos)
    }

    loadMap(mapBlockData:Array<Array<number>>){
        for(let i=0;i<mapBlockData.length;i++){
            let mapBlockItem:Array<number>=mapBlockData[i]
            for(let j=0;j<mapBlockItem.length;j++){
                let node=new cc.Node()
                node.x=j*106+106/2
                node.y=-i*106-106/2
                node.parent=this.mapNode

                let sprite=node.addComponent(cc.Sprite)
                let name=mapBlockItem[j]
                let spriteFrame=this.mapSpriteAtlas.getSpriteFrame(name.toString())
                sprite.spriteFrame=spriteFrame
            }
        }
    }

    start () {

    }

    update (dt) {

    }
}
