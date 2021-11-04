// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class mapManager extends cc.Component {

    @property(cc.JsonAsset)
    jsonData:cc.JsonAsset=null
    @property(cc.Node)
    mapNode:cc.Node=null
    @property(cc.SpriteAtlas)
    mapSpriteAtlas:cc.SpriteAtlas=null
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let _cannonList=this.jsonData.json._cannonList
        let _mapBlockData=this.jsonData.json._mapBlockData
        let _pathList=this.jsonData.json._pathList
        // console.log("_cannonList",_cannonList)
        // console.log("_mapBlockData",_mapBlockData)
        // console.log("_pathList",_pathList)

        this.loadMap(_mapBlockData)
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

    // update (dt) {}
}
