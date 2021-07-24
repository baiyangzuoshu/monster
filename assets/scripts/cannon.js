// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_gunNode:cc.Node,
        m_padNode:cc.Node,
        m_gunAtlas:cc.SpriteAtlas,
        m_padAtlas:cc.SpriteAtlas,
        m_levelLab:cc.Label,
        m_hit:cc.Node,
        m_range:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
    },

    initCannon(level,type){
        this.m_curLevel=level;
        this.m_curType=type;
        this.m_gunNode.angle=window.random(0,360);
        this.updateGunAndPadShow();
        this.hideHit();
        this.hideRange();
    },

    resetCannon(){
        this.m_curLevel=1;
        this.m_curType=0;
        this.m_gunNode.angle=window.random(0,360);
        this.updateGunAndPadShow();
        this.hideHit();
        this.hideRange();
    },

    addLevel(level){
        this.m_curLevel+=parseInt(level);
        this.m_levelLab.string=""+this.m_curLevel;
        this.updateGunAndPadShow();
    },

    getCurLevel(){
        return this.m_curLevel;
    },
    setCurLevel(level){
        this.m_curLevel=parseInt(level);
        this.m_levelLab.string=""+this.m_curLevel;
        this.updateGunAndPadShow();
    },
    setCurType(type){
        this.m_curType=type;
        this.updateGunAndPadShow();
    },
    getCurType(){
        return this.m_curType;
    },
    showHit(){
        this.m_hit.active=true;
    },
    hideHit(){
        this.m_hit.active=false;
    },
    showRange(){
        this.m_range.active=true;
    },
    hideRange(){
        this.m_range.active=false;
    },

    updateGunAndPadShow(){
        let gunName=""+this.m_curType+"_"+this.m_curLevel;
        let gunSpriteFrame=this.m_gunAtlas.getSpriteFrame(gunName);
        let gunSprite=this.m_gunNode.getComponent(cc.Sprite);
        gunSprite.spriteFrame=gunSpriteFrame;

        let padName=""+this.m_curType+"_"+Math.floor(this.m_curLevel%3);
        let padSpriteFrame=this.m_padAtlas.getSpriteFrame(padName);
        let padSprite=this.m_padNode.getComponent(cc.Sprite);
        padSprite.spriteFrame=padSpriteFrame;
    },

    depthCopyData(cur_js){
        cur_js.setCurLevel(this.getCurLevel());
        cur_js.setCurType(this.getCurType());
    },

    isSynthetic(cur_js){
       return cur_js.getCurType()==this.getCurType()&&cur_js.getCurLevel()==this.getCurLevel();
    },
});
