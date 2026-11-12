<script setup>
import { onMounted } from 'vue'
import { useVideos } from '@/composables/useVideos'
import VideoCards from '@/components/VideoCards.vue'
import AppFooter from '@/components/AppFooter.vue'

const { videos, loading, error, getVideos } = useVideos()
onMounted(getVideos)
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

        <template v-else>
          <VideoCards v-for="video in videos" :key="video.id" :video="video"></VideoCards>
        </template>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.hero {
  position: relative;
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

.hero-note {
  margin-top: 25px;
  color: #879587;
  font-size: 14px;
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

/* VIDEO SECTION */
.video-section {
  width: 100%;
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

.video-section .subtitle {
  color: #a16e57;
}

/* GRIGLIA VIDEO */
.video-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 30px;
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
