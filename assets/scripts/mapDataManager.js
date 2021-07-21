// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_mapData:cc.JsonAsset,
        _mapBlockData:{//只可读
            get(){
                return this._blockData;
            }
        },
        _pathList:{
            get(){
                return this._pathData;
            }
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.m_gMapDataManager=this;
        this.json=this.m_mapData.json;
        this._blockData=this.json._mapBlockData;//写入
        this._pathData=this.json._pathList;
        cc.log(this.m_mapData);
        cc.log(this._mapBlockData);
        cc.log(this._pathList);
    },

    getBlockData(){
        return this._mapBlockData;
    },

    getPathData(){
        return this._pathList;
    },

    start () {

    },

    // update (dt) {},
});
