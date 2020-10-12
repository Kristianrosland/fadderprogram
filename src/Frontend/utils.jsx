export const weekdays = [
  { id: 0, NO: "mandag", EN: "monday" },
  { id: 1, NO: "tirsdag", EN: "tuesday" },
  { id: 2, NO: "onsdag", EN: "wednesday" },
  { id: 3, NO: "torsdag", EN: "thursday" },
  { id: 4, NO: "fredag", EN: "friday" },
  { id: 5, NO: "lørdag", EN: "saturday" },
];

export const translateDayIdx = (day) => {
  for (const { id, NO, EN } of weekdays) {
    if (day === NO || day === EN) return id;
  }

  console.error(`Error: Could not translate day ${day} to index`);
  return -1;
};

export const translateDay = (day) => {
  switch (day) {
    case "mandag":
      return "monday";
    case "tirsdag":
      return "tuesday";
    case "onsdag":
      return "wednesday";
    case "torsdag":
      return "thursday";
    case "fredag":
      return "friday";
    case "lørdag":
      return "saturday";
    default:
      return day;
  }
};

export const eventTimeComparator = (a, b) => {
  if (!a.start_time && !b.start_time) return 0;
  if (!a.start_time) return -1;
  if (!b.start_time) return 1;

  if (a.start_time === b.start_time) {
    if (a.end_time && !b.end_time) return -1;
    else if (!a.end_time && b.end_time) return 1;
    else if (!a.end_time && !b.end_time) return 0;
    else return a.end_time > b.end_time ? 1 : a.end_time < b.end_time ? -1 : 0;
  } else {
    return a.start_time > b.start_time ? 1 : -1;
  }
};

export const groupComparator = (a, b) => {
  if (a === b) return 0;
  if (a === "all") return -1;
  if (b === "all") return 1;
  return parseInt(a) - parseInt(b);
};

export const dayToday = () => {
  const today = new Date();
  if (today.getDate() <= 10 && today.getMonth() === 7) {
    return 0;
  }

  const day = today.getDay() - 1;
  return day === -1 ? 6 : day;
};

export const selectField = (event, field, lang) => {
  const language = lang ? lang : "NO";
  const key = `${field}_${language}`;

  if (!event[key]) return "";
  else if (field === "from")
    return `${language === "NO" ? "Fra" : "From"} ${event[key]}`;
  else return event[key];
};

export const selectTime = ({ start_time, end_time }) => {
  if (!start_time) return "";
  if (!end_time) return start_time;

  return `${start_time} – ${end_time}`;
};

export const selectGroups = ({ groups }, lang) => {
  const language = lang ? lang : "NO";
  if (groups.indexOf("all") >= 0)
    return language === "NO" ? "Alle grupper" : "All groups";

  const prefix = language === "NO" ? "Gruppe " : "Group ";
  return `${prefix} ${groups.join(", ")}`;
};

const calculateEndTime = (startTime, minUsed) => {
  const arr = startTime.split(":");
  let hours = Math.floor(parseInt(minUsed) / 60);

  let min = parseInt(arr[1]) + parseInt(minUsed);
  if (!(min < 60)) {
      min -= 60;
  }
  if (min < 10){
      min = "0" + min
  }
  
  const final_hours = parseInt(arr[0]) + hours;
  const final = final_hours + ":" + min;

  return final;
  
}

export const mapTimeOnPosts = (event, sortedPosts) => {
  let start_time = event.start_time;
  const post_time = event.post_time;
  
  return sortedPosts.map(post => {
      const end_time = calculateEndTime(start_time, post_time);
      const updatedPost = { ...post, start_time: start_time, end_time: end_time }
      start_time = end_time;
      return updatedPost
  })
}
