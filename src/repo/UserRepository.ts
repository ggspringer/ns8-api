import User from "../models/user";

export default class UserRepository {
  public static create = (
    email: string,
    password: string,
    phoneNumber: string,
  ) => {
    if (UserRepository.getUserIndexByEmail(email) === -1) {
      const user = new User(
        UserRepository.idCount++,
        email,
        password,
        phoneNumber,
      );

      UserRepository.users.push(user);
      return user;
    } else {
      return null;
    }
  }

  public static update = async (
    id: number,
    email: string,
    password: string,
    phoneNumber: string,
  ) => {
    const repo = new UserRepository();
    const user = {
      ...(await repo.getUserById(id)),
      email,
      password,
      phoneNumber,
    };

    const userIndex = UserRepository.getUserIndexById(id);

    if (userIndex > -1) {
      UserRepository.users[userIndex] = user;
      return user;
    } else {
      return null;
    }
  }

  private static users: User[] = [];
  private static idCount: number = 0;

  private static getUserIndexById = (id: number): number => {
    return UserRepository.users.findIndex((user) => user.id === id);
  }

  private static getUserIndexByEmail = (email: string): number => {
    return UserRepository.users.findIndex((user) => user.email === email);
  }

  public getAllUsers = async (): Promise<User[]> => {
    return new Promise<User[]>((resolve) => resolve(UserRepository.users));
  }

  public getUserById = async (id: number): Promise<User> => {
    const userIndex = UserRepository.getUserIndexById(id);
    return new Promise<User>((resolve) =>
      resolve(UserRepository.users[userIndex]),
    );
  }
}
