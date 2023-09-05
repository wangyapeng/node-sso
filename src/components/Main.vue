<template>
    <main class="main">
      <section class="py-xl bg-cover bg-size--cover bg-main" style="{'background-image': url(`${imgUrl.default}`)}">
        <slot></slot>
      </section>
    </main>
</template>
<script setup>
import { onMounted, ref } from 'vue';
var imgUrl = ref({default: ""})
onMounted(async () => {
  imgUrl = await import('../assets/images/backgrounds/img-1.jpg')
  console.log(imgUrl)
})

</script>
<style lang="scss">
.bg-main{
}
</style>