import { eventTimeComparator } from "../Frontend/utils";

export const eventFilter = (group, e) => {
    if (e.groups.indexOf('all') >= 0 || group === 'all') return true;

    for (const g1 of group) {
        for (const g2 of e.groups) {
            if (g1 === g2) return true;
        }
    }
}

export const weekdays_NO = ['mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag', 'søndag'];

export const groupEventsByDay = events => {
    const grouped = {}
    weekdays_NO.forEach(day => grouped[day] = [])
    events.forEach(e => grouped[e.day_NO].push(e));
    Object.keys(grouped).forEach(key => grouped[key].sort(eventTimeComparator));

    return grouped;
}
