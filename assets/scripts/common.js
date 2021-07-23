
window.m_gMapDataManager=null;
window.m_gMonsterBuild=null;
window.m_gCannonBuild=null;

window.random=function(start,end){
    let dis=Math.floor(end-start);
    let rand=Math.random()*dis;
    return Math.floor(start+rand);
}