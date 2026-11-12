import { ref } from 'vue'
import axios from 'axios'

const API_URL =
  'https://raw.githubusercontent.com/Anita-Liberatore/yoyo-friends-api/master/videos.json'

export function useVideos() {
  const videos = ref([])
  const loading = ref(false)
  const error = ref('')

  const getVideos = async () => {
    loading.value = true
    error.value = ''
    try {
      const response = await axios.get(API_URL)
      videos.value = response.data
    } catch (err) {
      console.error('Errore nel recupero dei video: ', err)
      error.value = 'Non è stato possibile caricare i video. Riprova più tardi.'
    } finally {
      loading.value = false
    }
  }

  return {
    videos,
    loading,
    error,
    getVideos,
  }
}

export function useVideo(id) {
  const video = ref(null)
  const loading = ref(false)
  const error = ref('')

  const getVideo = async () => {
    loading.value = true
    error.value = ''
    try {
      const response = await axios.get(API_URL)
      video.value = response.data.find((v) => String(v.id) === String(id))
      if (!video.value) error.value = 'Video non trovato.'
    } catch (err) {
      console.error('Errore nel recupero del video: ', err)
      error.value = 'Non è stato possibile caricare il video. Riprova più tardi.'
    } finally {
      loading.value = false
    }
  }

  return { video, loading, error, getVideo }
}
