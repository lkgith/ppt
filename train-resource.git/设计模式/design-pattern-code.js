//抽象工厂
function AbstractFactory(){
     this.getShard = function(){}
     this.getImg = function(){}
     this.getPlayer() = function(){}
}

function PadFactory(){
     this.getShard = function(){
        return PadDhared();
     }
     this.getImg = function(){
        return PadImg();
     }
     this.getPlayer() = function(){
        return PadPlayer();
     }
}

function PcFactory(){
     this.getShard = function(){
        return Pchared();
     }
     this.getImg = function(){
        return PcImg();
     }
     this.getPlayer() = function(){
        return PcPlayer();
     }
}

function PhoneFactory(){
     this.getShard = function(){
        return Phonehared();
     }
     this.getImg = function(){
        return PhoneImg();
     }
     this.getPlayer() = function(){
        return PhonePlayer();
     }
}

var factory = new PadFactory();
....
var shared = factory.getShared();
var img = factory.getImg();
var player = factory.getPlayer//
//使用组件组装特定的系统(phone，pc,pad) 
系统不需要改变，主需要修改factory的实例，既可从一个产品系列切换到另一个产品系列

//工厂方法
/*
function PlayerCreator(){
     this.getPlayer = function(){};
}
*/
function PhonePlayerCreateor(){
     this.getPlayer = function(){
         return PhonePlayer
     }
}
function PcPlayerCreate(){
     this.getPlayer = function(){
        new PcPlayer();
     }
}
function PadPlayerCreate(){
     this.getPlayer = function(){
        new PadPlayer();
     }
}
function Player(){
     this.play = function(){};
}
function PcPlayer(){
     this.play = function(){
        //pc play
     }
}
function PhonePlayer(){
     this.play = function(){
        //phone play
     }
}
function PadPlayer(){
     this.play = function(){
        //pad play
     }
}
var factory = new PhonePlayerCreateor()
var player = factory.getPlayer();
player.play(); //播放


//protptype  原型模式
function Tools(){
    this.mouseDragDrop = function(index, parentContainer){
        //选择一个widget
        var widget = this.widgets[index].clone();
        widget.draw(parentContainer);
    }
}
Tools.protprtye.widgets = [];
Tools.prototype.addWidgets = function(){
    this.addWidget = function(widget){
       this.widgets.push(widget)
    }
}

function Img(){
  this.clone = function(){}
  this.draw = function(){}
}
Tools.addWidget(Img);

function Label(){
    this.clone = function(){}
    this.draw = function(){}
}
Tools.addWidget(Label);

function Input(){
    this.clone = function(){}
    this.draw = function(){}
}
Tools.addWidget(Input);

//无需修改tools就能扩展一个widget,Tools无需关心组件的创建细节

//Builder 模式
function PageBuilder(){
     this.buildInput= function(input){}
     this.buildLabel = function(label){}
     this.buildImg = function(img){}
     this.getResult = function(){
         return "一个由三个元素组成的html";
     };
}
function HtmlPageBuilder(){
     this.buildInput= function(input){}
     this.buildLabel = function(label){}
     this.buildImg = function(img){}
     this.getResult = function(){
         return "一个由三个元素组成的html对象";
     };
}
function PdfPageBuilder(){
     this.buildInput= function(input){}
     this.buildLabel = function(label){}
     this.buildImg = function(img){}
     this.getResult = function(){
         return "一个由三个元素组成的PDF对象";
     };
}

var  data ={
    input : {name :'' , id:''},
    label : {name :'' , id:'' , label:''},
    img : {name :'' , id:'' , label:'', src},
}

function client(build){
    var build = build;
    this.constructs = function(){
        for(var p in data){
            if(p == "input"){
                build.buildInput(data[p]);
            }else if(p == "label"){
                build.buildLabel(data[p]);
            }else if(p == 'img'){
                build.buildImg(data[p]);
            }
        }
    }
    this.getResult = function(){
       return build.getResult();
    }
}