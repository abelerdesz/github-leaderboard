import RepositoryFixture from "./fixtures/Repository";

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> &
  Partial<Pick<Type, Key>>;

type InferredRepositoryType = typeof RepositoryFixture["items"][0];

export type Repository = MakeOptional<
  InferredRepositoryType,
  // These properties are listed as optional in the official GitHub documentation
  "owner" | "description" | "homepage" | "language" | "mirror_url" | "license"
>;

export type RepositoriesResponse = {
  items: Repository[];
};
