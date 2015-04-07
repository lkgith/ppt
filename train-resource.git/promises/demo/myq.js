
var  nextCallback= function(fn){
    return function(val){
        fn(val);
    }
}

var forEach = function(processQueue , fn){
     if(processQueue && processQueue.length == 0){
            return;
     }
     for (var i = 0; i < processQueue.length; i++){
        var p = processQueue[i];
        var nextpromises = p[0];
        var callback = p[1];
        var errorback = p[2];
        fn(callback , errorback , nextpromises);
     }
}

var Deferred = function(){

    this.name = name;
    this.processQueue = [];
    this.status = 0;   //0等待 -1 拒绝  1 完成
    this.value  =  null;
    this.resolve = function(val){
        this.status = 1;  //完成
        this.value = val;
        forEach(this.processQueue , function(callback , errorback , nextpromises){
            if(!callback && !nextpromises){
                return;
            }else if(!callback){
                nextpromises.resolve(val);
            }else{
                if(isPromises(val)){
                   //如果val是个promises
                   val.then(callback , null);
                }else{
                    var cval = callback(val);
                    //如果callback返回的是promises则不能直接返回给下个promises，需要获取到promises的值后返回给下个
                    if(isPromises(cval)){
                        //做一个中间的callback与下一个promises进行衔接
                        var cb = nextCallback(function(_val){
                            nextpromises.resolve(_val);
                        });
                        var ecb = nextCallback(function(_val){
                            nextpromises.reject(_val);
                        });
                        cval.then(cb , ecb);
                    }else{
                        nextpromises.resolve(cval);
                    }
                }
            }
        });
        this.processQueue = [];
    };

    var isPromises = function(val){
        if(typeof val == 'object' && val.then && typeof val.then == 'function'){
            return true;
        }
        return false;
    }

    this.reject = function(reson){
        this.status = -1;  //拒绝
        this.value = reson;
        forEach(this.processQueue , function(callback , errorback , nextpromises){
            if(!nextpromises) return;

            if(!errorback){
                nextpromises.reject(reson);
            }else{
                var cval = errorback(reson);
                if(isPromises(cval)){
                    //做一个中间的callback与下一个promises进行衔接
                    var cb = nextCallback(function(_val){
                        nextpromises.resolve(_val);
                    });
                    var ecb = nextCallback(function(_val){
                        nextpromises.reject(_val);
                    });
                    cval.then(cb , ecb);
                }else{
                    nextpromises.reject(cval);
                }
            }
        });
        this.processQueue = [];
    };

    //then方法注册了回调事件，并返回当前promises的后续promises
    this.then = function(callback , errorback){
            var nextDeffrred = new Deferred();
            this.processQueue.push([nextDeffrred , callback , errorback]);
            if(this.status == 1){
                this.resolve(this.value);
            }else if(this.status == -1){
                errorback && this.reject(this.value);
            }
            return nextDeffrred;
    };
}
