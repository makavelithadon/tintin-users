import tintinPicture01 from "assets/img/tintin/01/large.png";
import tintinPicture02 from "assets/img/tintin/02/large.png";
import tintinPicture03 from "assets/img/tintin/03/large.jpg";
import tintinPicture04 from "assets/img/tintin/04/large.png";
import haddockPicture01 from "assets/img/haddock/01/large.png";
import haddockPicture02 from "assets/img/haddock/02/large.png";
import haddockPicture03 from "assets/img/haddock/03/large.png";
import tournesolPicture01 from "assets/img/tournesol/01/large.png";
import tournesolPicture02 from "assets/img/tournesol/02/large.png";

import faker from "faker";

const data = {
  users: [
    {
      id: 1,
      slug: "tintin",
      displayName: "Tintin",
      pictures: [
        {
          src: tintinPicture01,
          caption: "Tintin, reporter autour du monde."
        },
        {
          src: tintinPicture02,
          caption: "Tintin est toujours accompagné de son fidèle compagnon, Milou."
        },
        {
          src: tintinPicture03,
          caption: "Tintin au Tibet, une aventure haletante."
        },
        {
          src: tintinPicture04,
          caption: "Rien ne fait peur à notre cher Tintin, pas même une petite escapade sur la Lune !"
        }
      ]
    },
    {
      id: 2,
      slug: "haddock",
      displayName: "Capitaine Haddock",
      pictures: [
        {
          src: haddockPicture01,
          caption: faker.lorem.sentence()
        },
        {
          src: haddockPicture02,
          caption: faker.lorem.sentence()
        },
        {
          src: haddockPicture03,
          caption: faker.lorem.sentence()
        }
      ]
    },
    {
      id: 3,
      slug: "tournesol",
      displayName: "Professeur Tournesol",
      pictures: [
        {
          src: tournesolPicture01,
          caption: faker.lorem.sentence()
        },
        {
          src: tournesolPicture02,
          caption: faker.lorem.sentence()
        }
      ]
    },
    {
      id: 4,
      slug: "dupondt",
      displayName: "Dupont et Dupond"
    },
    {
      id: 5,
      slug: "nestor",
      displayName: "Nestor"
    },
    {
      id: 6,
      slug: "castafiore",
      displayName: "Bianca Castafiore"
    }
  ]
};

export default data;
