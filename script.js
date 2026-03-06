const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const preview = document.getElementById("preview")

let images = [
"https://down-id.img.susercontent.com/file/c941907459deb759e4bcdb3a2d17c61b@resize_w900_nl.webp?1",
"https://picsum.photos/600/600?2",
"https://picsum.photos/600/600?3"
]

let recorder
let chunks = []

function generateVideo(){

chunks = []

const stream = canvas.captureStream(30)

recorder = new MediaRecorder(stream, {
mimeType: "video/webm"
})

recorder.ondataavailable = e => {
if(e.data.size > 0){
chunks.push(e.data)
}
}

recorder.onstop = () => {

const blob = new Blob(chunks,{type:"video/webm"})

const url = URL.createObjectURL(blob)

preview.src = url

window.videoURL = url

}

recorder.start()

let i = 0

function draw(){

let img = new Image()

img.crossOrigin="anonymous"

img.src = images[i]

img.onload = () => {

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.drawImage(img,60,60,600,600)

ctx.font="40px Arial"
ctx.fillText("Produk Viral",200,50)

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

const a = document.createElement("a")

a.href = window.videoURL

a.download = "video-produk.webm"

a.click()

}

}


