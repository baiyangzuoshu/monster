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
    @property(cc.Node)
    monster:cc.Node=null
    @property(cc.SpriteAtlas)
    monsterAtlasArray:Array<cc.SpriteAtlas>=[]
    // LIFE-CYCLE CALLBACKS:
    pathList:Array<cc.Vec2>=null
    pathIndex:number=0
    actionChange:boolean=false
    distanceY:number=106
    typeArr:Array<number>=[10,15,18]

    onLoad () {

    }

    getRondomTypeAndPos(){
        let type=Math.floor(Math.random()*3)
        let pos=Math.floor(Math.random()*this.typeArr[type])
        return [type,pos]
    }

    init(_pathList:Array<cc.Vec2>,type:number,pos:number){
        //更换精灵
        let spriteFrame=this.monsterAtlasArray[type].getSpriteFrame(pos.toString())
        this.monsterLeft.getComponent(cc.Sprite).spriteFrame=spriteFrame
        this.monsterRight.getComponent(cc.Sprite).spriteFrame=spriteFrame
        //动作
        this.pathList=_pathList
        this.pathIndex=0
        this.changeDirection(false)

        let x=this.pathList[this.pathIndex+1].x*106+106/2
        let y=this.pathList[this.pathIndex+1].y*106-106/2+this.distanceY
        let jumpTo=cc.jumpTo(1.0,new cc.Vec2(x,-y),106,1)
        let cb=cc.callFunc(()=>{
            this.actionChange=true
        })
        let seq=cc.sequence(jumpTo,cb)
        cc.tween(this.node).then(seq).start()       
    }

    startAction () {
        let x=this.pathList[this.pathIndex+1].x*106+106/2
        let y=this.pathList[this.pathIndex+1].y*106-106/2+this.distanceY
        let moveTo=cc.moveTo(1.0,new cc.Vec2(x,-y))
        let cb=cc.callFunc(()=>{
            this.actionChange=true
        })
        let seq=cc.sequence(moveTo,cb)
        cc.tween(this.node).then(seq).start()

        let scaleTo=cc.scaleTo(0.5,1,1.5)
        let scaleTo2=cc.scaleTo(0.5,1,1)
        let seq2=cc.sequence(scaleTo,scaleTo2)
        cc.tween(this.monster).then(cc.repeatForever(seq2)).start()
    }

    changeDirection(is){
        this.monsterLeft.active=is
        this.monsterRight.active=!is
    }

    update (dt) {
        if(this.actionChange){
            this.actionChange=false
            this.pathIndex++

            if(this.pathIndex>=this.pathList.length-1){
                this.actionChange=false

                let x=this.pathList[0].x*106+106/2
                let y=this.pathList[0].y*106-106/2+this.distanceY
                let jumpTo=cc.jumpTo(1.0,new cc.Vec2(x,-y),106,1)
                let cb=cc.callFunc(()=>{
                    this.node.active=false
                })
                let seq=cc.sequence(jumpTo,cb)
                cc.tween(this.node).then(seq).start()
                return  
            }

            let x=this.pathList[this.pathIndex+1].x*106+106/2
            if(this.node.x!=x)this.changeDirection(this.node.x>x)

            this.startAction()
        }
    }
}
