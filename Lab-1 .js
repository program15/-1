const height = 20;
const width = 40;
let arrBoard = [];
randomBody = function () {
    let rundNum = Math.random();
    return rundNum > 0.50;
};
function createBoard(arr, random = false) {
    for (let a = 0; a <= height; a++) {
        arr[a] = [];
        for (let b = 0; b <= width; b++) {
            if (a === 0 || b === 0 || a === height || b === width) {
                arr[a][b] = 0
            } else {
                if (random && randomBody()) {
                    arr[a][b] = 1;
                } else {
                    arr[a][b] = 0;
                }
            }

        }
    }
}

function drawBoard(arr) {
    for (let a = 0; a <= height; a++) {
        for (let b = 0; b <= width; b++) {
            if (arr[a][b]) {
                process.stdout.write("0");
            } else {
                process.stdout.write(" ");
            }
        }
        process.stdout.write('\n');
    }
}

function changeLife(arr) {
    arrBoard = [];
    createBoard(arrBoard);
    for (let a = 1; a < height; a++) {
        for (let b = 1; b < width; b++) {
            if (!arr[a][b]) {
                if (calcNeighdors(arr, a, b) === 3) {
                    arrBoard[a][b] = 1;
                }
            } else {
                if (calcNeighdors(arr, a, b) === 3 || calcNeighdors(arr, a, b) === 2) {
                    arrBoard[a][b] = 1;
                } else {
                    arrBoard[a][b] = 0;
                }
            }
        }
    }
}

function calcNeighdors(arr, a, b) {
    return (arr[a - 1][b - 1] + arr[a - 1][b] + arr[a - 1][b + 1] +
        arr[a][b - 1] +                         arr[a][b + 1] +
        arr[a + 1][b - 1] + arr[a + 1][b] + arr[a + 1][b + 1]);
}

createBoard(arrBoard, true);
setInterval(function () {
    process.stdout.write('\033c');
    drawBoard(arrBoard);
    changeLife(arrBoard);
}, 100);
