var board = ["----------",
            "-PPPPPPPP-",
            "-PPPPPPPP-",
            "-        -",
            "-        -",
            "-        -",
            "-        -",
            "-PPPPPPPP-",
            "-PPPPPPPP-",
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
      return vector.x >= 0 && vector.x < this.width &&
            vector.y >= 0 && vector.y < this.height;
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
      
      if(startObj != null) {
            if(this.playerTurn.playersPiece(start)) {
                  if(this.chessboard.isInside(dest)) {
                        if(startObj.move(start, dest, destObj, this.player1.go)){
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
      this.toString();
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

function Edge(){

}
function Pawn(){
      this.moves = [[0,1],[1,1],[-1,1]]
}
Pawn.prototype.move = function(start,dest,destObj, player1) {
      console.log(start.x + ', ' + start.y + " d: " + dest.x + ', ' + dest.y);
      var move = dest.change(start); //move is vector of the change
      console.log('x: ' + move.x + ' y: ' + move.y);
      var dir = player1 ? 1 : -1;
      if ( ( move.y === dir) && (move.x === 0 || ((move.x === 1 || move.x === -1) && destObj != null))) {
            return true;
      } else {
            return false;
      }
}
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
            console.log(position.x + ' ' + this.piecePositions[i][0] + ' / ' + position.y + ' ' + this.piecePositions[i][1])
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


var match = new Match(board, {"-": Edge, "P": Pawn});