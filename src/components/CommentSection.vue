<script setup>
import { ref, watch, computed } from 'vue'
import { seedComments } from '@/data/seedComments'

const props = defineProps({
  videoId: {
    type: [String, Number],
    required: true,
  },
})

const storageKey = `comments-${props.videoId}`
const author = ref('')
const text = ref('')

const saved = JSON.parse(localStorage.getItem(storageKey) || '[]')
const comments = ref(saved.length ? saved : [...(seedComments[props.videoId] ?? [])])
watch(
  comments,
  (value) => {
    localStorage.setItem(storageKey, JSON.stringify(value))
  },
  { deep: true },
)

const addComment = () => {
  const trimmed = text.value.trim()
  if (!trimmed) return

  comments.value.push({
    id: Date.now(),
    author: author.value.trim() || 'Anonimo',
    text: trimmed,
    date: new Date().toLocaleString('it-IT'),
  })

  text.value = ''
}
</script>

<template>
  <section class="comments">
    <h2>Commenti ({{ comments.length }})</h2>

    <!-- AREA COMMENTI (sopra il form) -->
    <ul v-if="comments.length > 0" class="comment-list">
      <li v-for="comment in comments" :key="comment.id" class="comment">
        <div class="comment-header">
          <strong>{{ comment.author }}</strong>
          <span>{{ comment.date }}</span>
        </div>
        <p>{{ comment.text }}</p>
      </li>
    </ul>
    <p v-else class="no-comments">Nessun commento. Scrivi il primo!</p>

    <!-- FORM (sotto) -->
    <div class="comment-form">
      <input v-model="author" type="text" placeholder="Il tuo nome (facoltativo)" />
      <textarea
        v-model="text"
        rows="3"
        placeholder="Scrivi un commento..."
        @keydown.ctrl.enter="addComment"
      ></textarea>
      <button type="button" :disabled="!text.trim()" @click="addComment">Invia</button>
    </div>
  </section>
</template>

<style scoped>
.comments {
  max-width: 900px;
  margin-top: 50px;
}

.comments h2 {
  margin: 0 0 20px;
  font-size: 24px;
  color: #49354b;
}

.comment-list {
  list-style: none;
  padding: 0;
  margin: 0 0 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.comment {
  padding: 15px 18px;
  background-color: #f0f1e9;
  border-radius: 14px;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
  font-size: 14px;
}

.comment-header strong {
  color: #4b354b;
}

.comment-header span {
  color: #928795;
  font-size: 12px;
}

.comment p {
  margin: 0;
  color: #766976;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.no-comments {
  margin-bottom: 30px;
  color: #958794;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comment-form input,
.comment-form textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #cbd4c6;
  border-radius: 12px;
  background-color: #fff;
  font-family: inherit;
  font-size: 15px;
  color: #4b354a;
  resize: vertical;
}

.comment-form input:focus,
.comment-form textarea:focus {
  outline: 2px solid #773b8a;
  border-color: transparent;
}

.comment-form button {
  align-self: flex-start;
  padding: 12px 26px;
  border: none;
  border-radius: 30px;
  background-color: #48354b;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
}

.comment-form button:hover:not(:disabled) {
  background-color: #69536d;
}

.comment-form button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
