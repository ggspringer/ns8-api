import Event from "../models/event";

export default class EventRepository {
  public static create(userId: number, type: string, date: number) {
    const event = new Event(EventRepository.idCount++, userId, type, date);
    EventRepository.events.push(event);
    return event;
  }

  public static getAllEvents = async () => {
    return new Promise((resolve) => resolve(EventRepository.events));
  };

  public static getEventsByUserId = async (
    userId: number,
  ): Promise<Event[]> => {
    const events = EventRepository.events.filter((e) => e.userId === userId);
    return new Promise((resolve) => resolve(events));
  };

  private static idCount: number = 0;
  private static events: Event[] = [];
}
