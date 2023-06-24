//import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
//import { Canvas3D } from './Canvas3D.js';
//import { CvWireframe } from './CvWireFrame.js';
//import { CvHLines } from './CvHLines.js';
import { CvZbuf } from './CvZbuf.js';
import { Rota3D } from './Rota3D.js';
import { Point3D } from './point3D.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

let cv: CvZbuf;
let obj: Obj3D;
let ang: number=0;

function leerArchivo(e:any) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
    obj = new Obj3D();
    if (obj.read(contenido)) {
      //sDir = sDir1;
      cv = new CvZbuf(graphics, canvas);
      cv.setObj(obj);
      cv.paint();
    }
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido:any) {
  var elemento = document.getElementById('contenido-archivo');
  //
  //readObject(new Input(contenido));
  elemento.innerHTML = contenido;
}

function vp(dTheta:number, dPhi:number, fRho:number):void{  // Viewpoint
  if (obj != undefined) {
    let obj: Obj3D = cv.getObj();
    if (!obj.vp(cv, dTheta, dPhi, fRho))
      alert('datos no validos');
  }
  else
    alert('aun no has leido un archivo');
}

function eyeDownFunc() {
  vp(0, 0.1, 1);
}

function eyeUpFunc() {
  vp(0, -0.1, 1);
}

function eyeLeftFunc() {
  vp(-0.1, 0, 1);
}

function eyeRightFunc() {
  vp(0.1, 0, 1);
}

function incrDistFunc() {
  vp(0, 0, 2);
}

function decrDistFunc() {
  vp(0, 0, 0.5);
}

function pza1TR() {
  let tr = 0.1;
 	
	
  for (let i = 17; i <= 20; i++){
    obj.w[i].x = obj.w[i].x + tr;
	}
	cv.setObj(obj);
  cv.paint();	
}


