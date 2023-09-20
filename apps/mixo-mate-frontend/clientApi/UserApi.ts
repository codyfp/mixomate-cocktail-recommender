import { MixoMateApi } from "./MixoMateApi";

export class UserApi extends MixoMateApi {
  constructor() {
    super('users');
  }

  public async getCurrent(): Promise<unknown> {
    const response = await this.get('/current')
    return response.data;
  }

  public async create(username: string, password: string) {
    const response = await this.post('/', {
      username,
      password
    })

    return response.data;
  }

  public async login(username: string, password: string) {
    const response = await this.post('/login', {
      username,
      password
    })

    return response.data;
  }

  public async getAccountPreferences() {
    const response = await this.get('/preferences')

    return response.data;
  }

  public async setLikesAndDislikes(likes: string[], dislikes: string[]) {
    const response = await this.post('/likes', {
      likes,
      dislikes
    })

    return response.data;
  }

  public async setFlavourProfile(flavourProfile: string[]) {
    const response = await this.post('/flavourPreferences', {
      flavourProfile
    })

    return response.data;
  }
}
