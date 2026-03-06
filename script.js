const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

let images = [
"https://via.placeholder.com/600",
"https://via.placeholder.com/600/ff5722",
"https://via.placeholder.com/600/000"
]

let index = 0
let recorder
let chunks = []

function generateVideo(){

let stream = canvas.captureStream(30)

recorder = new MediaRecorder(stream)

recorder.ondataavailable = e => chunks.push(e.data)

recorder.onstop = exportVideo

recorder.start()

let interval = setInterval(()=>{

let img = new Image()

img.src = images[index]

img.onload = ()=>{

ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.drawImage(img,60,60,600,600)

ctx.font="40px Arial"
ctx.fillText("Produk Viral Shopee",150,50)

}

index++

if(index >= images.length){

clearInterval(interval)

setTimeout(()=> recorder.stop(),1000)

}

},2000)

}

function exportVideo(){

let blob = new Blob(chunks,{type:"video/webm})

window.videoURL = URL.createObjectURL(blob)

}

function downloadVideo(){

if(window.videoURL){

let a = document.createElement("a")

a.href = window.videoURL

a.download = "video-produk.webm"

a.click()

}


}
