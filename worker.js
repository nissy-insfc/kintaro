// worker.js
let wbpp = 490;
let wbcp = 0;

//BCサブワーカのメッセージを受ける
const bcWorker = new Worker("./bcWorker.js");

bcWorker.addEventListener(
    "message",
    (e) => {
      console.log(`【BCW→W受】:${e.data}`);
      wbcp = e.data;

      console.log(`【W→main送】:${wbcp}`);
      self.postMessage(wbcp); 
    },
    false
  );
//---------------------

//ハンドル位置変化したら発火し、サブワーカに計算を指示する。
self.addEventListener(
  "message",
  (e) => {
    console.log(`【main→W受】:${e.data}`);

    console.log(`【W→BCW送】:${[e.data.bch,wbcp]}`);
    bcWorker.postMessage([e.data.bch,wbcp]);

   // console.log(`【W→main送】:${wbcp}`);
   // self.postMessage(wbcp);   
  },
  false
);