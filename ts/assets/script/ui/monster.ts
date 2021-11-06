// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class monster extends cc.Component {

    @property(cc.Node)
    monsterRight:cc.Node=null
    @property(cc.Node)
    monsterLeft:cc.Node=null

    // LIFE-CYCLE CALLBACKS:
    pathList:Array<cc.Vec2>=null
    pathIndex:number=0
    actionChange:boolean=false
    distanceY:number=106

    onLoad () {

    }

    init(_pathList:Array<cc.Vec2>){
        this.pathList=_pathList
        this.pathIndex=0
        this.monsterLeft.active=false
        this.monsterRight.active=true

        this.startAction()        
    }

    startAction () {
        let x=this.pathList[this.pathIndex+1].x*106+106/2
        let y=this.pathList[this.pathIndex+1].y*106-106/2+this.distanceY
        let moveTo=cc.moveTo(1.0,new cc.Vec2(x,-y))
        let cb=cc.callFunc(()=>{
            this.actionChange=true
        })
        let seq=cc.sequence(moveTo,cb,null)
        this.node.runAction(seq)
    }

    update (dt) {
        if(this.actionChange){
            this.actionChange=false
            this.pathIndex++

            if(this.pathIndex>=this.pathList.length-1){
                this.actionChange=false
                return  this.node.destroy()
            }

            this.startAction()
        }
    }
}
