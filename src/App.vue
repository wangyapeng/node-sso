<template>
    <Header2></Header2>
    <Main>
        <RouterView />
    </Main>
    <Footer></Footer>
</template>
<script lang="ts" setup>
import Main from './components/Main.vue'
import Header2 from './components/Header2.vue'
import Footer from './components/Footer.vue';
import bootstrap from 'bootstrap';


</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
