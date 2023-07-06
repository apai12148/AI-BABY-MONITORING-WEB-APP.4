status = ""
objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function preload(){
    song = loadSound("music.mp3");
}

function draw(){
image(video, 0, 0, 380, 380);

if(status != ""){
    r = random(255);
    g = random(255);
    b = random(255);

    objectDetector.detect(video, gotResult);
    for(i = 0; i <objects.length; i++){
        document.getElementById("baby_found").innerHTML = "Baby Detected";

        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y + 15);
        noFill()
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}

for(i = 0; i <objects.length; i++){
    if(objects[i].label == "person")
{
document.getElementById("baby_found").innerHTML = "Baby Detected";
song.stop()
} else 
{
document.getElementById("baby_found").innerHTML = "Baby Not Detected";
song.play()
}
}

if(objects[i].length > 0){
document.getElementById("baby_found").innerHTML = "Baby Not Detected";
song.play()
}
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}