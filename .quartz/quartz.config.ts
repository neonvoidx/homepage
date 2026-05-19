import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "$neonvoid",
    pageTitleSuffix: " @ void",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "neonvoid.dev",
    ignorePatterns: ["private", "templates", "template", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        title: "Lexend Deca",
        header: "Lexend Deca",
        body: "Lexend Deca",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#ebfafa",
          lightgray: "#d4e7e7",
          gray: "#7081d0",
          darkgray: "#323449",
          dark: "#212337",
          secondary: "#04d1f9",
          tertiary: "#37f499",
          highlight: "rgba(55, 244, 153, 0.15)",
          textHighlight: "#f1fc7988",
        },
        darkMode: {
          light: "#212337",
          lightgray: "#323449",
          gray: "#7081d0",
          darkgray: "#ebfafa",
          dark: "#ebfafa",
          secondary: "#04d1f9",
          tertiary: "#37f499",
          highlight: "rgba(164, 140, 242, 0.15)",
          textHighlight: "#f1fc7988",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "dracula",
          dark: "dracula",
        },
        keepBackground: true,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.HardLineBreaks(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest", prettyLinks: true }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
        rssFullHtml: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      // Plugin.CustomOgImages(),
    ],
  },
}

export default config
