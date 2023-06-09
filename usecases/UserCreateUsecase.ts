import { UserCreateRequest, UserCreateResponse } from "../dto/UserCreateDto";

export interface IUserCreateUseCase {
  Handle(request: UserCreateRequest): Promise<UserCreateResponse>;
}
