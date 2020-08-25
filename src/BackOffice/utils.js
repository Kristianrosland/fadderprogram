import { eventTimeComparator } from "../Frontend/utils";

export const weekdays_NO = [
  "mandag",
  "tirsdag",
  "onsdag",
  "torsdag",
  "fredag",
  "lørdag",
];

/**
 *  Litt vel magisk funksjon som grupperer events per dag
 *  Etter å ha kalt den kan du hente ut events slik:
 *   const grouped = groupEventsByDay(events);
 *   const mondayEvents = grouped["mandag"]  --> liste med events på mandag
 * **/
export const groupEventsByDay = (events) => {
  const grouped = {};
  weekdays_NO.forEach((day) => (grouped[day] = []));
  events.forEach((e) => grouped[e.day_NO].push(e));
  Object.keys(grouped).forEach((key) => grouped[key].sort(eventTimeComparator));

  return grouped;
};

/** Gir en dictionary med adresseforslag basert på adresser som allerede finnes */
export const createAddressSuggestions = (events) => {
  const suggestions = {};
  events.forEach((e) => {
    if (e.title_NO && e.address && e.google_maps) {
      suggestions[e.title_NO.toLowerCase()] = e.address;
    }
  });

  return suggestions;
};

/** Tar en liste med events og en liste med subEvents, og setter inn subevents i riktig event */
export const addSubEventsToEvents = (events, subEvents) => {
  if (events.length === 0) {
    return events;
  }

  return events.map((e) => ({
    ...e,
    subEvents: subEvents.filter((s) => s.parent_event_id === e.id),
  }));
};
