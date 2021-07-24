// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_gun:cc.Sprite,
        m_pad:cc.Sprite,
        m_levelLab:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    initCannon(){
        this.m_curLevel=1;
        this.m_gun.node.angle=window.random(0,360);
        this.m_levelLab.string=""+this.m_curLevel;
    },

    addLevel(level){
        this.m_curLevel+=parseInt(level);
        this.m_levelLab.string=""+this.m_curLevel;
    },

    getCurLevel(){
        return this.m_curLevel;
    },
    setCurLevel(level){
        this.m_curLevel=parseInt(level);
        this.m_levelLab.string=""+this.m_curLevel;
    },

    start () {

    },

    // update (dt) {},
});
