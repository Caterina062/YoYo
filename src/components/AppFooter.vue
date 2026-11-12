<template>
  <footer class="footer">
    <a href="#" class="logo">YoYo<span>.</span></a>
    <p>Il benessere è un percorso da condividere</p>
    <span>@ 2026 YoYo - Friends</span>
  </footer>
</template>

<style setup>
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
  .footer {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
}

/* RESPONSIVE SMARTPHONE */

@media (max-width: 600px) {
  .footer {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
}
</style>
