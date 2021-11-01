// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { UIConf ,uiManager} from "./base/ui/UIManager";

const {ccclass, property} = cc._decorator;
export  enum    UIID{
    UIView
}

export  let UICF:{[key:number]:UIConf}={
    [UIID.UIView]:{prefab:"prefab/view"}
}

@ccclass
export default class NewClass extends cc.Component {
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        console.log("game")
        uiManager.initUIConf(UICF)
        uiManager.open(UIID.UIView)
    }

    // update (dt) {}
}
