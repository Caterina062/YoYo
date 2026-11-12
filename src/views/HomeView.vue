<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const API_URL =
  'https://raw.githubusercontent.com/Anita-Liberatore/yoyo-friends-api/master/videos.json'
const videos = ref([])
const loading = ref(false)
const error = ref('') //idu
const router = useRouter()
const getVideos = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await axios.get(API_URL)
    videos.value = response.data
    console.log('Video recuperati: ', videos.value)
  } catch (err) {
    console.error('Errore nel recupero dei video: ', err)
    error.value = 'Non è stato possibile caricare i video. Riprova più tardi.'
  } finally {
    loading.value = false
  }
}

const openVideo = (id) => {
  //idu
  router.push(`/video/${id}`)
}

onMounted(() => {
  getVideos()
})
</script>

<template>
  <main class="main">
    <section id="home" class="hero">
      <div class="hero-content">
        <span class="subtitle"> IL BENESSERE E' PER TUTTI </span>
        <h1>yoga, <span>insieme.</span></h1>
        <p>
          Ogni corpo ha il suo modo di muoversi. Scopri, condividi e lasciati ispirare dalle
          esperienze della nostra community
        </p>
        <div class="hero-note">Una community senza barriere</div>
      </div>

      <!--<div class="hero-image">
        <img
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1000"
          alt="Donna che pratica yoga su un tappetino"
        />
      </div>-->
    </section>

    <section id="video" class="video-section">
      <div class="section-heading">
        <div>
          <span class="subtitle">YOYO COMMUNITY</span>
          <h2>Le pratiche della community</h2>
          <p>Guarda i video, scopri nuove pratiche e condividi la tua passione per lo yoga</p>
        </div>
      </div>

      <!--SEZIONE VIDEO-->
      <div class="video-grid">
        <p v-if="loading" class="status-message">Stiamo caricando i video...</p>
        <p v-else-if="error" class="error-message">{{ error }}</p>
        <p v-else-if="videos.length === 0" class="status-message">
          Nessun video disponibile al momento
        </p>

        <button
          v-else
          v-for="video in videos"
          :key="video.id"
          class="video-card"
          @click="openVideo(video.id)"
        >
          <div class="thumbnail-container">
            <img :src="video.thumbnail" :alt="video.title" class="video-thumbnail" />
            <span class="duration">
              {{ video.duration }}
            </span>
            <span class="play-button">▶</span>
          </div>
          <div class="video-info">
            <h3>{{ video.title }}</h3>
            <p class="video-description">Di {{ video.author }}</p>
            <p class="video-description">{{ video.description }}</p>
          </div>
        </button>
      </div>
    </section>

    <footer class="footer">
      <a href="#" class="logo">YoYo<span>.</span></a>
      <p>Il benessere è un percorso da condividere</p>
      <span>@ 2026 YoYo - Friends</span>
    </footer>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
.home-page {
  width: 100%;
  min-height: 100vh;
  background-color: #faf9f6;
  color: #354b3c;
  font-family: 'Nunito', sans-serif;
}

.hero {
  position: relative;
  justify-content: flex;
  width: 100%;
  min-height: 80vh;
  background-image: url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 70px;
  padding: 80px 10%;
  width: 100%;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(1, 1, 1, 0.85) 0%,
    rgba(0, 0, 0, 0.55) 40%,
    rgba(0, 0, 0, 0.15) 80%
  );
}
.hero-content {
  position: relative;
  flex: 1;
  max-width: 540px;
}

.hero-image {
  flex: 1;
  max-width: 650px;
}

.subtitle {
  display: inline-block;
  color: #a16e57;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  margin-bottom: 18px;
}

.hero h1 {
  font-size: clamp(48px, 6vw, 76px);
  line-height: 1.1;
  margin: 0 0 25px;
  color: #354b3c;
}

.hero h1 span {
  color: #c98269;
}

.hero-content p {
  font-size: 18px;
  line-height: 1.8;
  color: #69766a;
  margin-bottom: 30px;
}

