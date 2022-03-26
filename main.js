status1="";

function setup(){
    canvas = createCanvas(480,360);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function preload(){
    video=createVideo("video.mp4");
}
function draw(){
    image(video,0,0,480,360);

    if(status1 != ""){
        objectDetector.detect(video,gotResult);

        for(i=0;i<objects.length; i++){
            document.getElementById("status").innerHTML="Staus: Objects Detected"
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are "+objects.length;                              
            fill("#ff0000");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#ff0000")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects=input){
                video.stop();
                object.detect(gotResult);
                document.getElementById("stutus").innerHTML="Object Mentioned Found";
                utterThis = new SpeechSynthesisUtterance(speak_data);
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML=input +" Not Found";
            }
        }
    }
    
}

function Start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML = "Status: Detecting Objects";
input=document.getElementById("object_name").innerHTML;
}

function modelLoaded(){
    console.log("Model Loaded");
    status1=true;
    
}
function gotResult(error,results){
    if(error){
        console.log(error);

    }
    else{
        console.log(results);
        objects=results
    }
}