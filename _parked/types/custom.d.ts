declare module 'lucide-react' {
  import { FC, SVGProps } from 'react'
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number | string
    absoluteStrokeWidth?: boolean
  }
  export const ArrowUpRight: FC<IconProps>
  export const ArrowLeft: FC<IconProps>
  export const Mail: FC<IconProps>
  export const Twitter: FC<IconProps>
  export const Linkedin: FC<IconProps>
  export const Briefcase: FC<IconProps>
  export const PenTool: FC<IconProps>
  export const Settings: FC<IconProps>
  export const Wrench: FC<IconProps>
  // Add other icons as needed
} 