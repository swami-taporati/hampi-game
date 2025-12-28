const sceneText = document.getElementById('scene-description');
const choiceContainer = document.getElementById('choices');
const inventoryDisplay = document.getElementById('inventory');

let inventory = [];

const story = {
    start: {
        text: "Welcome to Vijayanagara, the City of Victory. Use the Map above to explore. You need a Royal Token or Gold to enter the Palace.",
        choices: []
    },
    temple_entry: {
        text: "You are at the Virupaksha Temple. A priest blocks the inner sanctum. 'Tell me, traveler: Which hill is famous for its 7th-century rock-cut shrines nearby?'",
        choices: [
            { text: "Matanga Hill", nextScene: 'puzzle_fail' },
            { text: "Hemakuta Hill", nextScene: 'temple_success' }
        ]
    },
    temple_success: {
        text: "Correct. The priest hands you a blessed 'Temple Token'. You may now use this to enter the Royal Enclosure.",
        onEnter: () => addItem("Temple Token"),
        choices: []
    },
    bazaar: {
        text: "The Hampi Bazaar stretches for a kilometer. You see the 'Monolithic Bull' statue. A merchant offers to trade a map for work, but you are looking for the Royal Gate.",
        choices: [{ text: "Look around", nextScene: 'start' }]
    },
    river_crossing: {
        text: "The Tungabhadra River flows rapidly. To cross, you must identify this animal carved everywhere in Hampi that symbolizes power.",
        choices: [
            { text: "The Elephant", nextScene: 'river_success' },
            { text: "The Tiger", nextScene: 'puzzle_fail' }
        ]
    },
    river_success: {
        text: "The boatman nods. 'The Gajashala (Elephant Stables) is proof of our strength.' He gives you 'Ancient Gold' found in the silt.",
        onEnter: () => addItem("Ancient Gold"),
        choices: []
    },
    royal_gate: {
        text: "You stand before the King's Gate. 'Show your credentials!'",
        choices: [
            { text: "Show Temple Token", nextScene: 'win', condition: () => inventory.includes("Temple Token") },
            { text: "Offer Ancient Gold", nextScene: 'win', condition: () => inventory.includes("Ancient Gold") },
            { text: "I have nothing", nextScene: 'start' }
        ]
    },
    puzzle_fail: {
        text: "Incorrect! The locals look at you with confusion. Try exploring another area.",
        choices: []
    },
    win: {
        text: "The gates swing open! You have gained entry to the heart of the Empire. The Mahanavami festival begins! YOU WIN.",
        choices: [{ text: "Restart Adventure", nextScene: 'start' }]
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

    if (scene.choices.length > 0) {
        scene.choices.forEach(choice => {
            if (choice.condition && !choice.condition()) return;
            const btn = document.createElement('button');
            btn.innerText = choice.text;
            btn.className = 'choice-btn';
            btn.onclick = () => renderScene(choice.nextScene);
            choiceContainer.appendChild(btn);
        });
    } else {
        const backBtn = document.createElement('button');
        backBtn.innerText = "Continue Exploring...";
        backBtn.className = 'choice-btn';
        backBtn.onclick = () => renderScene('start');
        choiceContainer.appendChild(backBtn);
    }
}

renderScene('start');
