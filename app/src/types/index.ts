export type Weapons = Weapon[];

export interface Weapon {
  id: string;
  name: string;
  icon: string;
  image_prefix: string;
  skins: Skin[];
}

export interface Skin {
  id: string;
  name: string;
}
