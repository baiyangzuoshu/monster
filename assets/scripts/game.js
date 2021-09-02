
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
        window.m_gMonsterSpeed=10
        this.setGameState(window.GAME_START)
        window.g_GameUI.updateChapterInfo()
    },

    nextChapter(){
        this.setGameState(window.GAME_OVER)
        window.g_GameUI.showGameResult(1)
        window.m_gBulletBuild.clearAllBullet()
        window.m_gMonsterBuild.clearAllMonster()
        window.m_gCannonBuild.clearAllCannonTarget()
        window.m_gkLevel++
        window.g_GameUI.updateChapterInfo()
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
