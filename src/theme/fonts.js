const fallbackFonts = "sans-serif";

let fonts = {
  primary: "Bebas Bold",
  secondary: "Lato",
  tertiary: "Averia Serif Libre"
};

fonts = Object.entries(fonts).reduce((acc, [name, value]) => ({ ...acc, [name]: `${value}, ${fallbackFonts};` }), {});

export default fonts;
