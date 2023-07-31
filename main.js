let canvas = $("#canvas")[0]
let context = canvas.getContext('2d')
const scoreHeightBiasField = 70
canvas.width = 367
canvas.height = 367 + scoreHeightBiasField

const scoreCenterWidth = (canvas.width - 254) / 2
let score = 0
const size = 4
const gap = 4
const widthCell = (canvas.width - gap*size) / size
const insensitivity = 35

const bias = 10
let message = ''

function initGame() {
  game = new Game
  score = 0
  cellsBoardStatic = new CellsBoard(widthCell, scoreHeightBiasField, gap, bias)
  cellsBoardStatic.getRandCellWith2Value()
  cellsBoardStatic.getRandCellWith2Value()
  cellsBoardStatic.setState()
  cellsBoardDynamics = new CellsBoardDynamics(widthCell, scoreHeightBiasField, gap, bias)
}

initGame()

animation({
  update() {
    if (cellsBoardDynamics.action == START) {
        cellsBoardDynamics.action = MOVE
        cellsBoardDynamics.init(cellsBoardStatic)
        if (cellsBoardDynamics.direction == RIGHT) {
          cellsBoardStatic.moveCellsRight()
        } else if (cellsBoardDynamics.direction == LEFT) {
          cellsBoardStatic.moveCellsLeft()
        } else if (cellsBoardDynamics.direction == UP) {
          cellsBoardStatic.moveCellsUp()
        } else if (cellsBoardDynamics.direction == DOWN) {
          cellsBoardStatic.moveCellsDown()
        }
    }
    if (cellsBoardDynamics.action == MOVE) {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          let speed = cellsBoardStatic.cells[i][j].speed
          if (Math.abs(speed)) {
            let d = cellsBoardDynamics.direction

            if (d == RIGHT ||
                d == LEFT) {
              let end = cellsBoardStatic.cells[i][j].end
              let xD = cellsBoardDynamics.cells[i][j].x
              let d = cellsBoardDynamics.direction
              cellsBoardDynamics.cells[i][j].x += speed

            if ((xD > end) && d == RIGHT ||
                (xD < end) && d == LEFT) {
                  cellsBoardDynamics.cells[i][j].x = end
                  cellsBoardStatic.cells[i][j].speed = 0
            }

            } else if (d == UP ||
                       d == DOWN) {
              let end = cellsBoardStatic.cells[i][j].end
              let yD = cellsBoardDynamics.cells[i][j].y
              cellsBoardDynamics.cells[i][j].y += speed

            if ((yD > end) && d == DOWN ||
                (yD < end) && d == UP) {
                  cellsBoardDynamics.cells[i][j].y = end
                  cellsBoardStatic.cells[i][j].speed = 0
            }
            }
          }
        }
      }
      if (cellsBoardStatic.isMovingEnd()) {
        cellsBoardStatic.setStatusAllNow()

        if (game.isStepStop()) {
          game.stopLoop()
          if (cellsBoardStatic.isStateChanged()) {
            cellsBoardStatic.getRandomNewCell()
          }
          cellsBoardDynamics = new CellsBoardDynamics(widthCell, scoreHeightBiasField, gap, bias)
          cellsBoardDynamics.direction = ''
          cellsBoardDynamics.action = STOP
        } else {
          game.nextStep()
          cellsBoardDynamics.action = START
        }
      }
    }
    if (cellsBoardStatic.isMovingEnd() && !game.isContinueStop()) {
      if (cellsBoardStatic.isGameWin()) {
        game.stopPrepare()
            message = 'Уровень пройден'
      } else if (cellsBoardStatic.isGameOver()) {
        game.stopPrepare()
            message = 'Нельзя сделать ход'
      }
    }
    if (game.isContinueStop()) {
        game.stopPrepare()
    }
    if (game.isStop()) {
      alert(message)
      initGame()
    }
  },
  clear() {
    context.drawImage(scoreField, scoreCenterWidth, 0)
    context.font = "44px serif"
    context.fillStyle = 'black'
    context.fillText(score, scoreCenterWidth + 145, 48)
    context.beginPath()
    context.drawImage(field, 0, scoreHeightBiasField)
  },
  render() {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let cellDynamic = cellsBoardDynamics.cells[i][j]
        let cellStatic = cellsBoardStatic.cells[i][j]
        if (cellDynamic.value) {
          context.drawImage(cellDynamic.img, cellDynamic.x, cellDynamic.y)
        }
        if (cellStatic.value && cellStatic.stateDrawing == NOW) {
            context.drawImage(cellStatic.img, cellStatic.x, cellStatic.y)
        }
      }
    }
  }
})

$(document).mousedown(function(event) {
  mouseDownX = event.originalEvent.clientX
  mouseDownY = event.originalEvent.clientY
});
$(document).mouseup(function(event) {
  difX = event.originalEvent.clientX - mouseDownX
  difY = event.originalEvent.clientY - mouseDownY
  difAbsX = Math.abs(difX)
  difAbsY = Math.abs(difY)
  if ((difAbsX > insensitivity || difAbsY > insensitivity) && (cellsBoardDynamics.action == STOP)) {
    cellsBoardDynamics.action = START
    cellsBoardStatic.setState()
    if (difAbsX > difAbsY) {
      if (difX > 0) {
        cellsBoardDynamics.direction = RIGHT
      } else {
        cellsBoardDynamics.direction = LEFT
      }
    } else {
      if (difY < 0) {
        cellsBoardDynamics.direction = UP
      } else {
        cellsBoardDynamics.direction = DOWN
      }
    }
  }
})
