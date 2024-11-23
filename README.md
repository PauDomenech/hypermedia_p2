The css and html design we have used has been replicated in the example. That is, we have created two pages (2 .html) where the first is based on an input page the necessary data to be able to play the game. It has two data entries, the first is the name of the player, and the second the money with which he wants to play the game.

Once you enter the data, click the start game option and send it to the second page. Within it there is the option, to start a new round, or to finish the game. When you start a new round, you ask for the money you want to play with, and then once you insert the amount you start the round. Once the round starts, you can decide whether to take more cards, or stand up and see if the Dealer scores less points than the player.

Points range from 1 to 7, and JKQ cards contain 0.5. You win when you make 7.5 points or more points than the Dealer without getting past the 7.5 points, which you then lose directly.

As for the script.js we have DOMContentLoader eventListener, for when the page is correctly loaded create the variables where we will get the name of the player and the money of the own.

Then we have 12 functions called:
startGame: Main function to start the game. Save the playerName and initialMoney variables to the local storage and send the player to the second page.

newRound: Get the player's money from the local storage, see if they are not less than 0 and ask for the money the player wants to bet on.

startGames: Create a card deck, mix them and show the new card and call playerTurn.

playerTurn: See if the score is greater than 7.5 to call the endGame function and subtract the money, and then if it is not fulfilled, ask if you want to take another card, until the player says no, win or lose.

dealerTurn: Get cards until the player is over, until he loses.

determineWinner: Compares the player's score with respect to the Dealer, and if he wins sums the money, if he does not subtract it.

updateMoney: Add or subtract the money played, and if 0 or less, the player loses and forwards to the player on the first page.

initializeDeck: Create deck

shuffleDeck: Randomly mix deck

drawCard: Show the first deck card.

displayCard: Show the letter in the format we want.

endGame: Finish the game, and send you to the first page.
