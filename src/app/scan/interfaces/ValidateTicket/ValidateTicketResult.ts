export interface ValidateTicketInfo {
  ticketCode: string;
  status: string;
  usedAt: string | null;
  eventTitle: string;
  eventDate: string;
  ticketType: string;
  ownerName: string;
  ownerEmail: string;
}

export interface ValidateTicketResult {
  success: boolean;
  message: string;
  ticket?: ValidateTicketInfo;
}


