<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
})

const router = useRouter()

const openVideo = () => {
  router.push(`/video/${props.video.id}`)
}
</script>

<template>
  <button class="video-card" @click="openVideo">
    <div class="thumbnail-container">
      <img :src="video.thumbnail" :alt="video.title" class="video-thumbnail" />
      <span class="duration">{{ video.duration }}</span>
      <span class="play-button">▶</span>
    </div>

    <div class="video-info">
      <h3>{{ video.title }}</h3>
      <p class="video-description">Di {{ video.author }}</p>
      <p class="video-description">{{ video.description }}</p>
    </div>
  </button>
</template>
<style scoped>
.video-card {
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  text-align: left;
  background-color: #faf9f6;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(53, 75, 60, 0.08);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.video-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 25px rgba(53, 75, 60, 0.15);
}

.thumbnail-container {
  position: relative;
  height: 210px;
  overflow: hidden;
}

.video-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.duration {
  position: absolute;
  right: 12px;
  bottom: 12px;
  padding: 5px 9px;
  color: white;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  font-size: 12px;
}

.play-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #354b3c;
  font-size: 18px;
}

.video-info {
  padding: 18px;
}

.video-info h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #354b3c;
}

.video-description {
  color: #788477;
  font-size: 13px;
  line-height: 1.6;
}

@media (max-width: 900px) {
  .thumbnail-container {
    height: 230px;
  }
}
</style>
