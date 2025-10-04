import { Download, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DownloadButtonsProps {
  onDownloadPNG: () => void
  onDownloadJPG: () => void
  onDownloadSVG: () => void
  onCopySVG: () => void
}

export const DownloadButtons = ({ 
  onDownloadPNG, 
  onDownloadJPG, 
  onDownloadSVG, 
  onCopySVG 
}: DownloadButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-6">
      <Button
        onClick={onDownloadPNG}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        PNG
      </Button>
      <Button
        onClick={onDownloadJPG}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        JPG
      </Button>
      <Button
        onClick={onDownloadSVG}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Download className="w-4 h-4" />
        SVG
      </Button>
      <Button
        onClick={onCopySVG}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Copy className="w-4 h-4" />
        Copy SVG
      </Button>
    </div>
  )
}
