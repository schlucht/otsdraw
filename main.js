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

myCanvas.width = canvasProperties.width;
myCanvas.height = canvasProperties.height;

const ctx = myCanvas.getContext("2d");
clearCanvas();



const shapes = [];
let currentShapes = null;

const downCallbackForRect = function(e) {
    const mousePosition = {
        x: e.offsetX,
        y: e.offsetY,
    }; 
    currentShapes = new Rect(mousePosition);
    const moveCallback = function(e) {
        const mousePosition = {
            x: e.offsetX,
            y: e.offsetY,
        };        
        currentShapes.setCorner2(mousePosition);
        
        clearCanvas();       
        drawShapes([...shapes, currentShapes]);        
    }

    const upCallback = function(e) {
        myCanvas.removeEventListener("pointermove", moveCallback);
        myCanvas.removeEventListener("pointerup", upCallback);

        shapes.push(currentShapes);
    };

    myCanvas.addEventListener('pointermove', moveCallback);
    myCanvas.addEventListener('pointerup', upCallback);
}

const downCallbackForPath = function(e) {
    const mousePosition = {
        x: e.offsetX,
        y: e.offsetY,
    };    
    currentShapes = new Path(mousePosition);    

    const moveCallback = function(e) {
        const mousePosition = {
            x: e.offsetX,
            y: e.offsetY,
        };
        currentShapes.addPoint(mousePosition);
        // currentShapes.push(mousePosition);

        clearCanvas();
        drawShapes([...shapes, currentShapes]);
    }
    const upCallback = function(e) {
        myCanvas.removeEventListener("pointermove", moveCallback);
        myCanvas.removeEventListener("pointerup", upCallback);

        shapes.push(currentShapes);
    };
    myCanvas.addEventListener('pointermove', moveCallback);
    myCanvas.addEventListener('pointerup', upCallback);
}
// myCanvas.addEventListener('pointerdown', downCallbackForPath);
// myCanvas.addEventListener('pointerdown', downCallbackForRect);

function changeTool(info) {    
    myCanvas.removeEventListener('pointerdown', downCallbackForRect);
    myCanvas.removeEventListener('pointerdown', downCallbackForPath);
    switch(info) {
        case 'path':
            myCanvas.addEventListener('pointerdown', downCallbackForPath);
            break;
        case 'rect':
            myCanvas.addEventListener('pointerdown', downCallbackForRect);
            break;
    }    
}

function drawShapes(shapes)  {
    for(const shape of shapes) {     
        shape.draw(ctx);
    }            
}

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





