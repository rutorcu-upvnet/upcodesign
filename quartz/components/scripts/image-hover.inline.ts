/**
 * Image Hover Popup for Quartz
 * Shows a fullscreen preview of images when hovering over them
 */

let imagePreview: HTMLDivElement | null = null
let currentImg: HTMLImageElement | null = null

function createImagePreview() {
    if (imagePreview) return imagePreview

    imagePreview = document.createElement("div")
    imagePreview.className = "image-hover-preview"
    imagePreview.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    cursor: zoom-out;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  `

    const img = document.createElement("img")
    img.style.cssText = `
    max-width: 95vw;
    max-height: 95vh;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
  `

    imagePreview.appendChild(img)
    document.body.appendChild(imagePreview)

    imagePreview.addEventListener("click", hidePreview)
    window.addCleanup(() => {
        imagePreview?.removeEventListener("click", hidePreview)
    })

    return imagePreview
}

function showPreview(img: HTMLImageElement) {
    if (!imagePreview) createImagePreview()
    if (!imagePreview) return

    currentImg = img

    const previewImg = imagePreview.querySelector("img") as HTMLImageElement
    if (!previewImg) return

    previewImg.src = img.src
    previewImg.alt = img.alt || ""

    imagePreview.style.display = "flex"
    imagePreview.style.pointerEvents = "auto"

    // Trigger reflow for animation
    void imagePreview.offsetWidth
    imagePreview.style.opacity = "1"
}

function hidePreview() {
    if (!imagePreview) return

    imagePreview.style.opacity = "0"
    imagePreview.style.pointerEvents = "none"

    setTimeout(() => {
        if (imagePreview) {
            imagePreview.style.display = "none"
        }
    }, 200)

    currentImg = null
}

function initImageHover() {
    // Find all images in the content (excluding those we want to skip)
    const contentImages = document.querySelectorAll<HTMLImageElement>(
        "article img, .step img, .popover-hint img"
    )

    contentImages.forEach((img) => {
        // Skip if already initialized
        if (img.dataset.hoverInitialized) return
        img.dataset.hoverInitialized = "true"

        // Add cursor pointer
        img.style.cursor = "zoom-in"

        const clickHandler = (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            showPreview(img)
        }

        img.addEventListener("click", clickHandler)

        window.addCleanup(() => {
            img.removeEventListener("click", clickHandler)
        })
    })
}

// Initialize on page load
document.addEventListener("nav", () => {
    // Small delay to ensure images are loaded
    setTimeout(initImageHover, 100)
})

// Also initialize immediately if page is already loaded
if (document.readyState !== "loading") {
    setTimeout(initImageHover, 100)
}

// Add keyboard support - ESC to close
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && imagePreview?.style.opacity === "1") {
        hidePreview()
    }
})
