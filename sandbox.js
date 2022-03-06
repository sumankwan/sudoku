// solve() {
//     let dictionary = '123456789', ngecek = false
//     for (let i = 0; i < this.start.length; i++) {
//       if (this.start[i] == '0') {
//         for (let j = 0; j < this.rows.length; j++) {
//           for (let k = 0; k < this.rows[j].length; k++) {
//             if (i == this.rows[j][k]) {
//               for (let m = 0; m < dictionary.length; m++) {
//                 for (let n = 0; n < this.rows[j].length; n++) {
//                   if (dictionary[m] == this.start[this.rows[j][n]]) {
//                     ngecek = false
//                   }
//                 }
                
//               }
//             }
//           }
//         }
//       } else {
//         this.solved += this.start[i]
//       }
//     }
//   }

// var coba = '1582976452481919736762839615763432516389'
// var coba2 = '145832670391276485253400819519047326762183094824761053987614230436920501670358942'
// var coba3 = '14583267391276485253481951947326762183948247615398761423436925167358942'
// var coba4 = '105802000090076405200400819019007306762083090000061050007600030430020501600308900'
// console.log(coba2.length)

function cek () {
    let ngecekWhile = true, ngecekFor = true, dictionary = []
    while (ngecekWhile) {
        let random = Math.ceil(Math.random() * 9)
        ngecekFor = true
        for (let i = 0; i < 9; i++) {
            if (dictionary[i] == random) {
                ngecekFor = false
            }
        }
        if (ngecekFor) {
        dictionary.push(random)
        }    
        if (dictionary.length == 9) {
        ngecekWhile = false
        }
    }
    return dictionary
}

// let ngecek = true
// while (ngecek) {
//     let dict = cek ()
//     for (let i = 0; i < dict.length; i++) {
//         if (dict[i] == 1) {
//             ngecek = false
//         }
//     }
//     console.log(dict)
// }

// console.log(dictionary)

// console.log(Math.ceil(Math.random() * 9))

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

let arr = [1, 2, 4]
arr.splice(1, 0, 4)
console.log(arr)

// solve() {
//     let cek = false
//     for (let i = 0; i < this.updatedBoard.length; i++) {
//       if (this.updatedBoard[i] == '0') {
//         this.randomDictionary()
//         for (let j = 0; j < this.dictionary.length; j++) {
//           if (this.checkRow(this.dictionary[j], this.getRowLocation(i)) && 
//               this.checkColumn(this.dictionary[j], this.getColumnLocation(i)) &&
//               this.checkSquare(this.dictionary[j], this.getSquareLocation(i))) {
//             this.restart(this.updatedBoard, this.dictionary[j], i)
//             this.empties.splice()
//             break
//           }
//         }

//         if (this.updatedBoard[i] == '0') {
//           i = this.getEmptyLocation(i)
//           this.restart(this.updatedBoard, 0, i)
//           console.log(i, this.updatedBoard)
//         }
//       }
//     }   
//     return this.updatedBoard
//   }