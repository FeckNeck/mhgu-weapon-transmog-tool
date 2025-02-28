interface Weapon {
  id: string;
  name: string;
  icon: string;
  kiranico_prefix: string;
  image_prefix: string;
  skins: Skin[];
}

interface Skin {
  id: string;
  name: string;
}

type Weapons = Weapon[];

export type { Weapon, Skin, Weapons };
