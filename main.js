song = "";
scoreRW = 0;
scoreLW = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
function setup(){
    canvas = createCanvas(600, 500); //creating canvas of size
    canvas.center(); //centers canvas
    video = createCapture(VIDEO); //initiate webcam
    video.hide(); //set video size
  //Posenet should be in capitals
    poseNet = ml5.poseNet(video, modelLoaded); //loads the trained model for posenet from ml5 and saves it in a variable in posenet
    poseNet.on("pose", gotPoses); //executes posenet as a variable, compares the trained poses with the position of the parts captured in the camera
  }
  
  function modelLoaded(){
    console.log("posenet inizialized"); //posenet is inizialized, input for posenet function
  }
  function gotPoses(results){ //capture x and y coordinates of wrists
    if(results.length > 0){//results is a list or an array. there should be at least 1 item in an array to make the length greater than 1
          console.log(results); //display coor. in console
          scoreRW = results[0].pose.keypoints[10].score;//defines score
          scoreLW = results[0].pose.keypoints[9].score;
          leftWristX = results[0].pose.leftWrist.x;//captures x position of left wrist
          leftWristY = results[0].pose.leftWrist.y;
          rightWristY = results[0].pose.rightWrist.y;
          rightWristX = results[0].pose.rightWrist.x;
      }
  }

function preload(){
  song = loadSound("music.mp3");//loads song
}

function draw(){
  image(video, 0, 0, 600, 500);//loads image and video
  fill("red");//gives a color to the circle
  stroke("#red");//gives a border color to the circle
  if(scoreRW > 0.2){
    circle(rightWristX, rightWristY, 20);// draws circle
    if(rightWristY > 0 && rightWristY <= 100){// 0 and 100 are the y positions on the screen
      document.getElementById("spd").innerHTML = "speed = 0.5x";
      song.rate(0.5);//the moment wrist is brought down, the speed increases
    }
    else if(rightWristY > 100 && rightWristY <= 200){
      document.getElementById("spd").innerHTML = "speed is regular (1x)";
      song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300){
      document.getElementById("spd").innerHTML = "speed = 1.5x";
      song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400){
      document.getElementById("spd").innerHTML = "speed = 2x";
      song.rate(2);
    }
    else if(rightWristY > 400){
      document.getElementById("spd").innerHTML = "speed = 2.5x";
      song.rate(2.5);
  }
}
  if(scoreLW > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		InNumberleftWristY = Number(leftWristY); 
		remove_decimals = floor(InNumberleftWristY);
		volume = remove_decimals/500;
		document.getElementById("vol").innerHTML = "Volume = " + volume;		
		song.setVolume(volume);	
	}
}
function play(){
  song.play();
  song.setVolume(1);
  song.rate(1);
}