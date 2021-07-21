// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_monsterSp:cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    setMonsterSpriteFrame(spriteFrame){
        this.m_monsterSp.spriteFrame=spriteFrame;
    },

    start () {

    },

    // update (dt) {},
});
