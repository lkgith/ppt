//���󹤳�
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
//ʹ�������װ�ض���ϵͳ(phone��pc,pad) 
ϵͳ����Ҫ�ı䣬����Ҫ�޸�factory��ʵ�����ȿɴ�һ����Ʒϵ���л�����һ����Ʒϵ��

//��������
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
player.play(); //����


//protptype  ԭ��ģʽ
function Tools(){
    this.mouseDragDrop = function(index, parentContainer){
        //ѡ��һ��widget
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

//�����޸�tools������չһ��widget,Tools�����������Ĵ���ϸ��

//Builder ģʽ
function PageBuilder(){
     this.buildInput= function(input){}
     this.buildLabel = function(label){}
     this.buildImg = function(img){}
     this.getResult = function(){
         return "һ��������Ԫ����ɵ�html";
     };
}
function HtmlPageBuilder(){
     this.buildInput= function(input){}
     this.buildLabel = function(label){}
     this.buildImg = function(img){}
     this.getResult = function(){
         return "һ��������Ԫ����ɵ�html����";
     };
}
function PdfPageBuilder(){
     this.buildInput= function(input){}
     this.buildLabel = function(label){}
     this.buildImg = function(img){}
     this.getResult = function(){
         return "һ��������Ԫ����ɵ�PDF����";
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