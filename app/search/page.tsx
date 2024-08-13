import prisma from "@/prisma/client";
import { Book } from "@prisma/client";

export default async function SearchPage() {
  const table = "Book";
  const word = "YUELA";
  const xxx = await prisma.book.findFirst({ where: { fussion: "" } });

  const books: Book[] = await prisma.$queryRawUnsafe(
    `SELECT * FROM (
        SELECT id, title, description, lower("title" || ' ' || "description") AS title_description
        FROM "public"."${table}"
    ) AS subquery
    WHERE title_description ILIKE lower('%${word}%');`
  );

  return (
    <div>
      <div>SearchPage</div>
      <div className="space-y-4">
        {books.map((_) => (
          <div key={_.id}>
            <div className="bold">{_.title}</div>
            <div>{_.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
