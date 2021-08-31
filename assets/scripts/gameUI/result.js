// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_winBg:cc.Node,
        m_loseBg:cc.Node,
        m_coinLabel:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.m_winBg.active=false
        this.m_loseBg.active=false
        this.m_coinLabel.string="0"
        this.node.on("touchstart",this.onTouchStart,this)
        this.node.on("touchmove",this.onTouchMove,this)
        this.node.on("touchend",this.onTouchEnd,this)
        this.node.on("touchcancel",this.touchcancel,this)
    },

    onTouchStart(){
        this.m_isRemoveSelf=true
    },
    onTouchMove(){

    },
    onTouchEnd(){
        if(this.m_isRemoveSelf)
            this.node.destroy()
    },
    onTouchCancel(){
        this.m_isRemoveSelf=false
    },

    setWin(number){
        this.m_winBg.active=true
        this.m_coinLabel.string=""+number
    },

    setLose(number){
        this.m_loseBg.active=true
        this.m_coinLabel.string=""+number
    },

    start () {

    },

    // update (dt) {},
});
