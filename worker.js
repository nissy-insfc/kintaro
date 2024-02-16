// worker.js
let wbcp = 0;
let wbpp = 320;

//BCサブワーカのメッセージを受ける
const bcWorker = new Worker("./bcWorker.js");

bcWorker.addEventListener(
    "message",
    (e) => {
      console.log(`【BCW→W受】:${e.data}`);
      wbcp = e.data;

      console.log(`【W→main送】:[${wbcp},${wbpp}]`);
      self.postMessage([wbcp,wbpp]); 
    },
    false
  );
//---------------------

//BPサブワーカのメッセージを受ける

const bpWorker = new Worker("./bpWorker.js");

bpWorker.addEventListener(
    "message",
    (e) => {
      console.log(`【bpW→W受】:${e.data}`);
      wbpp = e.data;

      console.log(`【W→main送】:[${wbcp},${wbpp}]`);
      self.postMessage([wbcp,wbpp]); 
    },
    false
  );
//---------------------



//ハンドル位置変化したら発火し、サブワーカに計算を指示する。
self.addEventListener(
  "message",
  (e) => {
    console.log(`【main→W受】:${e.data}`);

    //単弁ステータス変化の場合BCサブワーカに渡す
    if(e.data[0]=="bc"){
        console.log(`【W→BCW送】:${[e.data[1].bch,wbcp]}`);
        bcWorker.postMessage([e.data[1].bch,wbcp]);
    }
    //自弁ステータス変化の場合BPサブワーカに渡す
    else if(e.data[0]=="bp"){

        let bchTmp = 0;
        //console.log(`【W→BCW送】:${[e.data[1].bph,wbpp]}`);
        if(e.data[1].bph>0){
            //簡単のため自弁ノッチの半分を疑似ＢＣハンドル指令にする
            bchTmp = e.data[1].bph/2;
        }
        console.log(`【W→BCW送】:疑似BC${[bchTmp,wbcp]}`);
        bcWorker.postMessage([bchTmp,wbcp]);

        console.log(`【W→BPW送】:${[e.data[1].bph,wbpp]}`);
        bpWorker.postMessage([e.data[1].bph,wbpp]);

    }

   // console.log(`【W→main送】:${wbcp}`);
   // self.postMessage(wbcp);   
  },
  false
);