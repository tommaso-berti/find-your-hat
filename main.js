const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field) {
        this.gameField = field;
        this.playerPosition = [0, 0];
        this.hatPosition = [1, 3];
        this.width = field[0].length;
        this.height = field.length;
        this.holePositions = [[2,0], [1,1]];
    }
    printField() {
        console.log(this.gameField.map(row => row.join(' ')).join('\n'));
    }
    fallInHole() {
        console.log("You fell in a hole! Game Over.");
        return true
    }
    fallOutOfBounds() {
        console.log("You fell out of bounds! Game Over.");
        return true
    }
    findHat() {
        console.log("Congratulations! You found your hat!");
        return true
    }
    movePlayer(direction) {
        switch (direction) {
            case 'r': {
                this.playerPosition[0] += 1;
                console.log('You moved right!');
                break
            }
            case 'l': {
                this.playerPosition[0] -= 1;
                console.log('You moved left!');
                break
            }
            case 'u': {
                this.playerPosition[1] -= 1;
                console.log('You moved up!');
                break
            }
            case 'd': {
                this.playerPosition[1] += 1;
                console.log('You moved down!');
                break
            }
            default: {
                console.log('Command not recognized! Use r,l,u,d to move.');
            }
        }
    }

}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

let end = false
while(end !== true) {
    myField.printField();
    const userPrompt = prompt('Write something: ');
    myField.movePlayer(userPrompt);
    const x = myField.playerPosition[0];
    const y = myField.playerPosition[1];
    if((x < 0 || x > myField.width) || (y < 0 || y > myField.height) ) {
        return myField.fallOutOfBounds();
    }
    if (x === myField.hatPosition[0] && y === myField.hatPosition[1]) {
        return myField.findHat()
    }
    if (myField.holePositions.some(hole => hole[0] === x && hole[1] === y)) {
        return myField.fallInHole();
    }
    console.log(myField.playerPosition)
}