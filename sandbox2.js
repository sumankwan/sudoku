// solve() {
//     let ngecek = false, x = 0
//     while(!ngecek) {
//       this.updatedBoard = this.start
//       this.randomDictionary()
//       for (let i = 0; i < this.updatedBoard.length; i++) {
//         if (this.updatedBoard[i] == '0') {
//           for (let j = 0; j < this.dictionary.length; j++) {
//             if (this.checkRow(this.dictionary[j], this.getRowLocation(i)) && 
//                 this.checkColumn(this.dictionary[j], this.getColumnLocation(i)) &&
//                 this.checkSquare(this.dictionary[j], this.getSquareLocation(i))) {
//               this.restart(this.updatedBoard, this.dictionary[j], i)
//               break
//             }
//           }
//         }
//       }
//       console.log(this.updatedBoard)
//       if (this.checkSolved(this.updatedBoard)) {
//         ngecek = true
//       }
//     }
//     return this
//   }