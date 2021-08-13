

export interface Person {
  id: string;
  name: string;
  context?: string;
  context_other?: string;
  dates: Date[];
}

export interface Date {
  id: string;
  date: string;
  time: string;
  location?: string;
  location_other?: string;
  reflection?: any;
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

export async function addPerson(person: Partial<Person>) {
    const res = await fetch("/api/addPerson", {
      method: 'post',
      headers: { 'content-type': 'application/json'},
      body: JSON.stringify(person),
    }).then(res => res.json());
    // TODO(gracew): better handle error case
    return res[0].id;
}

export async function addDate(person_id: string, date: Partial<Date>) {
    const res = await fetch("/api/addDate", {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ person_id, ...date }),
    }).then(res => res.json());
    // TODO(gracew): better handle error case
    return res[0].id;
}

export async function updateDate(id: string, metadata: Partial<Date>) {
    await fetch("/api/updateDate", {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id, ...metadata }),
    });
}