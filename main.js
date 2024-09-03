const canvasProperties = {
    width: window.innerWidth,
    height: window.innerHeight,
    center: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
    },
    background: "gray",
};
const stageProperties = {
    width: 600,
    height: 480,
    left: canvasProperties.center.x - 600 /2,
    top: canvasProperties.center.y - 480 / 2,
    background: 'white',
};
const ctx = myCanvas.getContext("2d");

myCanvas.width = canvasProperties.width;
myCanvas.height = canvasProperties.height;



const shapes = [];
let path = [];
clearCanvas();

myCanvas.addEventListener('pointerdown', (e) => {
    const mousePosition = {
        x: e.offsetX,
        y: e.offsetY,
    };    
    path.push(mousePosition);
    const moveCallback = function(e) {
        const mousePosition = {
            x: e.offsetX,
            y: e.offsetY,
        };
        path.push(mousePosition);
        clearCanvas();
        for(const shape of [...shapes, path]) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0,0,0,0.5)';
            ctx.lineWidth = 5;
            ctx.moveTo(shape[0].x, shape[0].y);
            for(let i = 1; i < shape.length; i++) {
                ctx.lineTo(shape[i].x, shape[i].y);
            }            
            ctx.stroke();  
        }          
    }
    const upCallback = function(e) {
        myCanvas.removeEventListener("pointermove", moveCallback);
        myCanvas.removeEventListener("pointerup", upCallback);

        shapes.push(path);
        path = [];       
       
    };
    myCanvas.addEventListener('pointermove', moveCallback);
    myCanvas.addEventListener('pointerup', upCallback);
});

function clearCanvas() {
    // shapes.length = 0;
    ctx.fillStyle = canvasProperties.background;
    ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);

    ctx.fillStyle = stageProperties.background;
    ctx.fillRect(
        stageProperties.left,
        stageProperties.top,
        stageProperties.width,
        stageProperties.height,
    );
}





