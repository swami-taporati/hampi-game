const sceneText = document.getElementById('scene-description');
const choiceContainer = document.getElementById('choices');
const inventoryDisplay = document.getElementById('inventory');

let inventory = [];

const story = {
    start: {
        text: "The sun rises over Matanga Hill. To your left is the bustling Bazaar; to your right, the path leads to the sacred Vittala Temple.",
        choices: [
            { text: "Go to Hampi Bazaar", nextScene: 'bazaar' },
            { text: "Go to Vittala Temple", nextScene: 'vittala_complex' }
        ]
    },
    bazaar: {
        text: "The Bazaar is filled with merchants from Portugal and Persia. A spice trader offers you work.",
        choices: [
            { text: "Accept delivery task", nextScene: 'merchant_work' },
            { text: "Return to Main Path", nextScene: 'start' }
        ]
    },
    vittala_complex: {
        text: "You stand before the magnificent Stone Chariot. A master architect is tapping the pillars of the Maha Mantapa. He looks frustrated. 'The harmony is off,' he mutters.",
        choices: [
            { text: "Offer to help with the pillars", nextScene: 'pillar_puzzle' },
            { text: "Back to Main Path", nextScene: 'start' }
        ]
    },
    pillar_puzzle: {
        text: "The architect says: 'The Sa-Re-Ga-Ma pillars must be struck in the correct order to resonate with the gods.'",
        choices: [
            { text: "Strike: Sa - Ga - Re - Ma", nextScene: 'puzzle_fail' },
            { text: "Strike: Sa - Re - Ga - Ma", nextScene: 'puzzle_success' }
        ]
    },
    puzzle_success: {
        text: "A pure, melodic tone rings out through the temple. The architect beams! 'You have the ear of a musician!' He gives you a Royal Temple Pass.",
        onEnter: () => { addItem("Temple Pass"); },
        choices: [
            { text: "Head to the Royal Enclosure", nextScene: 'royal_gate' }
        ]
    },
    puzzle_fail: {
        text: "The pillars emit a dull, clashing thud. The architect sighs. 'No, that is not the rhythm of the empire.'",
        choices: [
            { text: "Try again", nextScene: 'pillar_puzzle' }
        ]
    },
    merchant_work: {
        text: "You now carry a 'Bag of Spices'. This is heavy, but it might get you past the guards.",
        onEnter: () => { addItem("Spices"); },
        choices: [
            { text: "Head to the Royal Enclosure", nextScene: 'royal_gate' }
        ]
    },
    royal_gate: {
        text: "The Royal Gate is guarded by soldiers in silk tunics. 'Identify yourself,' they demand.",
        choices: [
            { text: "Show Temple Pass", nextScene: 'win_temple', condition: () => inventory.includes("Temple Pass") },
            { text: "Show Spices", nextScene: 'win_merchant', condition: () => inventory.includes("Spices") },
            { text: "I have nothing to show", nextScene: 'caught' }
        ]
    },
    win_temple: {
        text: "The guards bow. 'A friend of the Architect is a friend of the King.' You are invited to sit on the Mahanavami Dibba platform to watch the sunset. YOU WIN (High Honor).",
        choices: [{ text: "Play Again", nextScene: 'start' }]
    },
    win_merchant: {
        text: "The guard takes the spices. 'The kitchens were waiting for these. Get inside.' You enter the city as a humble worker. YOU WIN (Commoner).",
        choices: [{ text: "Play Again", nextScene: 'start' }]
    },
    caught: {
        text: "Without credentials, the guards turn you away. The sun sets on your journey. Try again tomorrow!",
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

// Start the game
renderScene('start');
