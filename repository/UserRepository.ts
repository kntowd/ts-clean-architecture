import mysql from "mysql";
import { User } from "./User"; // User class should be imported from its definition file

export interface IUserRepository {
  FindByUserName(userId: string): Promise<User | null>;
  Save(user: User): Promise<void>;
}

export class UserRepository implements IUserRepository {
  private connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: "localhost", // Update these values according to your MySQL configuration
      user: "user",
      password: "password",
      database: "database",
    });
  }

  public FindByUserName(username: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM t_user WHERE username = ?",
        [username],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          if (results.length > 0) {
            const user = new User(results[0].id, results[0].username);
            resolve(user);
          } else {
            resolve(null);
          }
        }
      );
    });
  }

  public Save(user: User): Promise<void> {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM t_user WHERE id = ?",
        [user.userId],
        (error, results) => {
          if (error) {
            reject(error);
            return;
          }
          const isExist = results.length > 0;
          const query = isExist
            ? "UPDATE t_user SET username = ? WHERE id = ?"
            : "INSERT INTO t_user VALUES (?, ?)";
          this.connection.query(
            query,
            [user.userName, user.userId],
            (error) => {
              if (error) {
                reject(error);
                return;
              }
              resolve();
            }
          );
        }
      );
    });
  }
}
