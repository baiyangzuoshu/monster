// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_makeTab: cc.Label,
        m_makeSp: cc.Node,
        m_make_hammer:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.m_isMakeBuild = false;
        this.m_curMakeCount = 10;
        this.m_maxMakeCount = 10;
        this.m_makeSp.height = 0;
        this.updateMakeTab();
    },

    updateMakeTab() {
        if (this.m_curMakeCount < 0)
            this.m_curMakeCount = 0;
        if (this.m_curMakeCount > this.m_maxMakeCount)
            this.m_curMakeCount = this.m_maxMakeCount;
        
        this.m_makeTab.string = this.m_curMakeCount + "/" + this.m_maxMakeCount;
    },

    make() {
        if (this.m_isMakeBuild) return;

        this.m_isMakeBuild = true;
        cc.tween(this.m_make_hammer)
            .to(0.5, { angle: 90 })
            .to(0.5, { angle: 0 })
            .call(() => {
                this.m_isMakeBuild = false;
                this.subMakeCount();})
            .start();
    },

    addMakeCount() {
        this.m_curMakeCount++;
        this.updateMakeTab();
    },
    subMakeCount() {
        this.m_curMakeCount--;
        this.updateMakeTab();
    },

    start () {

    },

    update(dt) {
        if (this.m_curMakeCount < this.m_maxMakeCount) {
            this.m_makeSp.height += 50 * dt;
            if (this.m_makeSp.height >= 133) {
                this.m_makeSp.height = 0;
                this.addMakeCount();
            }
        }
    },
});
