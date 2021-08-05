
import * as uuid from "uuid";

export const data = [
  {
    id: "2e1fdaba-8478-4d4d-83f3-28346923e484",
    name: "David",
    dates: [
      {
        id: "982ed36c-d072-41d5-9acf-8343d492de1f",
        date: "2021-07-21",
        location: "Restaurant",
        time: "Dinner",
      },
      {
        id: "1fe0ff9a-ce08-42f1-8c35-d359fd4ed927",
        date: "2021-07-16",
        location: "Park",
        time: "Afternoon",
      },
      {
        id: "2f2dd852-633c-4106-bc49-c007a3d9b053",
        date: "2021-07-14",
        location: "Cafe",
        time: "Afternoon",
      },
    ],
  },
  {
    id: "d7aff75d-4798-4892-a5b3-06541f2b4e7d",
    name: "Tom",
    dates: [
      {
        id: "4a783446-7ce2-46ff-b399-235a83b5a022",
        date: "2021-07-18",
        location: "Bar",
        time: "Afternoon",
      },
    ],
  },
  {
    id: "ef3df0e9-1115-4094-a551-60b73a1b81ec",
    name: "Rohan",
    dates: [
      {
        id: "c0259194-be3a-4b9d-9e9d-ea9f4041bc23",
        date: "2021-07-10",
        location: "Cafe",
        time: "Lunch",
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