<template>
  <span class="mask bg-secondary alpha-6"></span>
  <div class="container d-flex align-items-center no-padding">
    <div class="col">
      <div class="row justify-content-center">
        <div class="col-lg-4">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <span class="clearfix"></span>
              <img src="../assets/images/brand/icon.png" style="width: 50px" />
              <h4 class="heading h3 text-white pt-3 pb-5">
                您好，<br />
                欢迎登录
              </h4>
              <form class="form-primary">
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    id="input_email"
                    v-model="form.email"
                    autocomplete="on"
                    placeholder="请输入"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    id="input_password"
                    autocomplete="on"
                    v-model="form.password"
                    placeholder="请输入"
                  />
                </div>
                <div class="text-right mt-4">
                  <a href="#" class="text-white">忘记密码?</a>
                </div>
                <button
                  type="button"
                  @click="doLogin"
                  class="btn btn-block btn-lg bg-white mt-4"
                >
                  登录
                </button>
                <div class="form-group regsiter-container">
                  还没有账号？
                  <span class="register-btn" @click="router.push('/register')">
                    去注册
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, reactive, ref } from "vue";
import $ from "jquery";
import { useRouter } from "vue-router";
const form = reactive({
  email: "",
  password: "",
});

const router = useRouter();
const doLogin = async () => {
  $.post(
    "/auth/login",
    {
      email: form.email,
      password: form.password,
    },
    (data) => {
      if (data?.id && data?.token) {
        console.log("------> data", data);
        //@ts-ignore
        const search = (window as any).location.search;
        const redirectUrl = search.split("=")[1];
        //@ts-ignore
        window.location.href = `${redirectUrl}`;
      }
    },
    "json"
  );
};
</script>
<style>
.mi-captcha-radar-logo {
  display: none;
}
.regsiter-container {
  margin-top: 12px;
  float: right;
}
.register-btn {
  font-weight: bold;
  cursor: pointer;
}
</style>
