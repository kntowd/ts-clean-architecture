// ユーザ作成リクエスト
export class UserCreateRequest {
  public readonly userName: string;

  constructor(userName: string) {
    this.userName = userName;
  }
}

// ユーザ作成レスポンス
export class UserCreateResponse {
  public readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
