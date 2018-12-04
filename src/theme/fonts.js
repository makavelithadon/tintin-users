const fallbackFonts =
  "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol";

let fonts = {
  primary: "Bebas Bold",
  secondary: "Averia Serif Libre",
  tertiary: "Tintin Bold"
};

fonts = Object.entries(fonts).reduce((acc, [name, value]) => ({ ...acc, [name]: `${value}, ${fallbackFonts};` }), {});

export default fonts;
