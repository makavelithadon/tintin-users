import { Keyframes } from "react-spring";

const withKeyframes = type => animation => Keyframes[type](animation);

export default withKeyframes;
