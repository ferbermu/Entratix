interface StartTicketCheckoutSelection {
  ticketId: string;
  quantity: number;
}

export interface StartTicketCheckoutInput {
  eventId: string;
  selections: StartTicketCheckoutSelection[];
}


