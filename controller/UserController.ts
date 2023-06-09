import express from "express";
import { IUserCreateUseCase } from "../usecases/UserCreateUsecase";
import { UserCreateRequest } from "../dto/UserCreateDto";

class UserController {
  private useCase: IUserCreateUseCase;

  constructor(useCase: IUserCreateUseCase) {
    this.useCase = useCase;
  }

  public async Create(
    req: express.Request,
    res: express.Response
  ): Promise<void> {
    const requestBody = req.body as UserCreateRequest;

    const request = new UserCreateRequest(requestBody.userName);
    const response = await this.useCase.Handle(request);

    res.send(response);
  }
}
