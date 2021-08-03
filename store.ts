
import * as uuid from "uuid";

export const data = [
  {
    id: uuid.v4(),
    name: "David",
    dates: [
      {
        id: uuid.v4(),
        date: "2021-07-21",
        location: "Restaurant",
        timeOfDay: "Dinner",
      },
      {
        id: uuid.v4(),
        date: "2021-07-16",
        location: "Park",
        timeOfDay: "Afternoon",
      },
      {
        id: uuid.v4(),
        date: "2021-07-14",
        location: "Cafe",
        timeOfDay: "Afternoon",
      },
    ],
  },
  {
    id: uuid.v4(),
    name: "Tom",
    dates: [
      {
        id: uuid.v4(),
        date: "2021-07-18",
        location: "Bar",
        timeOfDay: "Afternoon",
      },
    ],
  },
  {
    id: uuid.v4(),
    name: "Rohan",
    dates: [
      {
        id: uuid.v4(),
        date: "2021-07-10",
        location: "Cafe",
        timeOfDay: "Lunch",
      },
    ],
  },
];

export function getPerson(id: string) {
  return data.find(p => p.id === id);
}

export function addPerson(person: { name: string, context: string }) {
  const id = uuid.v4();
  data.push({
    id,
    name: person.name,
    dates: [],
  });
  console.log(data);
  return id;
}

export function addDate(personId: string, metadata: any) {
  const id = uuid.v4();
  const person = data.find(p => p.id === personId);
  person?.dates.push({ ...metadata, id });
  return id;
}

export function updateDate(personId: string, dateId: string, metadata: any) {
  const person = data.find(p => p.id === personId);
  if (!person) {
    return;
  }
  person.dates = person.dates.map(d => {
    if (d.id === dateId) {
      return { ...d, ...metadata };
    }
    return d;
  });
}