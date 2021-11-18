export  class   CannonManager{
    private static  _instance:CannonManager=null
    public  static  getInstance():CannonManager{
        if(this._instance){
            this._instance=new CannonManager
        }
        return this._instance
    }

    
}

export let cannonManager:CannonManager=CannonManager.getInstance()