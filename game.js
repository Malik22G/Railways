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
        [oasis,empty,bridgeHorizontal,empty,empty],
        [empty,mountainUpLeft,empty,empty,mountainUpLeft],
        [bridgeVertical,oasis,mountainUpRight,empty,empty],
        [empty,empty,empty,oasis,empty],
        [empty,empty,empty,empty,empty]
    ]
    ,
    [
        [empty,empty,bridgeVertical,empty,empty],
        [empty,empty,empty,empty,bridgeVertical],
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
        [empty,empty,bridgeHorizontal,empty,empty],
        [empty,mountainRight,empty,empty,empty],
        [bridgeVertical,empty,empty,mountainUpRight,empty],
        [empty,empty,bridgeVertical,oasis,empty],
        [empty,mountainUpLeft,empty,empty,empty]
    ]
]

 const hardMaps = [
    [
    [empty,mountainLeft,oasis,oasis,empty,bridgeHorizontal,empty],
    [bridgeVertical,empty,empty,empty,empty,empty,empty],
    [empty,empty,bridgeVertical,empty,empty,empty,empty],
    [empty,empty,empty,mountainUpRight,empty,empty,empty],
    [mountainUpRight,empty,mountainLeft,empty,bridgeHorizontal,empty,oasis],
    [empty,empty,empty,empty,empty,empty,empty],
    [empty,empty,empty,bridgeHorizontal,empty,empty,empty]
],
[
    [empty,empty,oasis,empty,empty,empty,empty],
    [bridgeVertical,empty,bridgeHorizontal,empty,empty,mountainUpLeft,empty],
    [empty,empty,bridgeHorizontal,empty,empty,empty,bridgeVertical],
    [mountainRight,empty,empty,empty,empty,empty,empty],
    [empty,oasis,empty,mountainLeft,empty,empty,empty],
    [empty,mountainRight,empty,empty,empty,empty,empty],
    [empty,empty,oasis,empty,empty,empty,empty]
],
[
    [empty,empty,bridgeHorizontal,empty,empty,empty,empty],
    [empty,empty,empty,empty,empty,empty,bridgeVertical],
    [oasis,empty,mountainUpRight,empty,empty,empty,empty],
    [empty,empty,empty,empty,empty,empty,empty],
    [empty,oasis,mountainUpRight,empty,bridgeHorizontal,empty,empty],
    [bridgeVertical,empty,empty,empty,empty,mountainLeft,empty],
    [empty,empty,oasis,mountainUpRight,empty,empty,empty]
],
[
    [empty,empty,empty,empty,empty,empty,empty],
    [empty,empty,empty,bridgeVertical,empty,mountainUpLeft,empty],
    [empty,empty,mountainUpRight,empty,empty,empty,empty],
    [empty,bridgeHorizontal,empty,oasis,empty,bridgeHorizontal,empty],
    [empty,empty,mountainUpLeft,empty,mountainLeft,empty,empty],
    [bridgeVertical,empty,empty,empty,empty,mountainUpRight,empty],
    [empty,empty,empty,empty,empty,empty,empty]
],
[
    [empty,empty,empty,empty,empty,empty,empty],
    [empty,empty,empty,empty,empty,mountainRight,empty],
    [empty,bridgeHorizontal,bridgeHorizontal,empty,mountainLeft,empty,empty],
    [empty,empty,empty,empty,empty,empty,empty],
    [empty,empty,mountainRight,empty,oasis,empty,empty],
    [empty,mountainUpLeft,empty,bridgeVertical,empty,empty,empty],
    [empty,empty,empty,empty,empty,empty,empty]
]
]




    const playerNameInput = document.getElementById("playerName");
    const difficultyButtons = document.querySelectorAll("#difficultySelector button");
    const gameScreen = document.getElementById("gameScreen");
    const menuScreen = document.querySelector(".min-h-screen");
    const gameArea = document.getElementById("gameArea");
    const startGameButton = document.getElementById("startButton");
    const rulesButton = document.getElementById("rulesButton");
    const modal = document.getElementById("modal");
    const closeButton = document.querySelector(".close");
    
    let gameTimer;
    let difficulty;

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
        let railCount = 0;
        let oasisCount =0;
        gameArea.style.display = 'grid';
        gameArea.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        gameArea.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        gameArea.innerHTML = '';  

        const maps = difficulty == '5' ? easyMaps : hardMaps;
        let map = maps[Math.floor(Math.random() * maps.length)];

        for (let i = 0; i < size; i++) {
            for(let j = 0; j<size; j++){
                const cell = document.createElement('div');
                cell.className = 'cell';
                gameArea.appendChild(cell);
                cell.style.backgroundImage = `url('${map[i][j]}')`;
                if(map[i][j] === oasis){
                    oasisCount++;
                }
                let cycleIndex = 0;
                const railOptions = getRailOptions(map[i][j]);

                cell.addEventListener('click', e => {
                    if (railOptions.length > 0) {
                        cycleIndex = (cycleIndex + 1) % (railOptions.length + 1);
                        
                        if (cycleIndex === 0) {
                            cell.style.backgroundImage = `url('${map[i][j]}')`;
                            railCount--;
                        } else {
                            cell.style.backgroundImage = `url('${railOptions[cycleIndex - 1]}')`;
                            if(cycleIndex === 1)
                            {railCount++;}
                        }
                    }
                
                    if(railCount === size*size - oasisCount && checkWinCondition()){
                        const time = stopTimer();

                        displayWin(time,difficulty);
                    }
                });
            }
        }
    }

 
    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('modalWin').style.display = 'none';
    });
    
    document.getElementById('playAgainButton').addEventListener('click', function() {
        location.reload(); 
    });
    function displayWin(time, difficulty) {
        const playerName = document.getElementById("showName").textContent;
        const winnerDetails = document.getElementById("showNameWinner");
        const modalWinning = document.querySelector(".modalWinning");

        winnerDetails.innerHTML = `Congratulations ${playerName}! You win!<br>Time: ${time}<br>`;
        modalWinning.style.display = "block";
        updateLeaderboard(playerName, time, difficulty);
        showLeaderboard();
    }
    
    function updateLeaderboard(playerName, time, difficulty) {
        const leaderboard = JSON.parse(localStorage.getItem('leaderboardRailWays')) || [];
        leaderboard.push({ name: playerName, time: time, difficulty: difficulty });
        leaderboard.sort((a, b) => a.time - b.time);
        if (leaderboard.length > 5) {
            leaderboard.length = 5; 
        }
        localStorage.setItem('leaderboardRailWays', JSON.stringify(leaderboard));
    }
    
    function showLeaderboard() {
        const leaderboard = JSON.parse(localStorage.getItem('leaderboardRailWays')) || [];
 
        const leaderBoardList = document.getElementById("leaderBoardList");
        leaderboard.forEach((entry, index) => {
            const li = document.createElement("li");
            li.innerText = `${entry.name} ${entry.time} ${entry.difficulty == 5? 'Easy' : 'Difficult'}`
            leaderBoardList.appendChild(li);
        });

        console.log(leaderboard)
    }

    function getRailOptions(tileType) {
        switch(tileType) {
            case empty:
                return [straightRail, horizontalRail, curveRailRight, curveRailLeft, curveRailUpLeft, curveRailUpRight];
            case bridgeVertical:
                return [bridgeRailVertical];
            case bridgeHorizontal:
                return [bridgeRailHorizontal];
            case mountainLeft:
                return [mountainRailLeft];
            case mountainRight:
                return [mountainRailRight];
            case mountainUpLeft:
                return [mountainRailUpLeft];
            case mountainUpRight:
                return [mountainRailUpRight];
            default:
                return [];
        }
    }
    
    function startTimer() {
        let startTime = new Date().getTime();
        return setInterval(() => {
            let now = new Date().getTime();
            let elapsed = new Date(now - startTime);
            let minutes = elapsed.getMinutes().toString().padStart(2, '0');
            let seconds = elapsed.getSeconds().toString().padStart(2, '0');
            document.getElementById("timer").textContent = `${minutes}:${seconds}`; 
        }, 1000);
    }
    function stopTimer() {
        clearInterval(gameTimer);
        return document.getElementById("timer").textContent;  
    }


    function checkWinCondition() {
        const size = parseInt(difficulty);
        let valid = true;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const current = document.querySelector(`.cell:nth-child(${i * size + j + 1})`);
                const backgroundImage = current.style.backgroundImage;

                if (backgroundImage.includes(oasis)) {
                    continue; 
                }

                if (!checkTileConnections(i, j, backgroundImage, size)) {
                    valid = false;
                    break;
                }
            }
            if (!valid) return false;
        }

        return true;


        
    }

    function checkTileConnections(i, j, backgroundImage, size) {
  
        const connections = {
            [empty]: { n: false, s: false, e: false, w: false },
            [oasis]: { n: false, s: false, e: false, w: false },
            [bridgeVertical]: { n: false, s: false, e: false, w: false },
            [bridgeHorizontal]: { n: false, s: false, e: false, w: false },
            [mountainLeft]: { n: false, s: false, e: false, w: false },
            [mountainRight]: { n: false, s: false, e: false, w: false },
            [mountainUpLeft]: { n: false, s: false, e: false, w: false },
            [mountainUpRight]: { n: false, s: false, e: false, w: false },
        
            [straightRail]: { n: true, s: true, e: false, w: false },
            [horizontalRail]: { n: false, s: false, e: true, w: true },
            [curveRailRight]: { n: false, s: true, e: true, w: false },
            [curveRailLeft]: { n: false, s: true, e: false, w: true },
            [curveRailUpRight]: { n: true, s: false, e: true, w: false },
            [curveRailUpLeft]: { n: true, s: false, e: false, w: true },
            [bridgeRailVertical]: { n: true, s: true, e: false, w: false },
            [bridgeRailHorizontal]: { n: false, s: false, e: true, w: true },
        
            [mountainRailLeft]: { n: false, s: true, e: false, w: true },
            [mountainRailRight]: { n: false, s: true, e: true, w: false },
            [mountainRailUpLeft]: { n: true, s: false, e: false, w: true },
            [mountainRailUpRight]: { n: true, s: false, e: true, w: false },
        };
        
        function getConnections(url) {

            const entry = Object.entries(connections).find(([key, val]) => url.includes(key));
            if (entry) {
                return entry[1];
            } else {
                console.error("No connection data found for image:", url);
                return {n: false, s: false, e: false, w: false}; 
            }
        }

    
        const currentConnections = getConnections(backgroundImage);
    
        let directions = [
            { dx: -1, dy: 0, dir: 'n', opposite: 's' }, // North
            { dx: 1, dy: 0, dir: 's', opposite: 'n' },  // South
            { dx: 0, dy: 1, dir: 'e', opposite: 'w' },  // East
            { dx: 0, dy: -1, dir: 'w', opposite: 'e' }  // West
        ];
    
        let validConnectionCount = 0;

        directions.forEach(({dx, dy, dir, opposite}) => {
            let neighborI = i + dx;
            let neighborJ = j + dy;
    
            if (neighborI >= 0 && neighborI < size && neighborJ >= 0 && neighborJ < size) {
                const neighborCell = document.querySelector(`.cell:nth-child(${neighborI * size + neighborJ + 1})`);
                if (!neighborCell) return; 
                const neighborImage = neighborCell.style.backgroundImage;
    
                const neighborConnections = getConnections(neighborImage);
    
                if (currentConnections[dir] && neighborConnections[opposite]) {
                    validConnectionCount++;
                }
            }
        });
    
        return validConnectionCount >= 2;
    }
    


