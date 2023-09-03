import { MixoMateApi } from "./MixoMateApi";

export class UserApi extends MixoMateApi {
  constructor() {
    super('users');
  }

  public async getCurrent(): Promise<unknown> {
    const response = await this.client.get('/current')
    return response.data;
  }

  public async create(username: string, password: string) {
    const response = await this.client.post('/signup', {
      username,
      password
    })

    return response.data;
  }

  public async login(username: string, password: string) {
    const response = await this.client.post('/login', {
      username,
      password
    })

    return response.data;
  }
}