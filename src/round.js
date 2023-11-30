const { evaluateGuess } = require('../src/turns')
const { countCards } = require('../src/deck')

const createRound = (deck) => {
    const round = {
        deck,
        currentCard: deck[0],
        turns: 0,
        incorrectGuesses: [],
    }
    return round
}

const takeTurn = (guess, round) => {
    const numCards = countCards(round.deck);
    const resultofGuess = evaluateGuess(guess, round.currentCard.correctAnswer)

    if (resultofGuess === "Incorrect!") {
        round.incorrectGuesses.push(round.currentCard.id)
    }

    round.turns += 1
    round.currentCard = round.deck[round.turns]

    // if (round.turns === numCards) {
    //     const percentageCorrect = calculatePercentageCorrect(round)
    //     console.log(resultofGuess);
    //     console.log(endRound(percentageCorrect))

    // }
    return resultofGuess
}

const calculatePercentageCorrect = (round) => {
    const percentageCorrect = (round.deck.length - round.incorrectGuesses.length) / (round.deck.length) * 100
    return Number(percentageCorrect.toFixed(2))
}

function endRound(round) {
    
    console.log(`** Round over! ** You answered ${calculatePercentageCorrect(round)}% of the questions correctly!`);
    return `** Round over! ** You answered ${calculatePercentageCorrect(round)}% of the questions correctly!`;
}

module.exports = {
    createRound,
    takeTurn,
    calculatePercentageCorrect,
    endRound
}