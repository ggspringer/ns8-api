export default class Event {
  constructor(
    public id: number,
    public userId: number,
    public type: string,
    public date: Date,
  ) {}
}
