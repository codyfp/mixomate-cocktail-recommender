export type User = {
  id: string,
  username: string,
  likes?: string[],
  dislikes?: string[],
  flavourProfile?: string[],
  allergens?: {name: string, id: string}[]
}

export type CreateUser = {
  username: string,
  password: string
}
