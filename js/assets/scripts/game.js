
cc.Class({
    extends: cc.Component,

    properties: {
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
        let levelDesign=window.g_GlobalData.levelDesign
        let data=levelDesign.getLevelData(window.m_gkLevel)
        if(1==data.type){
            window.m_gGameUI.showBossView()
        }
        else{
            window.m_gMonsterSpeed=10
            this.setGameState(window.GAME_START)
            window.m_gGameUI.updateChapterInfo()
        }
    },

    nextChapter(){
        this.setGameState(window.GAME_OVER)
        window.m_gGameUI.showGameResult(1)
        window.m_gBulletBuild.clearAllBullet()
        window.m_gMonsterBuild.clearAllMonster()
        window.m_gCannonBuild.clearAllCannonTarget()
        window.m_gkLevel++
        window.m_gGameUI.updateChapterInfo()
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
