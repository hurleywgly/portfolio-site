import {
  FileText,
  Home,
  Rocket,
  Shield,
  UserRound,
  type LucideIcon,
} from "lucide-react"

/**
 * Nav glyph vocabulary, matched to the Figma home frame's icon choices:
 * home = house, projects = rocket, tools = shield/crest, writing = document,
 * about = head-bust. 16px line icons, tuned to the exhibit's mono nav.
 */
export const navIcons: Record<string, LucideIcon> = {
  home: Home,
  projects: Rocket,
  tools: Shield,
  writing: FileText,
  about: UserRound,
}
