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
export default class test extends UIView {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    startGame () {
        EventManager.getInstance().raiseEvent("gameView_createMonster",{})
    }

    handlerEvent(){

    }

    handlerScheuler(){

    }

    draw(){

    }

    update (dt) {
        this.handlerEvent()
        this.handlerScheuler()
        this.draw()
    }
}
