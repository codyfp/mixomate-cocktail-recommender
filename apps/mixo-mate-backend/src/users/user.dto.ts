export type User = {
  id: string,
  username: string,
  likes?: string[],
  dislikes?: string[],
  flavourProfile?: string[],
  allergens?: string[]
}

export type CreateUser = {
  username: string,
  password: string
}
