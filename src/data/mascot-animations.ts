
export const FPS = 30; 

export const MASCOT_ACTION_DATA = {
    // Action Name: { start, end, loop, blend, duration (seconds) }

    // LOOPING ACTIONS
    QFVow: { start: 89, end: 171, loop: true, blend: 0.2, duration: 2.73333 }, 
    IdleL: { start: 1, end: 91, loop: true, blend: 0.2, duration: 3.00 }, 
    Salsa2: { start: 450, end: 1019, loop: true, blend: 0.2, duration: 18.96667 }, 

    // ONE-SHOT ACTIONS
    Wave: { start: 169, end: 311, loop: false, blend: 0.2, duration: 4.73333 }, 
    Rocking: { start: 309, end: 452, loop: false, blend: 0.2, duration: 4.76667 }, 
    Salut: { start: 1471, end: 1557, loop: false, blend: 0.2, duration: 2.86667 },
    Twerk: { start: 1017, end: 1473, loop: false, blend: 0.2, duration: 15.20 },
};
