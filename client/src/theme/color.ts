import { palette } from "./palette";

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The screen background.
   */
  blueBackground: palette.light,
  darkBackground: palette.dark,
  /**
   * The main tinting color.
   */
  primary: palette.lpBlue,
  /**
   * The main tinting color, but darker.
   */
  primaryDarker: palette.orangeDarker,
  /**
   * A subtle color used for borders and lines.
   */
  line: palette.offWhite,
  /**
   * The default color of text in many components.
   */
  text: palette.black,
  /**
   * Secondary information.
   */
  dim: palette.lightGrey,
  /**
   * Error messages and icons.
   */
  error: palette.angry,

  white: palette.white,
  success: palette.successGreen,
  working: palette.dodgerBlue,
  inactive: "#B4C3CA",
  spanColor: "#686868",

  $colorDanger: "#CD4246",
  $colorWarning: "#faad14",
  $colorSuccess: "#238552",
  $colorLpBlue: "#1802D0",
  $colorLpYellow: "#F1C946",
  $colorGray: "#788896",
};
