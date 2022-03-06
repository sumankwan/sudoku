"use strict"

const { get } = require('http')

class Sudoku {
  constructor(board_string) {
    this.start = board_string
    this.firstBoard = ''
    this.updatedBoard = this.start
    this.backtrackedBoard = ''
    this.rows = []
    this.columns = []
    this.squares = []
    this.empties = []
    this.getRows()
    this.getColumns()
    this.getSquare()
    this.getEmpties()
    this.rowLocation = 0
    this.columnLocation = 0
    this.squareLocation = 0
    this.emptyLocation = 0
    this.dictionary = []
    this.deadEnd = 0
  }

  getRows() {
    let container = []
    for (let i = 0; i < this.start.length; i++) {
      container.push(i)
      if ((i + 1) % (Math.sqrt(this.start.length)) == 0) {
        this.rows.push(container)
        container = []
      }
    }
    return this.rows
  }

  getColumns () {
    let container = []
    for (let i = 0; i < Math.sqrt(this.start.length); i++) {
      for (let j = 0; j < this.start.length; j++) {
        if (j == i || (j - i) % (Math.sqrt(this.start.length)) == 0) {
          container.push(j)
        }
      }
      this.columns.push(container)
      container = []
    }
    return this.columns
  }

  getSquare () {
    let container = []
    for (let m = 0; m < this.start.length; m += 27) {
      for (let k = 0; k < Math.sqrt(this.start.length); k += 3) {
        for (let j = 0; j < (this.start.length / 3); j += 9) {
          for (let i = 0; i < Math.sqrt(Math.sqrt(this.start.length)); i++) {
            container.push(i + j + k + m)
          }
        }
        this.squares.push(container)
        container = []
      }
    }
    return this.squares
  }

  getEmpties () {
    for (let i = 0; i < this.start.length; i++) {
      if (this.start[i] == '0') {
        this.empties.push(0)
      } else {
        this.empties.push('')
      }
    }
    return this.empties
  }

  getRowLocation (indexNum) {
    for (let i = 0; i < this.rows.length; i++) {
      for (let j = 0; j < this.rows[i].length; j++) {
        if (indexNum == this.rows[i][j]) {
          this.rowLocation = i
        }
      }
    }
    return this.rowLocation
  }

  getColumnLocation (indexNum) {
    for (let i = 0; i < this.columns.length; i++) {
      for (let j = 0; j < this.columns[i].length; j++) {
        if (indexNum == this.columns[i][j]) {
          this.columnLocation = i
        }
      }
    }
    return this.columnLocation
  }

  getSquareLocation(indexNum) {
    for (let i = 0; i < this.squares.length; i++) {
      for (let j = 0; j < this.squares[i].length; j++) {
        if (indexNum == this.squares[i][j]) {
          this.squareLocation = i
        }
      }
    }
    return this.squareLocation
  }

  getEmptyLocation(indexNum) {
    let container = 0
    for (let i = this.empties.length - 1; i >= 0; i--) {
      if (indexNum == i) {
        for (let j = i; j >= 0; j--) {
          if (this.empties[j] !== '' && j !== i) {
            container = j
            break
          }
        }
      }
    }
    return container
  }

  checkRow (num, location) {
    let container = true
    for (let i = 0; i < this.rows[location].length; i++) {
      if (num == this.updatedBoard[this.rows[location][i]]) {
        container = false 
      }
    }
    return container
  }

  checkColumn (num, location) {
    let container = true
    for (let i = 0; i < this.columns[location].length; i++) {
      if (num == this.updatedBoard[this.columns[location][i]]) {
        container = false
      }
    }
    return container
  }

  checkSquare (num, location) {
    let container = true
    for (let i = 0; i < this.squares[location].length; i++) {
      if (num == this.updatedBoard[this.squares[location][i]]) {
        container = false
      }
    }
    return container
  }

  restart (board, updatedNum, index) {
    this.updatedBoard = ''
    for (let i = 0; i < board.length; i++) {
      if (i == index) {
        this.updatedBoard += updatedNum
      } else {
        this.updatedBoard += board[i]
      }
    }
    return this
  }

  randomDictionary () {
    let ngecekWhile = true, ngecekFor = true 
    this.dictionary = []
    while (ngecekWhile) {
      let random = Math.ceil(Math.random() * 9)
      ngecekFor = true
      for (let i = 0; i < 9; i++) {
        if (this.dictionary[i] == random) {
            ngecekFor = false
        }
      }
      if (ngecekFor) {
        this.dictionary.push(random)
      }    
      if (this.dictionary.length == 9) {
        ngecekWhile = false
      }
    }
    return this
  }

  randomNum () {
    let random = Math.ceil(Math.random() * 9)
    return random
  }

  checkSolved (board) {
    let container = true
    for (let i = 0; i < board.length; i++) {
      if (board[i] == '0') {
        container = false
      }
    }
    return container
  }

