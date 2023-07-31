const speed = 15

class CellsBoard {
    constructor(width, scoreHeightBiasField, gap, bias) {
      this.cells = []
        for (let i = 0; i < size; i++) {
            this.cells[i] = []
            for (let j = 0; j < size; j++) {
                this.cells[i][j] = {
                  x: i * width + gap + bias,
                  y: j * width + gap + bias + scoreHeightBiasField,
                  value: 0,
                  img: new Image(),
                  speed: 0,
                  end: 0,
                  state: NOW
                }
            }
        }
    }
  getFreeCellsCount() {
    let freeCellsCount = 0
    let i, j
    for (i = 0; i < size; i++) {
      for (j = 0; j < size; j++) {
        let cell = this.cells[i][j]
        if (!cell.value) {
          freeCellsCount++
        }
      }
    }
    return freeCellsCount
  }
  getRow(i) {
    const rows = []
    for (let j = 0; j < size; j++) {
        rows.push(this.cells[j][i].value)
    }
    return rows
  }
  getAllRows() {
    let rows = []
    for (let i = 0; i < size; i++) {
      rows.push(this.getRow(i))
    }
    return rows
  }
  getColumn(i) {
    const columns = []
    for (let j = 0; j < size; j++) {
        columns.push(this.cells[i][j].value)
    }
    return columns
  }
  getAllColumns() {
    let columns = []
    for (let i = 0; i < size; i++) {
      columns.push(this.getColumn(i))
    }
    return columns
  }
  isEqualConsecutive(rows) {
    for (let i = 0; i < size ; i++) {
      for (let j = 0; j < size - 1; j++) {
        if (rows[i][j] == rows[i][j + 1]) {
          return true
        }
      }
    }
    return false
  }
  isGameOver() {
    let freeCellsCount = this.getFreeCellsCount()
    if (freeCellsCount == 0) {
      let rows = this.getAllRows()
      let columns = this.getAllColumns()
      if (this.isEqualConsecutive(rows)) {
        return false
      }
      if (this.isEqualConsecutive(columns)) {
          return false
      }
      return true
    }
    return false
  }
  getRandomValue() {
    let rand = Math.random()
    if (rand < 0.9) {
      return 2
    }
    return 4
  }
  getRandomNewCell() {
    let zeros = this.getFreeCellsCount()
    if (zeros == 1) {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (this.cells[i][j].value == 0) {
            this.cells[i][j].value = this.getRandomValue()
            this.cells[i][j].state = NOW
            this.getImage(i, j)
            return
          }
        }
      }
    }
    while(true) {
      let i = Math.floor(Math.random() * size)
      let j = Math.floor(Math.random() * size)
      if (!this.cells[i][j].value) {
          this.cells[i][j].value = this.getRandomValue()
          this.cells[i][j].state = NOW
          this.getImage(i, j)
          return
      }
    }
  }
  getRandCellWith2Value(){
    while(true) {
      let i = Math.floor(Math.random() * size)
      let j = Math.floor(Math.random() * size)
      if (!this.cells[i][j].value) {
          this.cells[i][j].value = 2
          this.cells[i][j].state = NOW
          this.getImage(i, j)
          return
      }
    }
  }
  getImage(i, j) {
    this.cells[i][j].img.src = digit2image(this.cells[i][j].value)
  }
  moveCellsDown() {
    let i, j, col
    for (i = 0; i < size; i++) {
      for (j = size - 2; j >= 0; j--) {
        if (this.cells[i][j].value){
          col = j
          while (col + 1 < size) {
            if (!this.cells[i][col + 1].value) {
              this.cells[i][j].end = this.cells[i][col + 1].y
              this.cells[i][j].speed = speed
              this.cells[i][col + 1].value = this.cells[i][col].value
              this.cells[i][col + 1].state = NEXT
              this.getImage(i, col + 1)
              this.cells[i][col].value = 0
              col++
            } else if (this.cells[i][col].value == this.cells[i][col + 1].value) {
              this.cells[i][j].end = this.cells[i][col + 1].y
              this.cells[i][col].speed = speed
              this.cells[i][col + 1].value *= 2
              this.cells[i][col + 1].state = NEXT
              this.getImage(i, col + 1)
              score += this.cells[i][col + 1].value
              this.cells[i][col].value = 0
              break
            } else {
              break
            }
          }
        }
      }
    }
  }
  moveCellsUp() {
    var i, j, col
    for (i = 0; i < size; i++) {
      for (j = 1; j < size; j++) {
        if (this.cells[i][j].value) {
          col = j
          while (col - 1 >= 0) {
            if (!this.cells[i][col - 1].value) {
              this.cells[i][j].end = this.cells[i][col - 1].y
              this.cells[i][j].speed = -speed
              this.cells[i][col - 1].value = this.cells[i][col].value
              this.cells[i][col - 1].state = NEXT
              this.getImage(i, col - 1)
              this.cells[i][col].value = 0
              col--
            } else if (this.cells[i][col].value == this.cells[i][col - 1].value) {
              this.cells[i][j].end = this.cells[i][col - 1].y
              this.cells[i][col].speed = -speed
              this.cells[i][col - 1].value *= 2
              this.cells[i][col - 1].state = NEXT
              this.getImage(i, col - 1)
              score +=   this.cells[i][col - 1].value
              this.cells[i][col].value = 0
              break
            } else {
              break
            }
          }
        }
      }
    }
  }
  moveCellsLeft() {
    let i, j, row;
    for (j = 0; j < size; j++) {
      for (i = 1; i < size; i++) {
        if (this.cells[i][j].value) {
          row = i
          while (row > 0) {
            if (!this.cells[row - 1][j].value) {
              this.cells[i][j].end = this.cells[row - 1][j].x
              this.cells[i][j].speed = -speed
              this.cells[row - 1][j].value = this.cells[row][j].value
              this.cells[row - 1][j].state = NEXT
              this.getImage(row - 1, j)
              this.cells[row][j].value = 0
              row--
            } else if (this.cells[row][j].value == this.cells[row - 1][j].value) {
              this.cells[i][j].end = this.cells[row - 1][j].x
              this.cells[row][j].speed = -speed
              this.cells[row - 1][j].value *= 2
              this.cells[row - 1][j].state = NEXT
              this.getImage(row - 1, j)
              score +=  this.cells[row - 1][j].value
              this.cells[row][j].value = 0
              break
            } else {
              break
            }
          }
        }
      }
    }
  }
  moveCellsRight() {
    let i, j, row;
    for (j = 0; j < size; j++) {
      for (i = size - 2; i >= 0; i--) {
        if (this.cells[i][j].value) {
          row = i
          while (row + 1 < size) {
            if (!this.cells[row + 1][j].value) {
              this.cells[i][j].end = this.cells[row + 1][j].x
              this.cells[i][j].speed = speed
              this.cells[row + 1][j].value = this.cells[row][j].value
              this.cells[row + 1][j].state = NEXT
              this.getImage(row + 1, j)
              this.cells[row][j].value = 0
              row++
            } else if (this.cells[row][j].value == this.cells[row + 1][j].value) {
              this.cells[i][j].end = this.cells[row + 1][j].x
              this.cells[row][j].speed = speed
              this.cells[row + 1][j].value *= 2
              this.cells[row + 1][j].state = NEXT
              this.getImage(row + 1, j)
              score +=  this.cells[row + 1][j].value
              this.cells[row][j].value = 0
              break
            } else {
              break
            }
          }
        }
      }
    }
  }
  setState() {
    this.state = []
    for (let i = 0; i < size; i++) {
      this.state[i] = []
      for (let j = 0; j < size; j++) {
        this.state[i][j] = {
          value: this.cells[i][j].value
        }
      }
    }
  }
  isStateChanged() {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (this.state[i][j].value != this.cells[i][j].value) {
          return true
        }
      }
    }
    return false
  }
  isMovingEnd(){
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (this.cells[i][j].speed != 0){
          return false
        }
      }
    }
    return true
  }
  setStatusAllNow(){
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.cells[i][j].state = NOW
      }
    }
  }
  isGameWin() {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (this.cells[i][j].value == 2048) {
          return true
        }
      }
    }
    return false
  }
}

class CellsBoardDynamics {
  constructor(width, scoreHeightBiasField, gap, bias) {
    this.action = STOP
    this.cells = []
      for (let i = 0; i < size; i++) {
          this.cells[i] = []
          for (let j = 0; j < size; j++) {
              this.cells[i][j] = {
                x: i * width + gap + bias,
                y: j * width + gap + bias + scoreHeightBiasField,
                value: 0,
                img: new Image(),
                direction: '',
              }
          }
      }
  }
  init(cellsBoard) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        this.cells[i][j].x = cellsBoard.cells[i][j].x
        this.cells[i][j].y = cellsBoard.cells[i][j].y
        this.cells[i][j].value = cellsBoard.cells[i][j].value
        this.setAllImages()
      }
    }
  }
  setAllImages(){
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (this.cells[i][j].value) {
          this.cells[i][j].img.src = digit2image(this.cells[i][j].value)
        }
      }
    }
  }
}
