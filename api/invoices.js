import { faker } from "@faker-js/faker";

export default async function handler(request, response) {
  function createRandomInvoice(due) {
    return {
      invoiceNumber: faker.number.int(100),
      companyName: faker.company.name(),
      issueDate: faker.date.anytime(),
      dueDate: due ? faker.date.past() : faker.date.future(),
      total: faker.number.float({ max: 100 }).toFixed(2),
      paid: faker.datatype.boolean(0.4),
    };
  }

  const invoices = Array(7)
    .fill()
    // make some invoices past due
    .map((x) => createRandomInvoice(x % 2 === 0));

  return response.json({ invoices });
}
