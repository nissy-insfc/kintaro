let doTime = 0;
let mcStatus ={mch:0, bph:0, bch:0};
let locoStatus ={bpp:0, bcp:0};


//ワーカのメッセージを受けて値を書き換える
const worker = new Worker("./worker.js");

worker.addEventListener(
  "message",
  (e) => {
    console.log(`【W→main受】:BCは${e.data}kPa`);
    locoStatus.bcp=e.data;
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
    let bcpTmp = document.getElementById("bcpTxt");
    bcpTmp.innerHTML = locoStatus.bcp;
}

function bcPlus(){
    if(mcStatus.bch<4){
        let bchTmp = mcStatus.bch += 1;
        mcStatus.bch = bchTmp;
        console.log(`【main→W送】:${mcStatus}`);
        worker.postMessage(mcStatus);
    }
    refresh();
}
function bcMinus(){
    if(mcStatus.bch>0){
        let bchTmp = mcStatus.bch -= 1;
        mcStatus.bch = bchTmp;
        console.log(`【main→W送】:${mcStatus}`);
        worker.postMessage(mcStatus);
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





