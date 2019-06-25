import Recogonizer from "./Recogonizer.js";

export default class FlickRecogonizer extends Recogonizer {
    start(pointer) {
        pointer.recordCount = 1;
        pointer.recordStart = {
            t:Date.now(),
            x:pointer.startX,
            y:pointer.startY,
            next:null
        };
        pointer.recordEnd = pointer.recordStart;
        pointer.v = 0;
    }
    move(pointer) {
        let t = Date.now();
        let record = {
            t: t,
            x:pointer.x,
            y:pointer.y,
            next:null
        }
        pointer.recordEnd.next = record;
        pointer.recordEnd = record;
        pointer.recordCount ++;

        while(t - pointer.recordStart.t > 100 && pointer.recordCount > 3 ) {
            pointer.recordCount --
            pointer.recordStart = pointer.recordStart.next;
        }

        let r1 = pointer.recordStart;
        let r2 = pointer.recordEnd;

        pointer.v = Math.sqrt(Math.pow(r1.x - r2.x, 2) + Math.pow(r1.y - r2.y, 2));
        //console.log(pointer.v);
        //document.body.innerHTML = `x: ${r1.x - r2.x}, y: ${r1.y - r2.y}, v: ${pointer.v}`;

    }
    end(pointer){
        //console.log(pointer.v);
        if(pointer.v > 75 * this.DPR) {
            pointer.isFlick = true;
            this.emit("flick", pointer);
        }

    }
    cancel(pointer){

    }
}