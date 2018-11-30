import tintinPicture from "assets/img/tintin/01/large.png";
import haddockPicture from "assets/img/haddock/01/large.jpg";

export default {
  users: [
    {
      id: 1,
      slug: "tintin",
      displayName: "Tintin",
      picture: {
        src: tintinPicture,
        width: "100%"
      }
    },
    {
      id: 2,
      slug: "haddock",
      displayName: "Capitaine Haddock",
      picture: {
        src: haddockPicture,
        width: "60%"
      }
    },
    {
      id: 3,
      slug: "tournesol",
      displayName: "Professeur Tournesol"
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
