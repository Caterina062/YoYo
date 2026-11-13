<script setup>
import { useRoute } from 'vue-router'
import { onMounted, computed } from 'vue'
import { useVideo } from '@/composables/useVideos'
import CommentSection from '@/components/CommentSection.vue'

const route = useRoute()
const { video, loading, error, getVideo } = useVideo(route.params.id)

const embedUrl = computed(() => {
  if (!video.value) return ''
  if (video.value.videoId) {
    return `https://www.youtube.com/embed/${video.value.videoId}`
  }
  return video.value.url || ''
})

onMounted(getVideo)
</script>

<template>
  <main class="video-page">
    <RouterLink to="/" class="back-link">← Torna alla Home</RouterLink>
    <p v-if="loading" class="status-message">Stiamo caricando il video...</p>
    <p v-else-if="error" class="error-message">{{ error }}</p>

    <article v-else-if="video" class="video-detail">
      <div class="player">
        <iframe
          v-if="embedUrl"
          :src="embedUrl"
          :title="video.title"
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
          "
          allowfullscreen
        ></iframe>
        <img v-else :src="video.thumbnail" :alt="video.title" />
      </div>

      <div class="info">
        <h1>{{ video.title }}</h1>
        <p class="author">Di {{ video.author }}</p>
        <span class="duration">Durata: {{ video.duration }}</span>
        <p class="description">{{ video.description }}</p>
        <CommentSection :key="video.id" :video-id="video.id" />
      </div>
    </article>
  </main>
</template>

<style scoped>
.video-page {
  min-height: 100vh;
  padding: 50px 10%;
  background-color: #faf9f6;
  color: #354b3c;
  font-family: 'Nunito', sans-serif;
}

.back-link {
  display: inline-block;
  margin-bottom: 30px;
  color: #a16e57;
  font-weight: 700;
  text-decoration: none;
}

.back-link:hover {
  color: #c98269;
}

.player {
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 18px;
  background: #000;
  box-shadow: 0 10px 30px rgba(53, 75, 60, 0.15);
}

.player iframe,
.player img {
  width: 100%;
  height: 100%;
  border: none;
  object-fit: cover;
}
.info {
  max-width: 900px;
  margin-top: 25px;
}

.info h1 {
  margin: 0 0 10px;
  font-size: clamp(28px, 4vw, 40px);
}

.author {
  color: #c98269;
  font-weight: 700;
  margin: 0 0 8px;
}

.duration {
  font-size: 14px;
  color: #879587;
}
.description {
  margin-top: 20px;
  font-size: 16px;
  line-height: 1.8;
  color: #69766a;
}

.status-message,
.error-message {
  text-align: center;
  padding: 30px;
}

.error-message {
  color: #b54747;
}

@media (max-width: 600px) {
  .video-page {
    padding: 30px 6%;
  }
}
</style>
