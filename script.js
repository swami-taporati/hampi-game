const sceneText = document.getElementById('scene-description');
const choiceContainer = document.getElementById('choices');
const inventoryDisplay = document.getElementById('inventory');

let inventory = [];

const story = {
    start: {
        text: "You stand at the Hemakuta Hill entrance. To reach the King, you must prove you are not a spy by identifying the landmarks of the capital.",
        choices: [
            { text: "Begin the Knowledge Trial", nextScene: 'id_puzzle_1' },
            { text: "Head to the River", nextScene: 'river_crossing' }
        ]
    },

    // --- IDENTIFICATION PUZZLE ---
    id_puzzle_1: {
        text: "A guard points to a structure in the distance. 'That building has a tiered, pyramid-like roof and looks like a blooming flower. What is its name?'",
        choices: [
            { text: "The Queen's Bath", nextScene: 'puzzle_fail' },
            { text: "The Lotus Mahal", nextScene: 'id_puzzle_2' },
            { text: "The Elephant Stables", nextScene: 'puzzle_fail' }
        ]
    },
    id_puzzle_2: {
        text: "Correct. Now, look at the great chariot. 'It is made of stone, yet it looks ready to roll. Who is the deity housed in the temple behind it?'",
        choices: [
            { text: "Lord Virupaksha", nextScene: 'puzzle_fail' },
            { text: "Lord Vitthala", nextScene: 'id_puzzle_win' },
            { text: "Ganesha", nextScene: 'puzzle_fail' }
        ]
    },
    id_puzzle_win: {
        text: "The guard is impressed. 'You know our city well.' He hands you a 'Carved Token'.",
        onEnter: () => { addItem("Carved Token"); },
        choices: [
            { text: "Proceed to the Royal Enclosure", nextScene: 'royal_gate' }
        ]
    },

    // --- INTERACTIVE RIDDLE ---
    river_crossing: {
        text: "The Tungabhadra river is high. A boatman in a round coracle (basket boat) says: 'I only ferry those who can answer my riddle: I have pillars that sing, but no voice; I have a chariot of stone, but no horses. Where am I?'",
        choices: [
            { text: "Say 'The Vittala Temple'", nextScene: 'river_success' },
            { text: "Say 'The Hampi Bazaar'", nextScene: 'puzzle_fail' }
        ]
    },
    river_success: {
        text: "The boatman smiles and paddles you across. You find a 'Bag of Gold' dropped by a traveler in the boat!",
        onEnter: () => { addItem("Bag of Gold"); },
        choices: [
            { text: "Head to the Royal Enclosure", nextScene: 'royal_gate' }
        ]
    },

    // --- FINAL GATE ---
    royal_gate: {
        text: "You reach the King's court. To enter the Mahanavami Dibba festival, you must offer something of value.",
        choices: [
            { text: "Offer the Carved Token", nextScene: 'win_scholar', condition: () => inventory.includes("Carved Token") },
            { text: "Offer the Bag of Gold", nextScene: 'win_merchant', condition: () => inventory.includes("Bag of Gold") },
            { text: "I have nothing", nextScene: 'caught' }
        ]
    },

    puzzle_fail: {
        text: "The locals look at you with suspicion. 'You are clearly a stranger.' You are asked to leave the city gates.",
        choices: [{ text: "Try again", nextScene: 'start' }]
    },
    win_scholar: {
        text: "The King welcomes you as a Scholar of the Empire. You are given a seat of honor at the festival! YOU WIN (Scholar Ending).",
        choices: [{ text: "Play Again", nextScene: 'start' }]
    },
    win_merchant: {
        text: "The King accepts your tribute. You are allowed to trade in the inner city. YOU WIN (Merchant Ending).",
        choices: [{ text: "Play Again", nextScene: 'start' }]
    },
    caught: {
        text: "The guards turn you away. 'No entry for those without a gift or knowledge.'",
        choices: [{ text: "Restart", nextScene: 'start' }]
    }
};

function addItem(item) {
    if (!inventory.includes(item)) {
        inventory.push(item);
        inventoryDisplay.innerText = inventory.join(", ");
    }
}

function renderScene(sceneKey) {
    const scene = story[sceneKey];
    if (scene.onEnter) scene.onEnter();

    sceneText.innerText = scene.text;
    choiceContainer.innerHTML = '';

    scene.choices.forEach(choice => {
        if (choice.condition && !choice.condition()) return;
        
        const btn = document.createElement('button');
        btn.innerText = choice.text;
        btn.className = 'choice-btn';
        btn.onclick = () => renderScene(choice.nextScene);
        choiceContainer.appendChild(btn);
    });
}

renderScene('start');
