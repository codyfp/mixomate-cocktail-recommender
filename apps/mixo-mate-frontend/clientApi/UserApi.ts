import { MixoMateApi } from "./MixoMateApi";
import { Ingredient } from "./IngredientApi";

export type User = {
  id: string,
  username: string,
  likes?: Ingredient[],
  dislikes?: Ingredient[],
  flavourProfile?: string[],
  allergens?: Ingredient[]
}

export class UserApi extends MixoMateApi {
  constructor() {
    super('users');
  }

  public async getCurrent(): Promise<User> {
    return await this.get('/current');
  }

  public async create(username: string, password: string) {
    const response = await this.post('/', { username, password })
    return response.data;
  }

  public async login(username: string, password: string) {
    const response = await this.post('/login', { username, password })
    return response.data;
  }

  public async logout() {
    const response = await this.post('/logout', {})
    return response.data;
  }

  public async setLikesAndDislikes(likes: string[], dislikes: string[]) {
    const response = await this.post('/likes', { likes, dislikes })
    return response.data;
  }

  public async setFlavourProfile(flavourProfile: string[]) {
    const response = await this.post('/flavourPreferences', { flavourProfile })
    return response.data;
  }

  public async setAllergens(allergens: string[]) {
    const response = await this.post('/allergens', { allergens })
    return response.data;
  }
}
