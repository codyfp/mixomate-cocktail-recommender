import { MixoMateApi } from "./MixoMateApi";
import { Ingredient } from "./IngredientApi";

export type User = {
  id: string,
  username: string,
  likes?: Ingredient[],
  dislikes?: Ingredient[],
  flavourProfile?: string[],
  allergens?: string[]
}
export class UserApi extends MixoMateApi {
  constructor() {
    super('users');
  }

  public async getCurrent(): Promise<User | null> {
    try {
      const response = await this.get('/current');
      return response;
    } catch (error: unknown) {
      console.error(error);
      return null;
    }
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
    const response = await this.get('/logout')
    return response.data;
  }

  public async getAccountPreferences() {
    const response = await this.get('/preferences')
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

export type UserApiType = {
  login: (username: string, password: string) => Promise<User | null>,
  logout: () => Promise<User | null>,
  create: (username: string, password: string) => Promise<User | null>,
  getCurrent: () => Promise<User | null>,
  getAccountPreferences: () => Promise<User | null>,
  setLikesAndDislikes: (likes: string[], dislikes: string[]) => Promise<User | null>,
  setFlavourProfile: (flavourProfile: string[]) => Promise<User | null>,
  setAllergens: (allergens: string[]) => Promise<User | null>,
}
