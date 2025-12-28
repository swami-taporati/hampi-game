const sceneText = document.getElementById('scene-description');
const choiceContainer = document.getElementById('choices');
const inventoryDisplay = document.getElementById('inventory');

let inventory = [];

const story = {
    start: {
        text: "The sun rises over the Matanga Hill. You stand at the entrance of the Hampi Bazaar. The air smells of jasmine and sandalwood. A merchant eyes your empty hands.",
        choices: [
            { text: "Ask the merchant for work", nextScene: 'merchant_work' },
            { text: "Head towards the Virupaksha Temple", nextScene: 'temple_entry' }
        ]
    },
    merchant_work: {
        text: "The merchant hands you a 'Bag of Spices'. 'Deliver this to the Royal Mint near the Lotus Mahal,' he says. 'You shall be rewarded.'",
        onEnter: () => { addItem("Spices"); },
        choices: [
            { text: "Walk toward the Royal Center", nextScene: 'royal_gate' }
        ]
    },
    temple_entry: {
        text: "The massive Gopuram of Virupaksha towers over you. A monk stops you. 'To enter, you must show respect to the sacred elephant, Lakshmi.'",
        choices: [
            { text: "Offer a coin (if you had one)", nextScene: 'start' },
            { text: "Go back to the Bazaar", nextScene: 'start' }
        ]
    },
    royal_gate: {
        text: "You reach the grand gates. A guard blocks your path. 'Only those with official business or a Royal Seal may pass.'",
        choices: [
            { text: "Show the Spices", nextScene: 'win', condition: () => inventory.includes("Spices") },
            { text: "Try to sneak in", nextScene: 'caught' }
        ]
    },
    caught: {
        text: "The guards are too sharp! You are escorted back to the river banks. Your day in the capital is over.",
        choices: [{ text: "Restart Day", nextScene: 'start' }]
    },
    win: {
        text: "The guard sees the Spices and nods. 'Pass, citizen.' You enter the Royal Enclosure just as the sunset ceremony begins. The glory of Vijayanagara unfolds before you! YOU WIN.",
        choices: [{ text: "Play Again", nextScene: 'start' }]
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

// Start the game
renderScene('start');
