import { toPng, toJpeg, toSvg } from 'html-to-image'

export const downloadAsPNG = async (
  element: HTMLElement,
  filename: string = 'profile-card'
): Promise<void> => {
  try {
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 2,
      cacheBust: true,
      skipFonts: false
    })
    
    const link = document.createElement('a')
    link.download = `${filename}.png`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Failed to download PNG:', error)
    throw error
  }
}

export const downloadAsJPG = async (
  element: HTMLElement,
  filename: string = 'profile-card'
): Promise<void> => {
  try {
    const dataUrl = await toJpeg(element, {
      quality: 0.95,
      pixelRatio: 2,
      cacheBust: true,
      skipFonts: false
    })
    
    const link = document.createElement('a')
    link.download = `${filename}.jpg`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Failed to download JPG:', error)
    throw error
  }
}

export const downloadAsSVG = async (
  element: HTMLElement,
  filename: string = 'profile-card'
): Promise<void> => {
  try {
    const dataUrl = await toSvg(element, {
      cacheBust: true,
      skipFonts: false
    })
    
    const link = document.createElement('a')
    link.download = `${filename}.svg`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Failed to download SVG:', error)
    throw error
  }
}

export const copySVGCode = async (element: HTMLElement): Promise<void> => {
  try {
    const dataUrl = await toSvg(element, {
      cacheBust: true,
      skipFonts: false
    })
    
    // Convert data URL to SVG string
    const svgString = decodeURIComponent(dataUrl.split(',')[1])
    
    await navigator.clipboard.writeText(svgString)
    console.log('SVG code copied to clipboard!')
  } catch (error) {
    console.error('Failed to copy SVG code:', error)
    throw error
  }
}
