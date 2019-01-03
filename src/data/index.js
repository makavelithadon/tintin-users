import tintinPicture02 from "assets/img/tintin/02/large.png";
import tintinPicture03 from "assets/img/tintin/03/large.jpg";
import tintinPicture04 from "assets/img/tintin/04/large.png";
import haddockPicture01 from "assets/img/haddock/01/large.png";
import haddockPicture03 from "assets/img/haddock/03/large.png";
import tournesolPicture01 from "assets/img/tournesol/01/large.png";
import tournesolPicture02 from "assets/img/tournesol/02/large.png";
import dupondtPicture01 from "assets/img/dupondt/01/large.png";
import dupondtPicture02 from "assets/img/dupondt/02/large.png";
import dupondtPicture03 from "assets/img/dupondt/03/large.jpg";
import milouPicture01 from "assets/img/milou/01/large.png";
import castafiorePicture01 from "assets/img/castafiore/01/large.png";
import nestorPicture01 from "assets/img/nestor/01/large.png";
import lampionPicture01 from "assets/img/lampion/01/large.png";
import faker from "faker";
import tintinText from "./tintin.md.js";
// import milouText from "./milou.md";
import haddockText from "./haddock.md.js";
/* import tournesolText from "./tournesol.md";
import dupondtText from "./dupondt.md";
import nestorText from "./nestor.md";
import castafioreText from "./castafiore.md";
import lampionText from "./lampion.md"; */

const data = {
  users: [
    {
      id: 1,
      slug: "tintin",
      displayName: "Tintin",
      pictures: [
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
      ],
      description: tintinText
    },
    {
      id: 2,
      slug: "milou",
      displayName: "Milou",
      pictures: [
        {
          src: milouPicture01,
          caption: faker.lorem.sentence()
        }
      ],
      description: tintinText
    },
    {
      id: 3,
      slug: "haddock",
      displayName: "Capitaine Haddock",
      pictures: [
        {
          src: haddockPicture01,
          caption: faker.lorem.sentence()
        },
        {
          src: haddockPicture03,
          caption: faker.lorem.sentence()
        }
      ],
      description: haddockText
    },
    {
      id: 4,
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
      ],
      description: tintinText
    },
    {
      id: 5,
      slug: "dupondt",
      displayName: "Dupont et Dupond",
      description: tintinText,
      pictures: [
        {
          src: dupondtPicture01,
          caption: faker.lorem.sentence()
        },
        {
          src: dupondtPicture02,
          caption: faker.lorem.sentence()
        },
        {
          src: dupondtPicture03,
          caption: faker.lorem.sentence()
        }
      ]
    },
    {
      id: 6,
      slug: "nestor",
      displayName: "Nestor",
      description: tintinText,
      pictures: [
        {
          src: nestorPicture01,
          caption: faker.lorem.sentence()
        }
      ]
    },
    {
      id: 7,
      slug: "castafiore",
      displayName: "Bianca Castafiore",
      description: tintinText,
      pictures: [
        {
          src: castafiorePicture01,
          caption: faker.lorem.sentence()
        }
      ]
    },
    {
      id: 8,
      slug: "lampion",
      displayName: "Séraphin Lampion",
      description: tintinText,
      pictures: [
        {
          src: lampionPicture01,
          caption: faker.lorem.sentence()
        }
      ]
    }
  ]
};

export default data;
