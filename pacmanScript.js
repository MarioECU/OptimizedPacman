function linearPathGenerator(p1, p2) {
  var slope = (p1[1] - p2[1]) / (p1[0] - p2[0]);
  var b = -1 * slope * p1[0] + p1[1];
  var f = (x) => {
    return x * slope + b;
  };
  return f;
}

let f1;
let f2;
let timer1 = 0;
const tf = 3;
const startAngle = 0;
const finalAngle = 2 * Math.PI;
const area = 9 * 10000;
function setup() {
  createCanvas(2000, 500);
  f1 = (theta) => {
    return Math.pow(area / ((2 * Math.PI - theta) / 2), 0.5)
  };
  f2 = linearPathGenerator([0, startAngle], [tf, finalAngle]);
}
function draw() {
  if (timer1 <= 2.99) {
    clear();
    fill(255, 255, 0);
    const newangle = f2(timer1);
    console.log('radio: ', f1(newangle));
    console.log('angulo: ', 2 * Math.PI - newangle);
    console.log('area: ', (2 * Math.PI - newangle) / 2 * Math.pow(f1(newangle), 2));
    arc(250, 250, f1(newangle), f1(newangle), 0, 2 * Math.PI - newangle);
    timer1 += 0.01;
  }
}
