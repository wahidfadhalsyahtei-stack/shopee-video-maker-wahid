const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const preview = document.getElementById("preview")

let recorder
let chunks = []

function generateVideo(){

chunks = []

const title = document.getElementById("title").value
const price = document.getElementById("price").value

let images = [
document.getElementById("img1").value,
document.getElementById("img2").value,
document.getElementById("img3").value
document.getElementById("img4").value,
document.getElementById("img5").value,
document.getElementById("img6").value
]

const stream = canvas.captureStream(30)

recorder = new MediaRecorder(stream,{mimeType:"video/webm"})

recorder.ondataavailable = e=>{
if(e.data.size>0) chunks.push(e.data)
}

recorder.onstop = ()=>{

let blob = new Blob(chunks,{type:"video/webm"})
let url = URL.createObjectURL(blob)

preview.src = url

window.videoURL = url

}

recorder.start()

let i = 0

function draw(){

let img = new Image()

img.crossOrigin="anonymous"

img.src = images[i]

img.onload = ()=>{

ctx.clearRect(0,0,720,720)

ctx.drawImage(img,60,100,600,500)

ctx.fillStyle="black"
ctx.font="40px Arial"
ctx.fillText(title,50,50)

ctx.fillStyle="red"
ctx.font="35px Arial"
ctx.fillText(price,50,650)

}

i++

if(i < images.length){

setTimeout(draw,2000)

}else{

setTimeout(()=>recorder.stop(),2000)

}

}

draw()

}

function downloadVideo(){

if(window.videoURL){

let a = document.createElement("a")

a.href = window.videoURL
a.download = "video-produk.webm"

a.click()

}

}

