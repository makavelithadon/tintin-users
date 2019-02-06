import Waypoint from "./Waypoint";
import Paragraph from "./Paragraph";
import H2 from "./H2";
import ResponsiveImg from "./ResponsiveImg";

const renderers = {
  /* link: props => props.children,
  paragraph: ParagraphRenderer,
  heading: HeadingRenderer,
  img: props => {
    console.log("props", props);
    return props.children;
  } */
  Waypoint: { component: Waypoint },
  p: { component: Paragraph },
  h2: { component: H2 },
  ResponsiveImg: {
    component: ResponsiveImg
  }
};

export default renderers;
