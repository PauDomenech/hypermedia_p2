// Event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve player name and initial money from localStorage
    const playerName = localStorage.getItem('playerName');
    const initialMoney = localStorage.getItem('initialMoney');

    // Check if player name and initial money exist in localStorage
    if (playerName && initialMoney) {
        // Get the player name and money elements from the DOM
        const playerNameElement = document.getElementById('player-name');
        const moneyElement = document.getElementById('money');

        // If the elements exist, set their text content to the retrieved values
        if (playerNameElement && moneyElement) {
            playerNameElement.textContent = playerName;
            moneyElement.textContent = initialMoney;
        }
    } else {
        // If player name or initial money is missing, redirect to index.html if on game.html
        if (window.location.pathname.includes('game.html')) {
            window.location.href = 'index.html';
        }
    }
});

// Function to start the game
function startGame() {
    // Get the player's name and initial money from the input fields
    const name = document.getElementById('player-name').value;
    const money = document.getElementById('initial-money').value;

    // Check if both name and money are provided
    if (name && money) {
        // Save the data in localStorage
        localStorage.setItem('playerName', name);
        localStorage.setItem('initialMoney', money);

        // Redirect to the game page
        window.location.href = 'game.html';
    } else {
        // Alert the user to enter both name and initial money
        alert('Please enter your name and initial money.');
    }
}

// Function to start a new round
function newRound() {
    // Get the initial money from localStorage
    const initialMoney = parseFloat(localStorage.getItem('initialMoney'));

    // Check if the player has no money left
    if (initialMoney <= 0) {
        alert('You have lost all your money. Redirecting to the home page.');
        window.location.href = 'index.html';
        return;
    }

    let bet;
    while (true) {
        // Ask the user for the amount they want to bet
        bet = parseFloat(prompt('Enter the amount you want to bet:'));

        // Check if the bet is valid
        if (bet <= initialMoney) {
            alert('Bet accepted. Starting the game...');
            // Disable all buttons and change their color to gray
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.disabled = true;
                button.style.backgroundColor = 'gray';
            });

            // Start the game logic here
            startGames(bet);

            break;
        } else {
            alert('Invalid bet amount. Please enter an amount less than or equal to your initial money.');
        }
    }
}

// Function to start the game logic
function startGames(bet) {
    // Initialize the deck of 40 cards
    const deck = initializeDeck();
    shuffleDeck(deck);

    // Clear previous cards
    document.getElementById('player-cards').innerHTML = '';
    document.getElementById('dealer-cards').innerHTML = '';

    // Deal one card to the player
    let playerCard = drawCard(deck);
    let playerScore = playerCard.value;
    displayCard('player-cards', playerCard);

    // Player's turn
    setTimeout(() => playerTurn(deck, playerScore, bet), 100);
}

// Function for the player's turn
function playerTurn(deck, playerScore, bet) {
    // Check if the player busts
    if (playerScore > 7.5) {
        alert('Player busts! Dealer wins.');
        updateMoney(-bet);
        resetGame();
        return;
    }

    // Check if the player wins automatically by reaching 7.5 points
    if (playerScore === 7.5) {
        alert('Player wins with 7.5 points!');
        updateMoney(bet);
        resetGame();
        return;
    }

    // Ask the player if they want to draw another card
    const drawMore = confirm('Do you want to draw another card?');
    if (!drawMore) {
        dealerTurn(deck, playerScore, bet);
        return;
    }

    // Draw a new card and update the player's score
    let newCard = drawCard(deck);
    playerScore += newCard.value;
    displayCard('player-cards', newCard);

    // Continue the player's turn
    setTimeout(() => playerTurn(deck, playerScore, bet), 100);
}

// Function for the dealer's turn
function dealerTurn(deck, playerScore, bet) {
    let dealerScore = 0;

    // Function to draw a card for the dealer
    function drawDealerCard() {
        if (dealerScore <= playerScore && dealerScore <= 7.5) {
            let newCard = drawCard(deck);
            dealerScore += newCard.value;
            displayCard('dealer-cards', newCard);
            setTimeout(drawDealerCard, 100);
        } else {
            determineWinner(playerScore, dealerScore, bet);
        }
    }

    drawDealerCard();
}

// Function to determine the winner
function determineWinner(playerScore, dealerScore, bet) {
    if (dealerScore > 7.5 || dealerScore < playerScore) {
        alert('Player wins!');
        updateMoney(bet);
    } else {
        alert('Dealer wins!');
        updateMoney(-bet);
    }

    // Enable all buttons and reset their color after the round ends
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '';
    });
}

// Function to update the player's money
function updateMoney(amount) {
    let currentMoney = parseFloat(localStorage.getItem('initialMoney'));
    currentMoney += amount;
    localStorage.setItem('initialMoney', currentMoney);
    document.getElementById('money').textContent = currentMoney;

    // Check if the player has no money left
    if (currentMoney <= 0) {
        alert('You have lost all your money. Redirecting to the home page.');
        window.location.href = 'index.html';
    }
}

// Function to initialize the deck of cards
function initializeDeck() {
    const deck = [];
    const suits = ['♠', '♥', '♣', '♦'];
    for (let i = 1; i <= 7; i++) {
        for (let j = 0; j < 4; j++) {
            deck.push({ value: i, suit: suits[j] }); // Cards 1 to 7
        }
    }
    for (let i = 0; i < 4; i++) {
        deck.push({ value: 0.5, suit: suits[i], face: 'J' }); // Jack
        deck.push({ value: 0.5, suit: suits[i], face: 'Q' }); // Queen
        deck.push({ value: 0.5, suit: suits[i], face: 'K' }); // King
    }
    return deck;
}

// Function to shuffle the deck of cards
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// Function to draw a card from the deck
function drawCard(deck) {
    return deck.pop();
}

// Function to display a card in the specified container
function displayCard(containerId, card) {
    const container = document.getElementById(containerId);
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.innerHTML = card.face ? `${card.face} ${card.suit}` : `${card.value} ${card.suit}`;
    container.appendChild(cardElement);
}

// Function to end the game
function endGame() {
    // Enable all buttons and reset their color after the round ends
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '';
    });

    alert('Game over. Resetting the game...');
    window.location.href = 'index.html'; // Redirect to index.html
}

// Function to reset the game state after a round ends
function resetGame() {
    // Enable all buttons and reset their color after the round ends
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = '';
    });
}
