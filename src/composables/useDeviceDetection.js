import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useDeviceDetection() {
  const isSmallScreen = ref(false)

  const detectDevice = () => {
    const screenWidth = window.innerWidth
    isSmallScreen.value = screenWidth < 768
  }

  onMounted(() => {
    detectDevice()
    window.addEventListener('resize', detectDevice)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', detectDevice)
  })

  return {
    isSmallScreen
  }
}