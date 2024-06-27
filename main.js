leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
scoreLeftWrist=0;
songStatus="";
song1="daylight.mp3";
song2="notion.mp3";
function preload(){
    notion = loadSound("notion.mp3");
    daylight = loadSound("daylight.mp3");
}

function setup(){
    canvas=createCanvas(700 , 800);
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
posenet.on("pose", gotPoses);
}

function modelLoaded(){
    console.log("Your lucky. Beware is all ill tell ya");
}

function draw(){
    image(video,0,0,550,550);
    status=song1;
    fill("#FF0000");
	stroke("#FF0000");
    if(scoreLeftWrist > 0.2)
        {
            circle(leftWristX,leftWristY,20);
        }
}

function gotPoses(results){
    console.log(results);
if(results.length>0){
    
    rightWristY=results[0].pose.rightWrist.y;
    leftWristY=results[0].pose.leftWrist.y;

    rightWristX=results[0].pose.rightWrist.x;
    leftWristX=results[0].pose.leftWrist.x;
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    scoreRightWrist=results[0].pose.keypoints[10].score;
  
    if(scoreLeftWrist>0.2){
        daylight.play();
        notion.stop();
    }else if(scoreRightWrist>0.2){
        notion.play()
        daylight.stop();
    }else if(scoreRightWrist<0.2 && scoreLeftWrist<0.2){
        notion.stop();
        daylight.stop();

    }else if(scoreRightWrist>0.2 && scoreLeftWrist>0.2){
        notion.stop();
        daylight.stop();
    }
}
}

function play(){
    daylight.play();
}