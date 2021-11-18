// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Node)
    m_gun:cc.Node=null
    @property(cc.Node)
    m_pad:cc.Node=null
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let rotateTo1=cc.rotateTo(1.0,180)
        let rotateTo2=cc.rotateTo(1.0,360)
        let seq=cc.sequence(rotateTo1,rotateTo2)
        cc.tween(this.m_gun).then(cc.repeatForever(seq)).start()
    }

    start () {

    }

    // update (dt) {}
}
