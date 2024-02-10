import { ticketDaoMongoose } from "../dao/models/db/TicketMongoose.js";

class TicketsServices {
  async crearTicket(total, emailUser) {
    const newTicket = await ticketDaoMongoose.create({
      amount: total,
      purchaser: emailUser,
    });
    return newTicket;
  }
}
export const ticketService = new TicketsServices();
