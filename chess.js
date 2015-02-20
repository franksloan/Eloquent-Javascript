var board = ["----------",
            "-CKBPPBKC-",
            "-PPPPPPPP-",
            "-        -",
            "-        -",
            "-        -",
            "-        -",
            "-PPPPPPPP-",
            "-CKBPPBKC-",
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
      this.player1 = new Player(true);
      this.player2 = new Player(false);
      this.player1.setup(1);
      this.player1.setup(2);
      this.player2.setup(7);
      this.player2.setup(8);
      this.playerTurn = this.player1;

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
      
      if(startObj != null) {
            if(this.playerTurn.playersPiece(start)) {
                  if(this.chessboard.isInside(dest)) {
                        if(startObj.move(start, dest, self, destObj, this.player1.go)){
                              if(!this.playerTurn.playersPiece(dest)){
                                    console.log('moving');
                                    this.chessboard.set(start, null);
                                    this.takeDestination(dest, destObj);
                                    this.playerTurn.changePosition(start, dest, false);
                                    
                                    this.chessboard.set(dest, startObj);
                                    //Change player
                                    this.playerTurn = this.player1.go ? this.player2 : this.player1;
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
      this.moves = [[0,1],[1,1],[-1,1]]
}
Pawn.prototype.move = function(start,dest,self,destObj, player1) {
      console.log(start.x + ', ' + start.y + " d: " + dest.x + ', ' + dest.y);
      var move = dest.change(start); //move is vector of the change
      console.log('x: ' + move.x + ' y: ' + move.y);
      var dir = player1 ? 1 : -1;
      var pieceInWay = self.chessboard.get(new Vector((start.x),(start.y + dir)));
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
function Knight(){
      //List of moves that a knight can make
      this.validMoves = [[1,2],[1,-2],[2,1],[2,-1],[-1,2],[-1,-2],[-2,1],[-2,-1]];
}
Knight.prototype.move = function(start,dest) {
      var move = dest.change(start);
      for (var i = 0; i < this.validMoves.length; i++) {
            if (move.x == this.validMoves[i][0] && move.y == this.validMoves[i][1]) {
                  return true;
            }
      }
      return false;
}
function Castle(){

}
Castle.prototype.move = function(start, dest, self) {
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
function Bishop() {

}
Bishop.prototype.move = function(start, dest, self) {
      var move = dest.change(start);
      if (move.x / move.y == 1) {
            var i, j;
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
      if (move.x / move.y == -1) {
            var i,j;
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
//END - pieces section
function Player(go) {
      this.go = go;
      this.piecePositions = [];
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


var match = new Match(board, {"-": Edge, "P": Pawn, "K": Knight, "C": Castle, "B": Bishop});
match.turn([4,2],[4,4]);
match.turn([6,7],[6,5]);
match.toString();