const elements = document.getElementsByTagName("td");

class Game {
  constructor(p1, p2, elements) {
    this.board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.p1 = p1;
    this.p2 = p2;
    this.current = p1;
    this.elements = elements;
    this.Mapping = new Map();
  }

  play() {
    let i = 0;
    for (let ele of this.elements) {
      this.Mapping.set(ele, this.board[i++]);
      ele.innerHTML = i;
    }

    for (let ele of this.elements) {
      ele.addEventListener("click", (e) => {
        if (
          this.Mapping.get(ele) == this.p1 ||
          this.Mapping.get(ele) == this.p2
        ) {
          console.log(`click ignored! still waiting for ${this.current}`);
          return;
        }
        ele.innerHTML = this.current;
        this.board[this.Mapping.get(ele) - 1] = this.current;
        if (this.win()) {
          alert(this.win());
          alert("you gotta stop the game asynchronously!");
          return;
        }
        this.Mapping.set(ele, this.current);
        this.current = this.current == this.p1 ? this.p2 : this.p1;
      });
    }
  }
  win() {
    let b = this.board;
    console.log("calling win:");
    console.log(b);
    if (
      (b[0] == b[1] && b[0] == b[2]) ||
      (b[0] == b[3] && b[0] == b[6]) ||
      (b[0] == b[4] && b[0] == b[8])
    ) {
      console.log("we have a winner!");
      return b[0];
    }
    if (
      (b[1] == b[4] && b[1] == b[7]) ||
      (b[2] == b[4] && b[2] == b[6]) ||
      (b[3] == b[4] && b[3] == b[5])
    ) {
      return b[4];
    }
    if ((b[2] == b[5] && b[2] == b[8]) || (b[6] == b[7] && b[6] == b[8])) {
      return b[8];
    }
    return false;
  }
}

new Game("#", "*", elements).play();
