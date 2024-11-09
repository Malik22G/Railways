const empty = '/pics/tiles/empty.png';
const oasis = '/pics/tiles/oasis.png';
const bridgeVertical = '/pics/tiles/bridge_vertical.png';
const bridgeHorizontal = '/pics/tiles/bridge_horizontal.png';
const mountainLeft = '/pics/tiles/mountain_left.png';
const mountainRight = '/pics/tiles/mountain_right.png';
const mountainUpLeft = '/pics/tiles/mountain_up_left.png';
const mountainUpRight= '/pics/tiles/mountain_up_right.png';



export const easyMaps = [
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

export const hardMaps = [
    [],
    [],
    [],
    [],
    []
]