function pza1DerFunc() {
  let af = 10;
 	
	Rota3D.initRotate( obj.w[139], obj.w[140], af*Math.PI/180);	
	
  for (let i = 201; i <= 238; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
	cv.setObj(obj);
  cv.paint();	
}

function pza1IzqFunc() {
  let af = -10;
 	
	Rota3D.initRotate( obj.w[139], obj.w[140], af*Math.PI/180);	
	
  for (let i = 201; i <= 238; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
	cv.setObj(obj);
  cv.paint();	
}
function pza12DerFunc() {
  let af = 10;
  Rota3D.initRotate(obj.w[29], obj.w[30], af * Math.PI / 180);
	
  for (let i = 101; i <= 140; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
  }
  for (let i = 201; i <= 238; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
	cv.setObj(obj);
  cv.paint();	
}







function pza12IzqFunc() {
  let af = -10;
	Rota3D.initRotate( obj.w[29], obj.w[30], af*Math.PI/180);	
	
  for (let i = 101; i <= 140; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  for (let i = 201; i <= 238; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  
	cv.setObj(obj);
  cv.paint();	
}
async function animateTeethTransition(numIterations, delay) {
  const totalVertices = 12452;
  const numTeeth = 44;
  const verticesPerTooth = Math.floor(totalVertices / numTeeth); // Ajustar el cálculo de vértices por diente

  // Crear un array para almacenar las posiciones iniciales de todos los vértices
  const initialPositions = [];

  // Almacenar las posiciones iniciales de los vértices para cada diente
  for (let tooth = 0; tooth < numTeeth; tooth++) {
    const toothStartIndex = tooth * verticesPerTooth;
    const toothPositions = [];

    for (let i = 0; i < verticesPerTooth; i++) {
      toothPositions.push(obj.w[toothStartIndex + i] || new Point3D(0, 0, 0));
    }

    initialPositions.push(...toothPositions);
  }

  const initialObjPositions = obj.getObj().getPositions();

  // Definir la función de animación
  async function animate() {
    for (let iteration = 0; iteration < numIterations; iteration++) {
      for (let tooth = 0; tooth < numTeeth; tooth++) {
        const currentToothStartIndex = tooth * verticesPerTooth;
        const nextToothStartIndex = ((tooth + 1) % numTeeth) * verticesPerTooth;

        // Calcular el factor de interpolación basado en la iteración actual
        const t = (iteration + 1) / numIterations;

        // Actualizar las posiciones de los vértices para el diente actual
        const toothPositions = initialPositions.slice(
          currentToothStartIndex,
          currentToothStartIndex + verticesPerTooth
        );
        const nextToothPositions = initialPositions.slice(
          nextToothStartIndex,
          nextToothStartIndex + verticesPerTooth
        );

        // Comprobar si las posiciones iniciales están definidas
        if (toothPositions.some((pos) => !pos) || nextToothPositions.some((pos) => !pos)) {
          throw new Error('Entrada inválida: alguna posición inicial no está definida');
        }

        // Interpolar las posiciones de los vértices y actualizar el array obj.w
        for (let i = 0; i < verticesPerTooth; i++) {
          const currentPos = toothPositions[i];
          const nextPos = nextToothPositions[i];
          const interpolatedPosition = interpolatePoint3D(currentPos, nextPos, t);
          obj.w[currentToothStartIndex + i] = interpolatedPosition;
        }
      }

      // Llamar a la función de renderizado para actualizar la visualización
      cv.paint();

      // Pausar la ejecución durante el retraso especificado (en milisegundos)
      // Puedes ajustar este valor según la velocidad de animación deseada
      await sleep(delay);
    }
  }

  // Función de utilidad para interpolar entre dos puntos 3D
  function interpolatePoint3D(p1, p2, t) {
    if (!p1 || !p2) {
      throw new Error('Entrada inválida: p1 o p2 no está definido');
    }

    const x = p1.x + (p2.x - p1.x) * t;
    const y = p1.y + (p2.y - p1.y) * t;
    const z = p1.z + (p2.z - p1.z) * t;
    return new Point3D(x, y, z);
  }

  // Función de utilidad para pausar la ejecución durante el tiempo especificado
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Función para restablecer las posiciones originales del objeto
  function resetObjPositions() {
    const objToReset = obj.getObj();
    objToReset.setPositions(initialObjPositions);
    cv.paint();
  }

  // Iniciar la animación
  await animate();
  await resetObjPositions();
}

document.getElementById('file-input').addEventListener('change', leerArchivo, false);
document.getElementById('eyeDown').addEventListener('click', eyeDownFunc, false);
document.getElementById('eyeUp').addEventListener('click', eyeUpFunc, false);
document.getElementById('eyeLeft').addEventListener('click', eyeLeftFunc, false);
document.getElementById('eyeRight').addEventListener('click', eyeRightFunc, false);
document.getElementById('incrDist').addEventListener('click', incrDistFunc, false);
document.getElementById('decrDist').addEventListener('click', decrDistFunc, false);


//movimiento de piezas
document.getElementById('pza1Izq').addEventListener('click', ()=>{
  for(let i = 1; i <= 140; i++){
    animateTeethTransition(30, 100);}
}, false);
document.getElementById('pza1Der').addEventListener('click', ()=>{}, false);
document.getElementById('pza12Izq').addEventListener('click', pza12IzqFunc, false)
;
document.getElementById('pza12Der').addEventListener('click', pza12DerFunc, false);

document.getElementById('pzatr').addEventListener('click', pza1TR, false);

let Pix: number, Piy: number;
let Pfx: number, Pfy: number;
let theta = 0.3, phi = 1.3, SensibilidadX = 0.02, SensibilidadY = 0.02;
let flag: boolean = false;

function handleMouse(evento: any) {
  Pix=evento.offsetX;
  Piy = evento.offsetY;
  flag = true;
}

function makeVizualization(evento: any) {
  if (flag) {
    Pfx = evento.offsetX;
    Pfy = evento.offsetY;
    //console.log(Pfx, Pfy)
    let difX = Pix - Pfx;
    let difY = Pfy - Piy;
    vp(0, 0.1 * difY / 50, 1);
    Piy = Pfy;
    vp(0.1 * difX, 0 / 50, 1);
    Pix = Pfx;
    /*if( Piy>Pfy+1 ){
      phi += SensibilidadY;
      vp(0, 0.1*, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Piy=Pfy;
    }

    if(Pfy>Piy+1){
      phi -= SensibilidadY;
      vp(0,-0.1, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Piy=Pfy;
    }*/

    /*if (Pix > Pfx + 1) {
      theta += SensibilidadX;
      vp(0.1, 0, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Pix = Pfx;
    }
        
    if (Pfx > Pix + 1) {
      theta -= SensibilidadX;
      vp(-0.1, 0, 1);
      //cv.redibuja(theta, phi, tamanoObjeto);
      Pix = Pfx;
    }*/
  }
}

function noDraw() {
  flag = false;
}

canvas.addEventListener('mousedown', handleMouse);
canvas.addEventListener('mouseup', noDraw);
canvas.addEventListener('mousemove', makeVizualization);