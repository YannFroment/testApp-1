<template>
  <div class="main">
    <header id="pageHeader"><Header /></header>
    <article id="mainArticle"><Article /></article>
    <nav id="leftNav"><LeftNav /></nav>
    <aside id="siteAds"><Ads /></aside>
    <footer id="pageFooter"><Footer /></footer>
  </div>
</template>

<script>
import Ads from '@/components/Ads.vue'
import Article from '@/components/Article.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import LeftNav from '@/components/LeftNav.vue'
export default {
  name: 'HomeView',
  components: {
    Ads,
    Article,
    Footer,
    Header,
    LeftNav,
  },

}
</script>
