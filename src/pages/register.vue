<template>
  <span class="mask bg-primary alpha-6"></span>
  <div class="container d-flex align-items-center no-padding">
    <div class="col">
      <div class="row justify-content-center">
        <div class="col-lg-4">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <span class="clearfix"></span>
              <img src="../assets/images/brand/icon.png" style="width: 50px" />
              <h4 class="heading h3 text-white pt-3 pb-5">注册成为嘟用户</h4>
              <form class="form-primary">
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    id="input_email"
                    autocomplete="off"
                    v-model="form.email"
                    placeholder="请输入邮箱"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    id="input_password"
                    autocomplete="off"
                    v-model="form.password"
                    placeholder="请输入密码"
                  />
                </div>
                <div class="form-group pt-2">
                  <input
                    type="password"
                    class="form-control"
                    id="input_password2"
                    autocomplete="off"
                    v-model="form.password2"
                    placeholder="确认密码"
                  />
                </div>
                <div class="form-group">
                  <mi-captcha
                    init-action="v1/captcha/init"
                    :init-params="initparams"
                    verify-action="v1/captcha/verifycation"
                    @init="initAfter"
                    @checked="checked"
                    @success="success"
                    ref="captcha"
                    width="290"
                    themeColor="#288cff"
                  />
                </div>
                <div class="text-right mt-4">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <a href="#" class="text-white">隐私政策</a>
                </div>
                <button
                  href="#"
                  type="button"
                  autocomplete="false"
                  class="btn btn-block btn-lg bg-white mt-4"
                  @click="formSubmit"
                >
                  注册
                </button>
                <div class="form-group regsiter-container">
                  注册完成？
                  <span class="register-btn" @click="router.push('/login')">
                    去登录
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="my-alert alert alert-primary fade show"
    v-show="alertMessage"
    role="alert"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="my-svg bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
      viewBox="0 0 16 16"
      role="img"
      aria-label="Warning:"
    >
      <path
        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
      />
    </svg>
    {{ alertMessage }}
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import $ from "jquery";
const form = reactive({
  email: "",
  password: "",
  password2: "",
});
const alertMessage = ref("");
const captcha = ref(null);
const initparams = ref({
  time: Date.now(),
});
const isCaptureChecked = ref(false);
const verify: any = {
  key: null,
};

const initAfter = (res: any) => {
  if (res?.data?.code === 200) {
    //@ts-ignore
    localStorage.setItem("mi-captcha-key", res?.data?.key);
    verify.key = res?.data?.key;
  }
};

const reset = () => {
  console.log("reinitialize");
};

const checked = () => {
  isCaptureChecked.value = true;
};

const success = (data: any) => {
  isCaptureChecked.value = true;
};
watch(alertMessage, (before, after) => {
  console.log(before, after);
  if (before) {
    setTimeout(() => {
      alertMessage.value = '';
    }, 3000);
  }
});

const router = useRouter();

const formSubmit = async (e: any) => {
  e.preventDefault();
  if (!isCaptureChecked.value) {
    alertMessage.value = "没有通过验证码验证！";
    return;
  }
  const email = form.email;
  if (
    !email.match(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/)
  ) {
    alertMessage.value = "请输入合法的邮箱";
    return;
  }

  if (form.password === "" || form.password2 === "") {
    alertMessage.value = "密码不能为空";
    return;
  }

  if (form.password !== form.password2) {
    alertMessage.value = "请确认两次密码输入一致";
    return;
  }

  $.post(
    "/auth/register",
    {
      name: "一个不愿意透露姓名的路人",
      email,
      password: form.password,
    },
    (res) => {
      if (res.id) {
        router.push("/login");
      } else {
        alertMessage.value = "注册失败！";
      }
    },
    "json"
  );
};
</script>
<style lang="scss">
.my-alert {
  position: absolute;
  left: 50%;
  margin-left: -80px;
  top: 80px;
}
.my-svg {
  display: inline;
  width: 20px;
  height: 20px;
  fill: #714343;
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