// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

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
        this.m_gameState=window.GAME_INIT
    },

    isPlaying(){
        return  this._state==window.GAME_START
    },

    getGameState(){
        return  m_gameState
    },

    setGameState(_state){
        if(_state<window.GAME_INIT||_state>=window.GAME_END){
            console.error("setGameState _state<window.GAME_INIT||_state>=window.GAME_END",_state)
            return
        }

        this._state=_state
    }

    // update (dt) {},
});
