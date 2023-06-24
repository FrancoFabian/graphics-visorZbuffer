var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
//import { Canvas3D } from './Canvas3D.js';
//import { CvWireframe } from './CvWireFrame.js';
//import { CvHLines } from './CvHLines.js';
import { CvZbuf } from './CvZbuf.js';
import { Rota3D } from './Rota3D.js';
import { Point3D } from './point3D.js';
var canvas;
var graphics;
canvas = document.getElementById('circlechart');
graphics = canvas.getContext('2d');
var cv;
var obj;
var ang = 0;
function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
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
function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    //
    //readObject(new Input(contenido));
    elemento.innerHTML = contenido;
}
function vp(dTheta, dPhi, fRho) {
    if (obj != undefined) {
        var obj_1 = cv.getObj();
        if (!obj_1.vp(cv, dTheta, dPhi, fRho))
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
    var tr = 0.1;
    for (var i = 17; i <= 20; i++) {
        obj.w[i].x = obj.w[i].x + tr;
    }
    cv.setObj(obj);
    cv.paint();
}
function pza1DerFunc() {
    var af = 10;
    Rota3D.initRotate(obj.w[139], obj.w[140], af * Math.PI / 180);
    for (var i = 201; i <= 238; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
    cv.paint();
}
function pza1IzqFunc() {
    var af = -10;
    Rota3D.initRotate(obj.w[139], obj.w[140], af * Math.PI / 180);
    for (var i = 201; i <= 238; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
    cv.paint();
}
function pza12DerFunc() {
    var af = 10;
    Rota3D.initRotate(obj.w[29], obj.w[30], af * Math.PI / 180);
    for (var i = 101; i <= 140; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    for (var i = 201; i <= 238; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
    cv.paint();
}
function pza12IzqFunc() {
    var af = -10;
    Rota3D.initRotate(obj.w[29], obj.w[30], af * Math.PI / 180);
    for (var i = 101; i <= 140; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    for (var i = 201; i <= 238; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
    cv.paint();
}
function animateTeethTransition(numIterations, delay) {
    return __awaiter(this, void 0, void 0, function () {
        // Definir la función de animación
        function animate() {
            return __awaiter(this, void 0, void 0, function () {
                var iteration, tooth, currentToothStartIndex, nextToothStartIndex, t, toothPositions, nextToothPositions, i, currentPos, nextPos, interpolatedPosition;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            iteration = 0;
                            _a.label = 1;
                        case 1:
                            if (!(iteration < numIterations)) return [3 /*break*/, 4];
                            for (tooth = 0; tooth < numTeeth; tooth++) {
                                currentToothStartIndex = tooth * verticesPerTooth;
                                nextToothStartIndex = ((tooth + 1) % numTeeth) * verticesPerTooth;
                                t = (iteration + 1) / numIterations;
                                toothPositions = initialPositions.slice(currentToothStartIndex, currentToothStartIndex + verticesPerTooth);
                                nextToothPositions = initialPositions.slice(nextToothStartIndex, nextToothStartIndex + verticesPerTooth);
                                // Comprobar si las posiciones iniciales están definidas
                                if (toothPositions.some(function (pos) { return !pos; }) || nextToothPositions.some(function (pos) { return !pos; })) {
                                    throw new Error('Entrada inválida: alguna posición inicial no está definida');
                                }
                                // Interpolar las posiciones de los vértices y actualizar el array obj.w
                                for (i = 0; i < verticesPerTooth; i++) {
                                    currentPos = toothPositions[i];
                                    nextPos = nextToothPositions[i];
                                    interpolatedPosition = interpolatePoint3D(currentPos, nextPos, t);
                                    obj.w[currentToothStartIndex + i] = interpolatedPosition;
                                }
                            }
                            // Llamar a la función de renderizado para actualizar la visualización
                            cv.paint();
                            // Pausar la ejecución durante el retraso especificado (en milisegundos)
                            // Puedes ajustar este valor según la velocidad de animación deseada
                            return [4 /*yield*/, sleep(delay)];
                        case 2:
                            // Pausar la ejecución durante el retraso especificado (en milisegundos)
                            // Puedes ajustar este valor según la velocidad de animación deseada
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            iteration++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        // Función de utilidad para interpolar entre dos puntos 3D
        function interpolatePoint3D(p1, p2, t) {
            if (!p1 || !p2) {
                throw new Error('Entrada inválida: p1 o p2 no está definido');
            }
            var x = p1.x + (p2.x - p1.x) * t;
            var y = p1.y + (p2.y - p1.y) * t;
            var z = p1.z + (p2.z - p1.z) * t;
            return new Point3D(x, y, z);
        }
        // Función de utilidad para pausar la ejecución durante el tiempo especificado
        function sleep(ms) {
            return new Promise(function (resolve) { return setTimeout(resolve, ms); });
        }
        // Función para restablecer las posiciones originales del objeto
        function resetObjPositions() {
            var objToReset = obj.getObj();
            objToReset.setPositions(initialObjPositions);
            cv.paint();
        }
        var totalVertices, numTeeth, verticesPerTooth, initialPositions, tooth, toothStartIndex, toothPositions, i, initialObjPositions;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    totalVertices = 12452;
                    numTeeth = 44;
                    verticesPerTooth = Math.floor(totalVertices / numTeeth);
                    initialPositions = [];
                    // Almacenar las posiciones iniciales de los vértices para cada diente
                    for (tooth = 0; tooth < numTeeth; tooth++) {
                        toothStartIndex = tooth * verticesPerTooth;
                        toothPositions = [];
                        for (i = 0; i < verticesPerTooth; i++) {
                            toothPositions.push(obj.w[toothStartIndex + i] || new Point3D(0, 0, 0));
                        }
                        initialPositions.push.apply(initialPositions, toothPositions);
                    }
                    initialObjPositions = obj.getObj().getPositions();
                    // Iniciar la animación
                    return [4 /*yield*/, animate()];
                case 1:
                    // Iniciar la animación
                    _a.sent();
                    return [4 /*yield*/, resetObjPositions()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
document.getElementById('file-input').addEventListener('change', leerArchivo, false);
document.getElementById('eyeDown').addEventListener('click', eyeDownFunc, false);
document.getElementById('eyeUp').addEventListener('click', eyeUpFunc, false);
document.getElementById('eyeLeft').addEventListener('click', eyeLeftFunc, false);
document.getElementById('eyeRight').addEventListener('click', eyeRightFunc, false);
document.getElementById('incrDist').addEventListener('click', incrDistFunc, false);
document.getElementById('decrDist').addEventListener('click', decrDistFunc, false);
//movimiento de piezas
document.getElementById('pza1Izq').addEventListener('click', function () {
    for (var i = 1; i <= 140; i++) {
        animateTeethTransition(30, 100);
    }
}, false);
document.getElementById('pza1Der').addEventListener('click', function () { }, false);
document.getElementById('pza12Izq').addEventListener('click', pza12IzqFunc, false);
document.getElementById('pza12Der').addEventListener('click', pza12DerFunc, false);
document.getElementById('pzatr').addEventListener('click', pza1TR, false);
var Pix, Piy;
var Pfx, Pfy;
var theta = 0.3, phi = 1.3, SensibilidadX = 0.02, SensibilidadY = 0.02;
var flag = false;
function handleMouse(evento) {
    Pix = evento.offsetX;
    Piy = evento.offsetY;
    flag = true;
}
function makeVizualization(evento) {
    if (flag) {
        Pfx = evento.offsetX;
        Pfy = evento.offsetY;
        //console.log(Pfx, Pfy)
        var difX = Pix - Pfx;
        var difY = Pfy - Piy;
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
