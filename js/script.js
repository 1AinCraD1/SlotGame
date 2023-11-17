const images = ['https://w7.pngwing.com/pngs/322/880/png-transparent-fruits-slot-machine-cherry-computer-icons-cherry-love-game-food.png', 'https://e7.pngegg.com/pngimages/542/116/png-clipart-kiwifruit-vitamin-organic-food-kiwi-kiwi-fruit-natural-foods-food.png', 'https://w7.pngwing.com/pngs/974/358/png-transparent-green-apple-illustration-apple-icon-large-painted-green-apple-natural-foods-food-granny-smith.png', 'https://e7.pngegg.com/pngimages/137/862/png-clipart-common-grape-vine-wine-s-of-grapes-purple-food.png', 'https://w7.pngwing.com/pngs/959/969/png-transparent-strawberry-illustration-strawberry-shortcake-strawberry-s-natural-foods-frutti-di-bosco-food.png', 'https://w7.pngwing.com/pngs/712/613/png-transparent-key-lime-lemon-persian-lime-green-lemon-food-citrus-green-apple.png', 'https://e7.pngegg.com/pngimages/995/471/png-clipart-slotomania-slots-777-free-casino-fruit-machines-hit-it-rich-slot-machine-casino-game-others-miscellaneous-game.png'];

let playerName = "Player 1";

const enteredName = prompt("Enter player name:");
if (enteredName) {
    playerName = enteredName;
}

const allowedClicks = 3;
let clickCount = 0;

const allCombinations = [];

document.getElementById('generate').addEventListener('click', function() {
    if (clickCount < allowedClicks) {
        function getRandomImage(existingImages, column) {
            const availableImages = images.filter(img => !existingImages[column].includes(img));
            if (availableImages.length === 0) {
                existingImages[column].length = 0;
                return images[Math.floor(Math.random() * images.length)];
            }
            return availableImages[Math.floor(Math.random() * availableImages.length)];
        }

        const usedImages = [[], [], []];

        document.getElementById('slot1').querySelectorAll('img').forEach(function(img, index) {
            const newImage = getRandomImage(usedImages, 0);
            img.src = newImage;
            usedImages[0].push(newImage);
        });

        document.getElementById('slot2').querySelectorAll('img').forEach(function(img, index) {
            const newImage = getRandomImage(usedImages, 1);
            img.src = newImage;
            usedImages[1].push(newImage);
        });

        document.getElementById('slot3').querySelectorAll('img').forEach(function(img, index) {
            const newImage = getRandomImage(usedImages, 2);
            img.src = newImage;
            usedImages[2].push(newImage);
        });

        allCombinations.push([...usedImages]);

        clickCount++;

        if (clickCount === allowedClicks) {
            showResultMessage();
        }
    }
});

function showResultMessage() {
    const resultMessage = document.getElementById('result-message');

    const hasWinner = allCombinations.some(combination => {
        return checkImages(combination, 0) || checkImages(combination, 1) || checkImages(combination, 2);
    });

    if (hasWinner) {
        resultMessage.textContent = `${playerName}, congratulations! You win!`;
    } else {
        resultMessage.textContent = `${playerName}, alas, you lost. Try again!`;
    }
}

function checkImages(combination, position) {
    return combination[0][position] === combination[1][position] && combination[1][position] === combination[2][position];
}

document.getElementById('reset').addEventListener('click', function() {
    clickCount = 0;
    allCombinations.length = 0;
    document.querySelectorAll('.slot img').forEach(img => img.src = "");
    document.querySelectorAll('.slot1 img').forEach(img => img.src = "");
    const resultMessage = document.getElementById('result-message');
    resultMessage.textContent = "";
});
