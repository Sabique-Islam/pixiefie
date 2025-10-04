export const downloadAsFormat = async (
  svgContent: string, 
  format: 'svg' | 'png' | 'jpg', 
  filename: string = 'profile-card'
): Promise<void> => {
  if (format === 'svg') {
    // Download SVG directly
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    return
  }

  // For PNG/JPG, convert SVG to canvas
  const img = new Image()
  const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)

  img.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = 384 * 2 // 2x for better quality
    canvas.height = 500 * 2
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      // Scale for higher quality
      ctx.scale(2, 2)
      ctx.drawImage(img, 0, 0)
      
      // Convert to desired format
      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg'
      canvas.toBlob((blob) => {
        if (blob) {
          const downloadUrl = URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.href = downloadUrl
          link.download = `${filename}.${format}`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(downloadUrl)
        }
      }, mimeType, format === 'jpg' ? 0.95 : 1)
    }
    
    URL.revokeObjectURL(url)
  }

  img.src = url
}

export const copySVGCode = (svgContent: string): void => {
  navigator.clipboard.writeText(svgContent)
    .then(() => {
      console.log('SVG code copied to clipboard!')
    })
    .catch((err) => {
      console.error('Failed to copy SVG code:', err)
    })
}