.primary-button {
  display: inline-flex;
  align-items: center;
  gap: 15px;
  padding: 15px 27px;
  background-color: #354b3c;
  color: white;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 700;
  transition: 0.3s;
}

.primary-button:hover {
  background-color: #536d59;
  transform: translateY(-3px);
}

.primary-button span {
  font-size: 20px;
}

.hero-note {
  margin-top: 25px;
  color: #879587;
  font-size: 14px;
}

.hero-image {
  flex: 1;
  max-width: 550px;
}

.hero-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 45% 45% 15px 15px;
  box-shadow: 0 15px 40px rgba(53, 75, 60, 0.12);
}

/* VIDEO SECTION */
.video-section {
  width: 100%;
  padding: 80px 10%;
  padding: 70px 8%;
  background-color: #f0f1e9;
}

.section-heading {
  margin-bottom: 35px;
}

.section-heading h2 {
  font-size: 36px;
  margin: 0 0 12px;
  color: #354b3c;
}

.section-heading p {
  color: #69766a;
  font-size: 16px;
  line-height: 1.7;
}

.video-placeholder {
  background-color: #faf9f6;
  border: 2px dashed #cbd4c6;
  border-radius: 20px;
  padding: 55px 20px;
  text-align: center;
}

.video-section .subtitle {
  color: #a16e57;
}

.placeholder-icon {
  width: 65px;
  height: 65px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e3eadd;
  border-radius: 50%;
  color: #354b3c;
  font-size: 24px;
}

.video-placeholder h3 {
  font-size: 23px;
  color: #354b3c;
}

.video-placeholder p {
  max-width: 500px;
  margin: 0 auto;
  color: #788477;
  line-height: 1.7;
}

/* GRIGLIA VIDEO */
.video-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 30px;
}

/* CARD */
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

/* COPERTINA */
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

/* PLAY */

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

/* INFORMAZIONI */
.video-info {
  padding: 18px;
}

.video-info h3 {
  margin: 0 0 10px;
  font-size: 18px;
  color: #354b3c;
}

.video-author {
  color: #c98269;
  font-size: 14px;
  font-weight: bold;
}

.video-description {
  color: #788477;
  font-size: 13px;
  line-height: 1.6;
}

/* STATI */
.status-message,
.error-message {
  grid-column: 1 / -1;
  text-align: center;
  padding: 30px;
}

.error-message {
  color: #b54747;
}

/* FOOTER */
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 30px 8%;
  flex-wrap: wrap;
}

.footer p {
  color: #788477;
  font-size: 14px;
}

.footer > span {
  color: #9a9f96;
  font-size: 12px;
}

/* RESPONSIVE TABLET*/
@media (max-width: 900px) {
  .hero {
    padding: 50px 5%;
    gap: 30px;
    min-height: 70vh;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-content p {
    font-size: 16px;
  }

  .video-section {
    padding: 50px 5%;
  }

  .section-heading h2 {
    font-size: 28px;
  }

  .footer {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .thumbnail-container {
    height: 230px;
  }

  .video-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* RESPONSIVE SMARTPHONE */

@media (max-width: 600px) {
  .hero {
    padding: 40px 6%;
    text-align: center;
    justify-content: center;
    min-height: 55vh;
    background-image: none;
  }

  .hero::before {
    background: rgba(53, 75, 60, 0.6);
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-content p {
    font-size: 16px;
  }
  .video-section {
    padding: 50px 5%;
  }

  .section-heading h2 {
    font-size: 28px;
  }

  .footer {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
  .video-grid {
    grid-template-columns: 1fr;
  }

  .thumbnail-container {
    height: 230px;
  }
}

@media (max-width: 380px) {
  .logo {
    font-size: 25px;
  }

  .nav-button {
    font-size: 11px;
    padding: 9px 12px;
  }

  .hero h1 {
    font-size: 43px;
  }
}
</style>
