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
