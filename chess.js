var board = ["----------",
            "-CHBKQBHC-",
            "-PPPPPPPP-",
            "-        -",
            "-        -",
            "-        -",
            "-        -",
            "-PPPPPPPP-",
            "-CHBQKBHC-",
            "----------"];

function Vector(x,y) {
      this.x = x;
      this.y = y;
};

Vector.prototype.change = function(move){
      return new Vector(this.x - move.x, this.y - move.y);
}

//Define properties and methods for the chessboard
function Board(width, height) {
      this.width = width;
      this.height = height;
      this.space = new Array(width * height);
}
Board.prototype.isInside = function(vector) {
      return vector.x > 0 && vector.x < this.width - 1 &&
            vector.y > 0 && vector.y < this.height - 1;
}
Board.prototype.get = function(vector) {
      return this.space[vector.x + this.width * vector.y];
}
Board.prototype.set = function(vector, value) {
      this.space[vector.x + this.width * vector.y] = value;
}
//

function elementFromChar(legend, chr) {
      if (chr == " "){
            return null;
      }
      var element = new legend[chr]();
      element.originChar = chr;
      return element;
}

function charFromElement(element) {
      if (element == null){
            return " ";
      } else {
            return element.originChar;
      }
}

function Match(layout, legend){
      var chessboard = new Board(layout[0].length, layout.length)
      this.chessboard = chessboard;
      this.legend = legend;
      this.player1 = new Player(true, new Vector(4,1));
      this.player2 = new Player(false, new Vector(5,8));
      this.player1.setup(1);
      this.player1.setup(2);
      this.player2.setup(7);
      this.player2.setup(8);
      this.playerTurn = this.player1;
      this.otherPlayer = this.player2;

      layout.forEach(function(line, y) {
            for (var x = 0; x < line.length; x++){
                  chessboard.set(new Vector(x,y),
                        elementFromChar(legend, line[x]));
            }
      })
}
Match.prototype.toString = function() {
      var output = "\n";
      for(var y = 0; y < this.chessboard.height; y++) {
            for(var x = 0; x < this.chessboard.width; x++){
                  var element = this.chessboard.get(new Vector(x,y));
                  output += charFromElement(element)
            }
            output += "\n";
      }
      return output;
}
Match.prototype.turn = function(from, to) {
      var start = new Vector(from[0], from[1]);
      var dest = new Vector(to[0], to[1]);
      var startObj = this.chessboard.get(start);
      var destObj = this.chessboard.get(dest);
      var self = this;

      //is there a piece to move
      if(startObj != null) {
            //is it this player's piece
            if(this.playerTurn.playersPiece(start)) {
                  //is destination on the board
                  if(this.chessboard.isInside(dest)) {
                        //check that the move is valid for this type of piece
                        if(startObj.move(start, dest, self, destObj, this.player1.go)){
                              //finally if player's own piece is not in destination, player can move
                              if(!this.playerTurn.playersPiece(dest)){
                                    console.log('moving');
                                    this.chessboard.set(start, null);
                                    //is there an opposing player's piece there
                                    this.takeDestination(dest, destObj);
                                    this.playerTurn.changePosition(start, dest, false);
                                    //put piece in destination
                                    this.chessboard.set(dest, startObj);
                                    //have we put opposing king in check
                                    for ( var i = 0; i < this.playerTurn.piecePositions; i++) {
                                          var pos
                                          if(this.playerTurn.piecePositions[0])
                                    }
                                    if(startObj.move(dest, this.otherPlayer.kingPosition, self)) {
                                          this.otherPlayer.check.push([dest.x],[dest.y]);
                                          console.log('CHECK');
                                    }
                                    //Change player
                                    this.playerTurn = this.player1.go ? this.player2 : this.player1;
                                    this.otherPlayer = this.player2.go ? this.player2 : this.player1;
                                    this.player1.go = !this.player1.go;
                                    this.player2.go = !this.player2.go;
                              } else {
                                    console.log("Your own piece is there!");
                              }
                        } else {
                              console.log("That's not a valid move for this piece");
                        }
                  } else {
                        console.log("That position is not on the board");
                  }
            } else {
                  console.log("It is not this players turn");
            }
      } else {
            console.log("There is no piece in that position to move");
      }
};


Match.prototype.takeDestination = function(dest, destObj) {
      if(destObj != null){
            if (this.player1.go) {
                  this.player2.changePosition(dest, null, true);
            } else {
                  this.player1.changePosition(dest, null, true)
            }
            console.log(charFromElement(destObj) + " has been taken, hard luck!");
      }
}

