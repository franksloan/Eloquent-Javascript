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
      var piece = this.chessboard.get(from);
      console.log(piece);
      var space = this.chessboard.get(to);
      console.log(this.chessboard.isInside(new Vector(5,6)));
      if(piece != null && this.chessboard.isInside(to)) {
            if(piece.move(from, to, space)){
                  this.chessboard.set(from, null);
                  this.takeDestination(space);
                  this.chessboard.set(to, piece);
            };
      } else {
            console.log("There is no piece in that position to move");
      }

      player1.go = !player1.go;
      player2.go = !player2.go;
};
Match.prototype.playersPiece = function(position, player) {
      for (var i = 0; i < player.playerPositions; i++) {
            if( position == player.playerPositions[i]){
                  return true;
            }
      }
      return false;
}

Match.prototype.takeDestination = function(space) {
      if(space != null){
            console.log(charFromElement(space) + " has been taken, hard luck!");
      }
}

function Edge(){

}
function Pawn(){
      this.moves = [[0,1],[1,1],[-1,1]]
}
Pawn.prototype.move = function(from,to,space) {
      var move = to.change(from); //move is vector of the change
      if ( move.y === 1 && (move.x === 0 || (move.x === 1 && space != null))) {
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
            console.log(position[0] + ' ' + this.piecePositions[i][0] + ' / ' + position[1] + ' ' + this.piecePositions[i][1])
            if( position[0] == this.piecePositions[i][0] && position[1] == this.piecePositions[i][1]){
                  return true;
            }
      }
      return false;
}


var match = new Match(board, {"-": Edge, "P": Pawn});