import { nanoid } from "nanoid";
import { faker } from "@faker-js/faker";
export default defineEventHandler(async (event) => {
  const { seeds } = useAppConfig();
  const db = useDatabase();
  const userIds: string[] = [];

  // Seed users
  const userPromises = new Array(seeds.users).fill(0).map((v, i) => {
    const id = nanoid();
    userIds.push(id);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const avatar = `https://i.pravatar.cc/150?u=${id}`;

    return db.sql`INSERT INTO users VALUES (${id}, ${firstName}, ${lastName}, ${email}, ${avatar})`;
  });

  await Promise.all(userPromises);

  // Seed posts
  const postPromises = new Array(seeds.posts).fill(0).map((v, i) => {
    const title = `My Blog Post #${i + 1}`;
    const id = title.toLowerCase().replace(/ /g, "-").replace("#", "");
    const image = `https://picsum.photos/seed/${id}/1920/1080`;
    const p1 = faker.lorem.paragraphs(1);
    const content = `
      <p>${p1}</p>
      <p>${faker.lorem.paragraphs(1)}</p>
      <p>${faker.lorem.paragraphs(1)}</p>
      <h2>Heading 2</h2>
      <p>${faker.lorem.paragraphs(1)}</p>
      <img src="https://picsum.photos/seed/${id}-inner/1920/1080">
      <p>${faker.lorem.paragraphs(1)}</p>
      <ol>
        <li>${faker.lorem.sentence()}</li>
        <li>${faker.lorem.sentence()}</li>
        <li>${faker.lorem.sentence()}</li>
      </ol>
      <p>${faker.lorem.paragraphs(1)}</p>
      <p>${faker.lorem.paragraphs(1)}</p>
      <p>${faker.lorem.paragraphs(1)}</p>
      <p>${faker.lorem.paragraphs(1)}</p>
      <p>${faker.lorem.paragraphs(1)}</p>
<pre><code>const a = 1;
const b = 2;
const c = a + b;</code></pre>
      <p>${faker.lorem.paragraphs(1)}</p>
      <p>${faker.lorem.paragraphs(1)}</p>
      <p>${faker.lorem.paragraphs(1)}</p>
      <p>${faker.lorem.paragraphs(1)}</p>
      <h2>Heading 2</h2>
      <ul>
        <li>${faker.lorem.sentence()}</li>
        <li>${faker.lorem.sentence()}</li>
        <li>${faker.lorem.sentence()}</li>
      </ul>

      <p>${faker.lorem.paragraphs(1)}</p>
      <p>${faker.lorem.paragraphs(1)}</p>
      <p>${faker.lorem.paragraphs(1)}</p>
    `;
    const excerpt = p1.slice(0, 100) + "...";
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];

    const publishedAt = faker.date.past({ years: 1 }).getTime().toString();

    return db.sql`INSERT INTO posts VALUES (${id}, ${image}, ${title}, ${publishedAt}, ${content}, ${excerpt}, ${randomUserId})`;
  });

  await Promise.all(postPromises);

  // Query for users
  // const { rows } = await db.sql`SELECT * FROM users WHERE id = ${userId}`;

  // return {
  //   rows,
  // };
  return "Database seeded!";
});