//Start contains constructors for each type of piece
function Edge(){

}
function Pawn(){
      this.firstGo = true;
}
Pawn.prototype.move = function(start,dest,self,destObj, player1) {
      var move = dest.change(start); //move is vector of the change
      var dir = player1 ? 1 : -1; //which way the player is going
      var pieceInWay = self.chessboard.get(new Vector((start.x),(start.y + dir)));
      //if it's a pawn's first move it can move two spaces in y direction
      if ( this.firstGo && (move.y === 2 * dir) && (move.x === 0) && !pieceInWay) {
            this.firstGo = false;
            return true
      }
      if ( ( move.y === dir) && ((move.x === 0 && destObj == null) || ((move.x === 1 || move.x === -1) && destObj != null))) {
            return true;
      } else {
            return false;
      }
}
function Piece() {

}
Piece.prototype.validMove = function(start,dest) {
      var move = dest.change(start);
      for (var i = 0; i < this.validMoves.length; i++) {
            if (move.x == this.validMoves[i][0] && move.y == this.validMoves[i][1]) {
                  return true;
            }
      }
      return false;      
}
Piece.prototype.squareMove = function(start,dest,self){
      var move = dest.change(start);
      if ((move.x != 0 && move.y == 0)) {
            for (var i = start.x + 1; i < dest.x; i++) {
                  var pieceInWay = self.chessboard.get(new Vector(i,start.y));
                  if (pieceInWay != null) {
                        return false;
                  }
            }
            for (var i = start.x - 1; i > dest.x; i--) {
                  var pieceInWay = self.chessboard.get(new Vector(i,start.y));
                  if (pieceInWay != null) {
                        return false;
                  }
            }
            return true;
      }
      if ((move.x == 0 && move.y != 0)) {
            for (var i = start.y + 1; i < dest.y; i++) {
                  var pieceInWay = self.chessboard.get(new Vector(start.x,i));
                  if (pieceInWay != null) {
                        return false;
                  }
            }
            for (var i = start.y - 1; i > dest.y; i--) {
                  var pieceInWay = self.chessboard.get(new Vector(start.x,i));
                  if (pieceInWay != null) {
                        return false;
                  }
            }
            return true;
      }
}
Piece.prototype.diagonalMove = function(start,dest,self) {
      var move = dest.change(start);
      var i, j;
      //top left - bottom right
      if (move.x / move.y == 1) {
            for(i = start.x + 1, j = start.y + 1; i < dest.x; i++, j++) {
                  var pieceInWay = self.chessboard.get(new Vector(i,j));
                  if (pieceInWay != null) {
                        return false;
                  }
            }
            for(i = start.x - 1, j = start.y - 1; i > dest.x; i--, j--) {
                  var pieceInWay = self.chessboard.get(new Vector(i,j));
                  if (pieceInWay != null) {
                        return false;
                  }
            }
            return true;
      }
      //top right - bottom left
      if (move.x / move.y == -1) {
            for(i = start.x + 1, j = start.y - 1; i < dest.x; i++, j--) {
                  var pieceInWay = self.chessboard.get(new Vector(i,j));
                  if (pieceInWay != null) {
                        return false;
                  }
            }
            for(i = start.x - 1, j = start.y + 1; i > dest.x; i--, j++) {
                  var pieceInWay = self.chessboard.get(new Vector(i,j));
                  if (pieceInWay != null) {
                        return false;
                  }
            }
            return true;
      }
}
function Knight(){
      //List of moves that a knight can make
      this.validMoves = [[1,2],[1,-2],[2,1],[2,-1],[-1,2],[-1,-2],[-2,1],[-2,-1]];
}
Knight.prototype = new Piece();
Knight.prototype.move = function(start,dest) {
      return this.validMove(start,dest);
}
function Castle(){

}
Castle.prototype = new Piece();
Castle.prototype.move = function(start, dest, self) {
      return this.squareMove(start, dest, self);
}
function Bishop() {

}
Bishop.prototype = new Piece();
Bishop.prototype.move = function(start, dest, self) {
      return this.diagonalMove(start, dest, self);
}
function King() {
      this.validMoves = [[1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]];
}
King.prototype = new Piece();
King.prototype.move = function(start, dest) {
      return this.validMove(start,dest);
}
function Queen() {

}
Queen.prototype = new Piece();
Queen.prototype.move = function(start,dest,self) {
      if(!this.squareMove(start,dest,self)){
            return this.diagonalMove(start,dest,self);
      } else {
            return true;
      }
}
//END - pieces section
function Player(go, king) {
      this.go = go;
      this.piecePositions = [];
      this.kingPosition = king;
      //list of positions that the king is in check from
      this.check = [];
}
Player.prototype.setup = function(yPosition){
      for (var i = 1; i <= 8; i++) {
            var newPosition = [];
            newPosition.push(i);
            newPosition.push(yPosition);
            this.piecePositions.push(newPosition);
      }
}
Player.prototype.playersPiece = function(position) {
      for (var i = 0; i < this.piecePositions.length; i++) {
            if( position.x == this.piecePositions[i][0] && position.y == this.piecePositions[i][1]){
                  return true;
            }
      }
      return false;
}
Player.prototype.changePosition = function(start, dest, taken) {
      for (var i = 0; i < this.piecePositions.length; i++) {
            if( start.x == this.piecePositions[i][0] && start.y == this.piecePositions[i][1]){
                  if (taken) {
                        this.piecePositions.splice(i,1);
                  } else {
                        this.piecePositions[i][0] = dest.x;
                        this.piecePositions[i][1] = dest.y;
                  }
            }
      }
}


var match = new Match(board, {"-": Edge, "P": Pawn, "H": Knight, "C": Castle, "B": Bishop,
                              "Q": Queen, "K": King});
match.turn([4,2],[4,4]);
match.turn([6,7],[6,5]);
match.toString();