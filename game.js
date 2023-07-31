const RIGHT = 'right'
const LEFT = 'left'
const UP = 'up'
const DOWN = 'down'
const START = 'start'
const STOP = 'stop'
const MOVE = 'move'
const NEXT = 'next'
const NOW  = 'now'


class Game {
    constructor() {
      this.size = 4
      this.loop = 0
      this.stop = 4
    }
    isStepStop() {
        if (this.loop == this.size - 1) {
            return true
        }
    return false
    }
    nextStep() {
        this.loop++
    }
    stopLoop() {
        this.loop = 0
    }
    addScore(score) {
        this.score += score
    }
    isStop() {
        if (this.stop <= 0) {
            return true
        }
    return false
    }
    stopPrepare() {
        this.stop -= 1
    }
    isContinueStop() {
        if (this.stop < 4){
            return true
        }
    return false
    }
}