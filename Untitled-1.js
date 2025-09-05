//tiles
const empty = 'pics/tiles/empty.png';
const oasis = 'pics/tiles/oasis.png';
const bridgeVertical = 'pics/tiles/bridge_vertical.png';
const bridgeHorizontal = 'pics/tiles/bridge_horizontal.png';
const mountainLeft = 'pics/tiles/mountain_left.png';
const mountainRight = 'pics/tiles/mountain_right.png';
const mountainUpLeft = 'pics/tiles/mountain_up_left.png';
const mountainUpRight= 'pics/tiles/mountain_up_right.png';


//Rails
const straightRail = 'pics/tiles/straight_rail.png';
const horizontalRail = 'pics/tiles/horizontal_rail.png';
const curveRailRight = 'pics/tiles/curve_rail_right.png';
const curveRailLeft = 'pics/tiles/curve_rail_left.png';
const curveRailUpRight = 'pics/tiles/curve_rail_up_right.png';
const curveRailUpLeft = 'pics/tiles/curve_rail_up_left.png';

const bridgeRailVertical = 'pics/tiles/bridge_rail_vertical.png';
const bridgeRailHorizontal = 'pics/tiles/bridge_rail_horizontal.png';

const mountainRailLeft = 'pics/tiles/mountain_rail_left.png';
const mountainRailRight = 'pics/tiles/mountain_rail_right.png';
const mountainRailUpLeft = 'pics/tiles/mountain_rail_up_left.png';
const mountainRailUpRight= 'pics/tiles/mountain_rail_up_right.png';


 const easyMaps = [
    [        
        [empty,mountainLeft,empty,empty,oasis],
        [empty,empty,empty,bridgeVertical,oasis],
        [bridgeVertical,empty,mountainUpLeft,empty,empty],
        [empty,empty,empty,oasis,empty],
        [empty,empty,mountainUpRight,empty,empty]
    ]
    ,
    [
        [oasis,empty,bridgeVertical,empty,empty],
        [empty,mountainUpLeft,empty,empty,mountainUpLeft],
        [bridgeVertical,oasis,mountainUpRight,empty,empty],
        [empty,empty,empty,oasis,empty],
        [empty,empty,empty,empty,empty]
    ]
    ,
    [
        [empty,empty,bridgeVertical,empty,empty],
        [empty,empty,empty,empty,bridgeHorizontal],
        [empty,mountainUpLeft,bridgeVertical,empty,empty],
        [empty,oasis,empty,empty,empty],
        [empty,bridgeHorizontal,empty,empty,mountainUpLeft]
    ]
    ,
    [
        [empty,empty,empty,bridgeHorizontal,empty],
        [empty,empty,empty,empty,empty],
        [bridgeVertical,empty,mountainLeft,empty,mountainLeft],
        [empty,empty,empty,empty,empty],
        [empty,empty,oasis,mountainUpRight,empty]
    ]
    ,
    [
        [empty,empty,bridgeVertical,empty,empty],
        [empty,mountainRight,empty,empty,empty],
        [bridgeVertical,empty,empty,mountainUpRight,empty],
        [empty,empty,bridgeVertical,oasis,empty],
        [empty,mountainUpLeft,empty,empty,empty]
    ]
]

 const hardMaps = [
    [],
    [],
    [],
    [],
    []
]



