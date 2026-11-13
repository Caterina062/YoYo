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
    <RouterLink to="/" class="back-link">← Home</RouterLink>
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
/* ---------- BASE: TELEFONO ---------- */
.video-page {
  min-height: 100vh;
  padding: 24px 5%;
  background-color: #faf9f6;
  color: #181818;
  font-family: 'Nunito', sans-serif;
}
.back-link {
  display: inline-block;
  margin-bottom: 20px;
  padding: 4px 0;
  color: #060606;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.back-link:hover {
  color: #773b8a;
}

.back-link:focus-visible {
  outline: 2px solid #773b8a;
  outline-offset: 2px;
}

/* sul telefono il player occupa tutta la larghezza e ha angoli meno arrotondati */
.player {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 12px;
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
  margin-top: 20px;
}

.info h1 {
  margin: 0 0 10px;
  font-size: 26px;
}

.author {
  margin: 0 0 8px;
  color: #773b8a;
  font-weight: 700;
}

.duration {
  font-size: 14px;
  color: #928795;
}

.description {
  margin-top: 16px;
  font-size: 16px;
  line-height: 1.7;
  color: #746976;
}

.status-message,
.error-message {
  padding: 30px;
  text-align: center;
}

.error-message {
  color: #b54747;
}

/* ---------- TABLET (da 600px) ---------- */
@media (min-width: 600px) {
  .video-page {
    padding: 40px 8%;
  }

  .player {
    border-radius: 18px;
  }

  .info h1 {
    font-size: 32px;
  }
}

/* ---------- DESKTOP (da 900px) ---------- */
@media (min-width: 900px) {
  .video-page {
    padding: 50px 10%;
  }

  .player,
  .info {
    max-width: 900px;
  }

  .info h1 {
    font-size: 40px;
  }
}
</style>
