import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { FileTrieNode } from "./quartz/util/fileTrie"

const chapterEmojiMapFn = (node: FileTrieNode) => {
  // Root node: create virtual chapter folders and move chapter-* files under them.
  if (node.slug === "index") {
    const ChapterNode = node.constructor as new (segments: string[]) => FileTrieNode
    const chapterGroups = new Map<string, FileTrieNode[]>()
    const chapterTitles = new Map<string, string>()
    const nonChapterNodes: FileTrieNode[] = []

    for (const child of node.children) {
      const segment = child.slugSegment ?? ""
      const chapterMatch = /^chapter-(\d+)-/.exec(segment)

      if (!chapterMatch) {
        nonChapterNodes.push(child)
        continue
      }

      const chapterNumber = chapterMatch[1]
      const group = chapterGroups.get(chapterNumber) ?? []
      group.push(child)
      chapterGroups.set(chapterNumber, group)

      if (child.data?.title && new RegExp(`^${chapterNumber}\\.\\s`).test(child.data.title)) {
        chapterTitles.set(chapterNumber, child.data.title)
      }
    }

    const virtualChapterFolders: FileTrieNode[] = [...chapterGroups.entries()].map(
      ([chapterNumber, chapterChildren]) => {
        const chapterIndexNode = chapterChildren.find((child) =>
          Boolean(child.data?.title && new RegExp(`^${chapterNumber}\\.\\s`).test(child.data.title)),
        )
        const chapterContentNodes = chapterChildren.filter((child) => child !== chapterIndexNode)

        const folder = new ChapterNode([`chapter-${chapterNumber}`])
        folder.isFolder = true
        folder.children = chapterContentNodes.length > 0 ? chapterContentNodes : chapterChildren
        folder.data = chapterIndexNode?.data ?? null

        const folderTitle = chapterIndexNode?.data?.title ?? chapterTitles.get(chapterNumber) ?? `Chapter ${chapterNumber}`
        folder.displayName = `📁 ${folderTitle}`
        return folder
      },
    )

    node.children = [...nonChapterNodes, ...virtualChapterFolders]
    return
  }

  // Fallback for any non-regrouped top-level chapter entries.
  if (node.isFolder && /^chapter-\d+$/.test(node.slugSegment ?? "") && !node.displayName.startsWith("📁 ")) {
    node.displayName = `📁 ${node.displayName}`
  }
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({ folderClickBehavior: "link", mapFn: chapterEmojiMapFn }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({ folderClickBehavior: "link", mapFn: chapterEmojiMapFn }),
  ],
  right: [],
}
