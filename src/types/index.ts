export type Weapons = Weapon[];

export interface Weapon {
  name: string;
  id: string;
  skins: Skin[];
}

export interface Skin {
  name: string;
  id: string;
}