  // backtracking (index, num) {
  //   let container = false
  //   if (this.checkSolved(this.backtrackedBoard)) {
  //     container = true
  //     return container
  //   } else {
  //     this.backtrackRestart(this.backtrackedBoard, num, index)
  //     for (let i = index; i < this.backtrackedBoard.length; i++) {
  //       if (this.backtrackedBoard[i] == '0') {
  //         for (let j = 1; j <= 9; j++) {
  //           if (this.checkRow(j, this.getRowLocation(i)) && 
  //               this.checkColumn(j, this.getColumnLocation(i)) &&
  //               this.checkSquare(j, this.getSquareLocation(i)) &&
  //               this.backtracking(i, j)) {
  //             this.backtrackRestart(this.backtrackedBoard, j, i)
  //             break
  //           }
  //         }
  //         if (this.backtrackedBoard[i] == '0') {
  //           container = false
  //         } 
  //       }
  //     }
  //   container = this.checkSolved (this.backtrackedBoard)   
  //   return container
  //   }   
  // }

  backtracking (index, num) {
    let container = false
    if (this.checkSolved(this.updatedBoard)) {
      console.log(this.updatedBoard)
      container = true
      return container
    } else {
      this.restart(this.updatedBoard, num, index)
      for (let i = index; i < this.updatedBoard.length; i++) {
        if (this.updatedBoard[i] == '0') {
          for (let j = 1; j <= 9; j++) {
            if (this.checkRow(j, this.getRowLocation(i)) && 
                this.checkColumn(j, this.getColumnLocation(i)) &&
                this.checkSquare(j, this.getSquareLocation(i)) &&
                this.backtracking(i, j)) {
              this.restart(this.updatedBoard, j, i)
              break
            }
          }
          if (this.updatedBoard[i] == '0') {
            container = false
          } 
        }
      }
    container = this.checkSolved (this.updatedBoard)   
    return container
    }   
  }

  backtrackRestart (board, updatedNum, index) {
    this.backtrackedBoard = ''
    for (let i = 0; i < board.length; i++) {
      if (i == index) {
        this.backtrackedBoard += updatedNum
      } else {
        this.backtrackedBoard += board[i]
      }
    }
    return this
  }

  solve() {
    for (let i = 0; i < this.updatedBoard.length; i++) {
      if (this.updatedBoard[i] == '0') {
        for (let j = 1; j <= 9; j++) {
          // this.backtrackedBoard = this.updatedBoard
          if (this.checkRow(j, this.getRowLocation(i)) && 
              this.checkColumn(j, this.getColumnLocation(i)) &&
              this.checkSquare(j, this.getSquareLocation(i)) &&
              this.backtracking(i, j)) {
            // console.log(i, this.backtracking(i, j), this.checkRow(j, this.getRowLocation(i)), this.checkColumn(j, this.getColumnLocation(i)), this.checkSquare(j, this.getSquareLocation(i)))
            this.restart(this.updatedBoard, j, i)
            // console.log(this.updatedBoard)
            break
          }
        } 
      }
    }   
    return this.updatedBoard
  }

  // Returns a string representing the current state of the board
  board() {
    for (let i = 0; i < this.start.length; i++) {
      if (i == 0 || i % 27 == 0) {
        this.firstBoard += `--------------------- \n`
      }
      if (i % 3 == 0 && i % (Math.sqrt(this.start.length)) !== 0) {
        this.firstBoard += `| `
      }
      if ((i + 1) % (Math.sqrt(this.start.length)) == 0) {
        this.firstBoard += `${this.start[i]}\n`
      } else {
        this.firstBoard += `${this.start[i]} `
      }
      if (i == this.start.length - 1) {
        this.firstBoard += `---------------------`
      }
    }
    return this.firstBoard
  }

  printSolved () {
    this.solvedBoard = '' 
    for (let i = 0; i < this.updatedBoard.length; i++) {
      if (i == 0 || i % 27 == 0) {
        this.solvedBoard += `--------------------- \n`
      }
      if (i % 3 == 0 && i % (Math.sqrt(this.updatedBoard.length)) !== 0) {
        this.solvedBoard += `| `
      }
      if ((i + 1) % (Math.sqrt(this.updatedBoard.length)) == 0) {
        this.solvedBoard += `${this.updatedBoard[i]}\n`
      } else {
        this.solvedBoard += `${this.updatedBoard[i]} `
      }
      if (i == this.updatedBoard.length - 1) {
        this.solvedBoard += `---------------------`
      }
    }
    return this.solvedBoard
  }

  check () {
    return this.updatedBoard
  }

}

// The file has newlines at the end of each line,
// so we call split to remove it (\n)
var fs = require('fs')
var board_string = fs.readFileSync('set-01_sample.unsolved.txt')
  .toString()
  .split("\n")[0]

var board_string2 = fs.readFileSync('set-02_project-euler_50-easy-puzzles.txt')
  .toString()
  .split("\n")[0]

var coba = '105802000090076405200400819019007306762083090000061050007600030430020501600308900'

var game = new Sudoku(coba)

console.log(game.solve())

// Remember: this will just fill out what it can and not "guess"
// game.solve()

// console.log(game.board())