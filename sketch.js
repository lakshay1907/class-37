var database
var drawing= [];
var currentPath=[];
var isDrawing = false;
function setup(){
    canvas = createCanvas(500,500);
    
    canvas.mousePressed(startPath);
    canvas.parent('canvascontainer');
    canvas.mouseReleased(endPath);
    var saveButton = select('#saveButton');
    saveButton.mousePressed(saveDrawing);


    var clearButton = select('#clearButton');
    clearButton.mousePressed(clearDrawing);


    database = firebase.database();
    var ref = database.ref('drawings');
    ref.on('value',gotData,errData);
}
function startPath(){
    isDrawing= true;
    currentPath= [];
    drawing.push(currentPath);
}
function endPath(){
    isDrawing= false;
}
function draw(){
    background(0);
    if (isDrawing){
        var point = {
            x: mouseX,
            y: mouseY
        }
     currentPath.push(point);
    }
   
    stroke(255);
    strokeWeight(4);
    noFill();
  for  (var i =0; i < drawing.length; i++) {
      var path= drawing[i];
      beginShape();
      for  (var j =0; j < path.length; j++) {
        vertex(path[j].x,path[j].y)
}
endShape();
  }

}



function saveDrawing(){
    var ref = database.ref('drawings'); 
    var data = {
        name:"DAN",
        drawing: drawing
    }
    ref.push(data);
}



function gotData(data){

    var elts = selectAll('.listing');
    for(var i = 0;i<elts.length;i++){
        elts[i].remove();
    }
  var drawings=data.val();
  console.log(drawings);
  var keys = Object.keys(drawings);
  console.log(keys);
  for(var i =0; i< keys.length;i++){
      var key =keys[i];
     // console.log(key);
     var li = createElement('li','');
     li.class('listing');
     var ahref = createA('#',key);
     ahref.mousePressed(showDrawing);
    ahref.parent(li);
    li.parent('drawingList');
  }
}


function errData(err){
console.log(err);
}


function showDrawing(){
    var key = this.html();
    var ref = database.ref('drawings/'+ key);
    ref.once('value',oneDrawing,errData);

    function oneDrawing(data){
        var dbdrawing = data.val();
        drawing= dbdrawing.drawing;
       // console.log(drawing);
    }
}
function clearDrawing(){
    drawing= [];
}