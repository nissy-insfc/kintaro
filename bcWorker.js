self.addEventListener(
  "message",
  (e) => {
    let bcTmp = e.data[1];
    console.log(`【W→BCW受】単弁指令:${e.data[0]}現在BC:${e.data[1]}`);

    //BC圧力指定　後で変更
    bcTarget =e.data[0]*100*0.7;
    //増圧すべき場合
    if(bcTmp < bcTarget){
        var timer = setInterval(function() {
            console.log(`【BCW】計算開始 元BC:${bcTmp}`);
            if (bcTmp > bcTarget) {
              clearInterval(timer);
            }
            bcTmp = bcTmp+1;
            console.log(`【BCW→W送】計算BCP:${bcTmp}kPa`);
            self.postMessage(bcTmp);   
        }, 10);
    }else{//減圧すべき場合
        var timer = setInterval(function() {
            console.log(`【BCW】計算開始 元BC:${bcTmp}`);
            bcTmp = bcTmp-1;
            if(bcTmp<0){bcTmp=0;}
            if (bcTmp <= bcTarget) {
                clearInterval(timer);
              }
            console.log(`【BCW→W送】計算BCP:${bcTmp}kPa`);
            self.postMessage(bcTmp);   
        }, 10);
    }
  },
  false
);