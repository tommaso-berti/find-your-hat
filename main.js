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
    static generateField() {
        const width = parseInt(prompt('Choose width: '));
        const height = parseInt(prompt('Choose height: '));
        const percentage = parseInt(prompt('Choose the percentages of holes: '));

        if (
            Number.isNaN(width) ||
            Number.isNaN(height) ||
            Number.isNaN(percentage)
        ) {
            throw new Error('Width, height and percentage must be numbers');
        }
        if (
            percentage < 0 ||
            percentage > 100 ||
            width <= 0 ||
            height <= 0
        ) {
            throw new Error('Width, height and percentage must be valid positive numbers, percentage must be between 0 and 100');
        }

        const field = [];
        for (let y = 0; y < height; y++) {
            const row = [];
            for (let x = 0; x < width; x++) {
                row.push(fieldCharacter);
            }
            field.push(row);
        }

        const playerPosition = [0, 0];
        field[playerPosition[1]][playerPosition[0]] = pathCharacter;

        let hatPosition;
        while (true) {
            const hatX = Math.floor(Math.random() * width);
            const hatY = Math.floor(Math.random() * height);
            if (!(hatX === playerPosition[0] && hatY === playerPosition[1])) {
                hatPosition = [hatX, hatY];
                field[hatY][hatX] = hat;
                break;
            }
        }

        const numbersOfHolesRaw = Math.floor(((width * height) * percentage) / 100);
        const numbersOfHoles = numbersOfHolesRaw === 0 ? 1 : numbersOfHolesRaw;

        let holePositions = [];
        while (holePositions.length < numbersOfHoles) {
            const holeX = Math.floor(Math.random() * width);
            const holeY = Math.floor(Math.random() * height);

            const isPlayer = holeX === playerPosition[0] && holeY === playerPosition[1];
            const isHat = holeX === hatPosition[0] && holeY === hatPosition[1];
            const alreadyHole = holePositions.some(hole => hole[0] === holeX && hole[1] === holeY);

            if (!isPlayer && !isHat && !alreadyHole) {
                holePositions.push([holeX, holeY]);
                field[holeY][holeX] = hole;
            }
        }

        const instance = new Field(field);
        instance.playerPosition = playerPosition;
        instance.hatPosition = hatPosition;
        instance.holePositions = holePositions;
        instance.width = width;
        instance.height = height;

        return instance;
    }


    movePlayer(direction) {
        const previousPlayerPositionX = this.playerPosition[0];
        const previousPlayerPositionY = this.playerPosition[1];
        this.gameField[previousPlayerPositionY][previousPlayerPositionX] = fieldCharacter;
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
        const newPlayerPositionX = this.playerPosition[0];
        const newPlayerPositionY = this.playerPosition[1];
        this.gameField[newPlayerPositionY][newPlayerPositionX] = pathCharacter;
    }

}

const myField = Field.generateField();

let end = false
while(end !== true) {

    myField.printField();

    const userPrompt = prompt('Choose a direction (u:up, d:down, r:right, l:left): ');
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
}