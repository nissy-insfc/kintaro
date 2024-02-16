let doTime = 0;
let mcStatus ={mch:0, bch:0, bph:9};
let locoStatus ={bcp:0, bpp:320};
let opId = 0;

//ワーカのメッセージを受けて値を書き換える
const worker = new Worker("./worker.js");

worker.addEventListener(
  "message",
  (e) => {
    console.log(`【W→main受】:BC/BPは${e.data}kPa`);
    locoStatus.bcp=e.data[0];
    locoStatus.bpp=e.data[1];
    //表示更新
    console.log(`W→main受によるrefresh指示`);
    refresh();
  },
  false
);
//------------------


function refresh(){
    console.log(`refresh実行`);
    let bchTmp = document.getElementById("bchTxt");
    bchTmp.innerHTML = mcStatus.bch;
    let bphTmp = document.getElementById("bphTxt");
    bphTmp.innerHTML = mcStatus.bph;
    let bcpTmp = document.getElementById("bcpTxt");
    bcpTmp.innerHTML = locoStatus.bcp;
    let bppTmp = document.getElementById("bppTxt");
    bppTmp.innerHTML = locoStatus.bpp;
    opId+=1;
    console.log(`refresh回数: ${opId}`);
}

function bcPlus(){
    if(mcStatus.bch<4){
        let bchTmp = mcStatus.bch += 1;
        mcStatus.bch = bchTmp;
        console.log(`【main→W送】:${mcStatus}`);
        worker.postMessage(["bc",mcStatus]);
    }
    refresh();
}
function bcMinus(){
    if(mcStatus.bch>0){
        let bchTmp = mcStatus.bch -= 1;
        mcStatus.bch = bchTmp;
        console.log(`【main→W送】:${mcStatus}`);
        worker.postMessage(["bc",mcStatus]);
    }
    refresh();
}


function bpPlus(){
    if(mcStatus.bph<9){
        let bphTmp = mcStatus.bph += 1;
        mcStatus.bph = bphTmp;
        console.log(`【main→W送】:${mcStatus}`);
        worker.postMessage(["bp",mcStatus]);
    }
    refresh();
}

function bpMinus(){
    if(mcStatus.bph>0){
        let bphTmp = mcStatus.bph -= 1;
        mcStatus.bph = bphTmp;
        console.log(`【main→W送】:${mcStatus}`);
        worker.postMessage(["bp",mcStatus]);
    }
    refresh();
}



//デバッグ用1秒間隔送信
/*
setInterval(() => {
    worker.postMessage(mcStatus);
    doTime += 1;
    if(doTime>10){clearInterval()};
}, 1000);
*/





