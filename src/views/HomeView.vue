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
        <span class="subtitle">IL BENESSERE E' PER TUTTI</span>
        <h1>yoga, <span>insieme.</span></h1>
        <p>
          Ogni corpo ha il suo modo di muoversi. Scopri, condividi e lasciati ispirare dalle
          esperienze della nostra community
        </p>
        <div class="hero-note">Una community senza barriere</div>
      </div>
    </section>

    <section id="video" class="video-section">
      <p class="mobile-tagline">Il benessere è per tutti · yoga, insieme.</p>

      <div class="section-heading">
        <span class="subtitle">YOYO COMMUNITY</span>
        <h2>Le pratiche della community</h2>
        <p>Guarda i video, scopri nuove pratiche e condividi la tua passione per lo yoga</p>
      </div>

      <div class="video-grid">
        <p v-if="loading" class="status-message">Stiamo caricando i video...</p>
        <p v-else-if="error" class="error-message">{{ error }}</p>
        <p v-else-if="videos.length === 0" class="status-message">
          Nessun video disponibile al momento
        </p>

        <template v-else>
          <VideoCards v-for="video in videos" :key="video.id" :video="video" />
        </template>
      </div>
    </section>

    <AppFooter />
  </main>
</template>

<style scoped>
.hero {
  display: none;
}

.mobile-tagline {
  margin: 0 0 20px;
  color: #773b8a;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.subtitle {
  display: inline-block;
  margin-bottom: 18px;
  color: #773b8a;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
}

.video-section {
  width: 100%;
  padding: 40px 5%;
  background-color: #f0f1e9;
}

.section-heading {
  margin-bottom: 25px;
}

.section-heading h2 {
  margin: 0 0 12px;
  font-size: 28px;
  color: #000;
}

.section-heading p {
  color: #746976;
  font-size: 16px;
  line-height: 1.7;
}

.video-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.status-message,
.error-message {
  grid-column: 1 / -1;
  padding: 30px;
  text-align: center;
}

.error-message {
  color: #b54747;
}

/* ---------- TABLET (da 600px) ---------- */
@media (min-width: 600px) {
  .hero {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 70vh;
    padding: 50px 5%;
    background-image: url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600');
    background-size: cover;
    background-position: center;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(1, 1, 1, 0.85) 30%,
      rgba(0, 0, 0, 0.55) 60%,
      rgba(0, 0, 0, 0.15) 100%
    );
  }

  .hero-content {
    position: relative;
    max-width: 540px;
  }

  .hero .subtitle {
    color: #773b8a;
  }

  .hero h1 {
    margin: 0 0 25px;
    font-size: clamp(48px, 6vw, 76px);
    line-height: 1.1;
    color: #fff;
  }

  .hero h1 span {
    color: #773b8a;
  }

  .hero-content p {
    margin-bottom: 30px;
    font-size: 16px;
    line-height: 1.8;
    color: #f0f1e9;
  }

  .hero-note {
    margin-top: 25px;
    font-size: 14px;
    color: #d9e0d4;
  }

  .mobile-tagline {
    display: none;
  }

  .video-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* ---------- DESKTOP (da 900px) ---------- */
@media (min-width: 900px) {
  .hero {
    min-height: 80vh;
    padding: 80px 10%;
  }

  .hero-content p {
    font-size: 18px;
  }

  .video-section {
    padding: 70px 8%;
  }

  .section-heading h2 {
    font-size: 36px;
  }

  .video-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
