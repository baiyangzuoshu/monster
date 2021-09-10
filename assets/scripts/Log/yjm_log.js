window.yjm_log={}
window.yjm_log.default_level=0
let LOG_LEVLE={
    DEBUG:0,
    INFO:1,
    WARNING:2,
    ERROR:3
}

window.yjm_log.info=function(){
    if(window.yjm_log.default_level<LOG_LEVLE.DEBUG)
        return
}

window.yjm_log.show=function(){
    if(window.yjm_log.default_level<LOG_LEVLE.INFO)
        return
}

window.yjm_log.warning=function(){
    if(window.yjm_log.default_level<LOG_LEVLE.WARNING)
        return
}

window.yjm_log.error=function(){
    if(window.yjm_log.default_level<LOG_LEVLE.ERROR)
        return
}