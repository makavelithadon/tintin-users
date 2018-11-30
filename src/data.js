import tintinPicture01 from "assets/img/tintin/01/large.png";
import tintinPicture02 from "assets/img/tintin/02/large.png";
import tintinPicture03 from "assets/img/tintin/03/large.jpg";
import tintinPicture04 from "assets/img/tintin/04/large.png";
import haddockPicture01 from "assets/img/haddock/01/large.png";
import haddockPicture02 from "assets/img/haddock/02/large.png";
import haddockPicture03 from "assets/img/haddock/03/large.png";
import tournesolPicture01 from "assets/img/tournesol/01/large.png";

const data = {
  users: [
    {
      id: 1,
      slug: "tintin",
      displayName: "Tintin",
      pictures: [
        {
          src: tintinPicture01
        },
        {
          src: tintinPicture02
        },
        {
          src: tintinPicture03
        },
        {
          src: tintinPicture04
        }
      ]
    },
    {
      id: 2,
      slug: "haddock",
      displayName: "Capitaine Haddock",
      pictures: [
        {
          src: haddockPicture01
        },
        {
          src: haddockPicture02
        },
        {
          src: haddockPicture03
        }
      ]
    },
    {
      id: 3,
      slug: "tournesol",
      displayName: "Professeur Tournesol",
      pictures: [
        {
          src: tournesolPicture01
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
