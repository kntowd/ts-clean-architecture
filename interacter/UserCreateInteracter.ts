import { IUserRepository } from "../repository/UserRepository"; // Assuming that IUserRepository is defined in a file named 'IUserRepository.ts'
import { User } from "../repository/User"; // Assuming that User class is defined in a file named 'User.ts'
import { UserCreateRequest, UserCreateResponse } from "../dto/UserCreateDto"; // Assuming that UserCreateRequest class is defined in a file named 'UserCreateRequest.ts'
import { IUserCreateUseCase } from "../usecases/UserCreateUsecase";

export class UserCreateInteractor implements IUserCreateUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async Handle(request: UserCreateRequest): Promise<UserCreateResponse> {
    const username = request.userName;
    const duplicateUser = await this.userRepository.FindByUserName(username);
    if (duplicateUser !== null) {
      throw new Error("duplicated");
    }
    // userIdは一旦ハードコード
    const user = new User("userId", username);
    await this.userRepository.Save(user);
    return new UserCreateResponse(user.userId);
  }
}
