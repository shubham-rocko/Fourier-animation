import { Component, Injector, OnInit } from "@angular/core";

// import {DropdownModule} from 'primeng/dropdown';
declare var Snap: any;
var s;
declare var mina: any;
interface City {
  name: string;
  code: string;
}
var theta = 0;
const ORIGIN = {
  x: 100,
  y: 100,
  r: 50,
};

const SPEED = {
  duration: 10
}

const ATTACHLINE = {
  initDist: 50
}

var NOOFCYCLES = 1;
// var circleGroup;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(injector: Injector) { }

  ngOnInit() {
    s = Snap("#svgout");
    createSvgAnimation(1);
  }
}

function createSvgAnimation(noCircle) {
  var circleGroup = s.group();
  var c1 = circleGroup
    .circle(ORIGIN.x, ORIGIN.y, ORIGIN.r)
    .attr({
      fill: "#fff",
      stroke: "#000",
      cursor: "pointer",
      "stroke-width": "2px"
    })
    .addClass("join");
  drawLine(ORIGIN.x, ORIGIN.y, ORIGIN.x + ORIGIN.r, ORIGIN.y, circleGroup);
  drawLineAttachLine(ORIGIN.x+ORIGIN.r, ORIGIN.y, ORIGIN.x + ORIGIN.r+ATTACHLINE.initDist, ORIGIN.y, circleGroup);
  createWave(ORIGIN.x + ORIGIN.r+ATTACHLINE.initDist, ORIGIN.y, circleGroup)
}

function drawLine(x1, y1, x2, y2, circleGroup) {
  var line = circleGroup.line(x1, y1, x2, y2);
  line.attr({ stroke: "#32cd32", strokeWidth: 2 });
  setInterval(() => {
    rotateradius(line);
  }, SPEED.duration);
}

var previousData = {
  startX: 200, // changeable DO NOT USE ANY WHERE
  startY: 100,
  x: 150,
  y: 100
}
function rotateradius(lineDraw) {
  theta = theta + Math.PI / 180;
  let a = ORIGIN.r * Math.sin(theta);
  let b = ORIGIN.r * Math.cos(theta);
  let x2 = ORIGIN.x + b;
  let y2 = ORIGIN.y + a;
  moveAttachLine(x2, y2);
  lineAnimation(lineDraw, x2, y2);
  let x1,y1;
  // console.log(previousData.x - x2);
  x1  = previousData.startX = previousData.startX +(NOOFCYCLES * Math.abs(previousData.x - x2));

  // y1 = previousData.startY + (previousData.x - y2);
  animateWave(x1,y2,ORIGIN.x + ORIGIN.r+ATTACHLINE.initDist,y2);
  if(theta >= (NOOFCYCLES*2)*Math.PI){
    NOOFCYCLES++;
  }
  previousData.x = x2;
  previousData.y = y2;
}

function lineAnimation(lineDraw, x2, y2) {
  // console.log("x2===>",150-x2, "y2====>", 100-y2);
  var myAnim = lineDraw.animate({ x2: x2, y2: y2 }, SPEED.duration, mina.linear);
}

var attachedline;
function drawLineAttachLine(x1, y1, x2, y2, circleGroup){
  attachedline = circleGroup.line(x1, y1, x2, y2);
  attachedline.attr({ stroke: "#0900ff", strokeWidth: 4 });
}

function moveAttachLine(originX, originY){
  var myAnim = attachedline.animate({ x1: originX, y1: originY, y2: originY }, SPEED.duration, mina.linear);
}

var waveForm;
function createWave(x1, y1, circleGroup){
  waveForm = circleGroup.line(x1, y1, x1, y1);
  waveForm.attr({ stroke: "#ff0000", strokeWidth: 4 });
}

function animateWave(x1, y1, x2, y2){
  // if(x1 < 200 || x2 < 200){
  //   console.log("updated X====>", x1)
  // }
  var waveForm1 = s.line(x1, y1, x2, y2);
  waveForm1.attr({ fill:"none", stroke: "#ff0000", strokeWidth: 4 });
  // var myAnim = waveForm.animate({ x1: x1, x2: x2, y2: y2 }, SPEED.duration, mina.linear);
}

function startSvgAnimation() {}
