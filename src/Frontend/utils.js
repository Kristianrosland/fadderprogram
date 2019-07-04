export const weekdays = [ 
    { id: 0, NO: 'mandag', EN: 'monday' },
    { id: 1, NO: 'tirsdag', EN: 'tuesday' },
    { id: 2, NO: 'onsdag', EN: 'wednesday' },
    { id: 3, NO: 'torsdag', EN: 'thursday' },
    { id: 4, NO: 'fredag', EN: 'friday' },
    { id: 5, NO: 'lørdag', EN: 'saturday' }
];

export const translateDayIdx = day => {
    for (const { id, NO, EN } of weekdays) {
        if (day === NO || day === EN) 
            return id;
    }
    
    console.error(`Error: Could not translate day ${day} to index`);
    return -1;
}

export const eventTimeComparator = (a, b) => {
    if (!a.start_time && !b.start_time) return 0;
    if (!a.start_time) return -1;
    if (!b.start_time) return 1;

    if (a.start_time === b.start_time) {
        if (a.end_time && !b.end_time) return -1;
        else if (!a.end_time && b.end_time) return 1;
        else if (!a.end_time && !b.end_time) return 0;
        else return a.end_time > b.end_time ? 1 : (a.end_time < b.end_time ? -1 : 0);
    } else {
        return a.start_time > b.start_time ? 1 : -1;
    }
}