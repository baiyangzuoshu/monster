// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { UIView } from "../base/ui/UIView";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BottomView extends UIView {

    @property(cc.Node)
    ui_build_water:cc.Node=null
    @property(cc.Label)
    ui_build_lab:cc.Label=null
    @property(cc.Node)
    ui_build_btn=null
    // LIFE-CYCLE CALLBACKS:
    isPlaying:boolean=false
    curBuildCount:number=0
    maxBuildCount:number=10
    maxWaterHeight=130

    onLoad () {
        this.ui_build_lab.string=this.curBuildCount+"/"+this.maxBuildCount
        this.ui_build_water.height=0
    }

    clickBtnEvent() {
        if(this.isPlaying||this.curBuildCount<=0)return

        let animation:cc.Animation=this.ui_build_btn.getComponent(cc.Animation)
        animation.play("build")
        animation.on("finished",this.animationfinished,this)
        this.isPlaying=true
    }

    animationfinished(){
        this.curBuildCount--
        this.isPlaying=false
        this.ui_build_lab.string=this.curBuildCount+"/"+this.maxBuildCount
    }

    update (dt) {
        if(this.curBuildCount<this.maxBuildCount){
            this.ui_build_water.height++
            if(this.ui_build_water.height>this.maxWaterHeight){
                this.ui_build_water.height=0
                this.curBuildCount++
                this.ui_build_lab.string=this.curBuildCount+"/"+this.maxBuildCount
            }
        }
    }
}
