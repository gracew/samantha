

export interface Person {
  id: string;
  name: string;
  context?: string;
  context_other?: string;
  dates: Date[];
}

export interface Date {
  id: string;
  person_id: string;
  date: string;
  time: string;
  location?: string;
  location_other?: string;
  reflection?: any;
}

export interface Checkin {
  created_at: string;
  emotion: string;
  id: string;
  notes: string;
  user_id: string;
}

export async function getPersons() {
  const res = await fetch("/api/getPersons");
  return res.json();
}

export async function getPerson(id: string) {
  const res = await fetch("/api/getPerson", {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

export async function getDate(id: string) {
  const res = await fetch("/api/getDate", {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

export async function getCheckin(id: string) {
  const res = await fetch("/api/getCheckin", {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return res.json();
}

export async function getCheckins() {
  const res = await fetch("/api/getCheckins");
  return res.json();
}

export async function addPerson(person: Partial<Person>) {
    await fetch("/api/addPerson", {
      method: 'post',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(person),
    });
}

export async function addDate(date: Partial<Date>) {
    await fetch("/api/addDate", {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(date),
    });
}

export async function updateDate(id: string, metadata: Partial<Date>) {
    await fetch("/api/updateDate", {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id, ...metadata }),
    });
}