document.addEventListener("DOMContentLoaded", () => {
    const playerNameInput = document.getElementById("playerName");
    const difficultyButtons = document.querySelectorAll("#difficultySelector button");
    const gameScreen = document.getElementById("gameScreen");
    const menuScreen = document.querySelector(".min-h-screen");
    const gameArea = document.getElementById("gameArea");
    const startGameButton = document.getElementById("startButton");
    const rulesButton = document.getElementById("rulesButton");
    const modal = document.getElementById("modal");
    const closeButton = document.querySelector(".close");
    const palette = document.getElementById("palette");
    const contextMenu = document.getElementById("contextMenu");


    let gameTimer;
    let difficulty;
    let currentTileType = straightRail; // Default tile type


    function setupPalette() {
        const tiles = [straightRail, verticalRail, curveRailRight, curveRailLeft, curveRailUpRight, curveRailUpLeft];
        tiles.forEach(tile => {
            let tileElement = document.createElement('img');
            tileElement.src = tile;
            tileElement.classList.add('palette-item');
            tileElement.draggable = true;
            tileElement.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.src);
            });
            palette.appendChild(tileElement);
        });
    }

    gameArea.addEventListener('dragover', (e) => {
        e.preventDefault(); // Allow drop
    });

    gameArea.addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        if (e.target.classList.contains('cell')) {
            e.target.style.backgroundImage = `url(${data})`;
        }
    });

    
    gameArea.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('cell')) {
            currentTileType = e.target.style.backgroundImage.slice(4, -1).replace(/"/g, ""); // Get current tile type
            e.target.style.backgroundImage = `url(${currentTileType})`; // Start drawing
            gameArea.addEventListener('mousemove', drawRail);
        }
    });

    gameArea.addEventListener('mouseup', () => {
        gameArea.removeEventListener('mousemove', drawRail); // Stop drawing
    });

    function drawRail(e) {
        if (e.target.classList.contains('cell')) {
            e.target.style.backgroundImage = `url(${currentTileType})`;
        }
    }

    function showContextMenu(x, y) {
        contextMenu.style.top = `${y}px`;
        contextMenu.style.left = `${x}px`;
        contextMenu.classList.remove('hidden');
    }
    gameArea.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('cell')) {
            showContextMenu(e.clientX, e.clientY);
        }
    });

    document.addEventListener('click', (e) => {
        if (!contextMenu.contains(e.target)) {
            contextMenu.classList.add('hidden'); // Hide context menu
        }
    });

    gameArea.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('cell')) {
            showContextMenu(e.clientX, e.clientY);
        }
    });

    rulesButton.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    difficultyButtons.forEach(button => {
        button.addEventListener("click", () => {
            difficulty = button.dataset.difficulty;
            difficultyButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });

    startGameButton.addEventListener("click", () => {
        const playerName = playerNameInput.value;
        if (!playerName || !difficulty) {
            alert('Please enter your name first and choose a difficulty!');
            return;
        }
        document.getElementById("showName").textContent = playerName; 
        menuScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");
        setupGameArea(difficulty);
        gameTimer = startTimer();
        
    });

    function setupGameArea(difficulty) {
        const size = parseInt(difficulty);
        gameArea.style.display = 'grid';
        gameArea.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        gameArea.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        gameArea.innerHTML = ''; // Clear previous cells if any
    
        const maps = difficulty == '5' ? easyMaps : hardMaps;
        let map = maps[Math.floor(Math.random() * maps.length)];

        for (let i = 0; i < size; i++) {
            for(let j = 0; j<size; j++){
                const cell = document.createElement('div');
                cell.className = 'cell';
                gameArea.appendChild(cell);
                cell.style.backgroundImage = `url('${map[i][j]}')`
                cell.addEventListener('click' ,e =>{
                    console.log("clicked");
                })
        }
    }
    setupPalette();
    }
    
    function startTimer() {
        let startTime = new Date().getTime();
        return setInterval(() => {
            let now = new Date().getTime();
            let elapsed = new Date(now - startTime);
            let minutes = elapsed.getMinutes().toString().padStart(2, '0');
            let seconds = elapsed.getSeconds().toString().padStart(2, '0');
            document.getElementById("timer").textContent = `${minutes}:${seconds}`; // Assumes there's an element with id="timer"
        }, 1000);
    }


});


document.addEventListener('contextmenu', function (e) {
    if (e.target.classList.contains('cell')) {
        e.preventDefault();  // Stop the default context menu
        showContextMenu(e.pageX, e.pageY, e.target);
    }
}, false);
