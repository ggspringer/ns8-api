import User from "../models/user";

export default class UserRepository {
  public static create = (
    email: string,
    password: string,
    phoneNumber: string,
  ) => {
    if (UserRepository.getUserIndexByEmail(email) !== -1) {
      return;
    }

    const user = new User(
      UserRepository.idCount++,
      email,
      password,
      phoneNumber,
    );

    UserRepository.users.push(user);
    return user;
  };

  public static getAllUsers = async (): Promise<User[]> => {
    return new Promise<User[]>((resolve) => resolve(UserRepository.users));
  };

  public static getUserByEmail = async (email: string): Promise<User> => {
    const userIndex = UserRepository.getUserIndexByEmail(email);
    return new Promise<User>((resolve) => {
      resolve(UserRepository.users[userIndex]);
    });
  };

  public static getUserById = async (id: number): Promise<User> => {
    const userIndex = UserRepository.getUserIndexById(id);
    return new Promise<User>((resolve) =>
      resolve(UserRepository.users[userIndex]),
    );
  };

  private static users: User[] = [];
  private static idCount: number = 0;

  private static getUserIndexById = (id: number): number => {
    return UserRepository.users.findIndex((user) => user.id === id);
  };

  private static getUserIndexByEmail = (email: string): number => {
    return UserRepository.users.findIndex((user) => user.email === email);
  };
}
