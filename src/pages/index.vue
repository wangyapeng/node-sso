<template>
    <h1>
        欢迎来到 嘟嘟 鉴权中心
    </h1>
    <div style="height: 500px">




        tewptiewtpiwep
    </div>
</template>

<script lang="ts" setup>
import useUserStore from '../store/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const { age, name } = storeToRefs(userStore);
const { updateAge } = userStore;
const addClick = () => {
    updateAge(100)
}
</script>
