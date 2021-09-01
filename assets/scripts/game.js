// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_resultPrefab:cc.Prefab,
        m_gameState:{
            get(){
                return this._state
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;

        window.m_gGame=this
        this._state=window.GAME_INIT
    },

    startGame(){
        window.m_gMonsterSpeed=10
        this.setGameState(window.GAME_START)
        window.g_GameUI.updateChapterInfo()
    },

    nextChapter(){
        this.setGameState(window.GAME_OVER)
        this.showGameResult(1)
        window.m_gBulletBuild.clearAllBullet()
        window.m_gMonsterBuild.clearAllMonster()
        window.m_gCannonBuild.clearAllCannonTarget()
        window.m_gkLevel++
        window.g_GameUI.updateChapterInfo()
    },

    showGameResult(result){//1胜利 -1失败
        let levelDesign=window.g_GlobalData.levelDesign
        let data=levelDesign.getLevelData(window.m_gkLevel)
        let resultNode=cc.instantiate(this.m_resultPrefab)
        resultNode.parent=this.node
        let js=resultNode.getComponent("result")
        if(-1==result){
            js.setLose(data.fail)
        }
        else if(1==result){
            js.setWin(data.success)
        }
    },

    isPlaying(){
        return  this.m_gameState==window.GAME_START
    },

    getGameState(){
        return  this.m_gameState
    },

    setGameState(_state){
        if(_state<window.GAME_INIT||_state>=window.GAME_END){
            console.error("setGameState _state<window.GAME_INIT||_state>=window.GAME_END",_state)
            return
        }

        this._state=_state
    }
});
