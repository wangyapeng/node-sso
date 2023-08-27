<template>
  <span class="mask bg-primary alpha-6"></span>
  <div class="container d-flex align-items-center no-padding">
    <div class="col">
      <div class="row justify-content-center">
        <div class="col-lg-4">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <button
                type="button"
                class="btn btn-primary btn-nobg btn-zoom--hover mb-5"
              >
                <span class="btn-inner--icon"
                  ><i class="fas fa-arrow-left"></i
                ></span>
              </button>
              <span class="clearfix"></span>
              <img src="../assets/images/brand/icon.png" style="width: 50px" />
              <h4 class="heading h3 text-white pt-3 pb-5">
                您好<br />
                欢迎登录
              </h4>
              <form class="form-primary">
                <div class="form-group">
                  <input
                    type="email"
                    class="form-control"
                    id="input_email"
                    placeholder="请输入"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="password"
                    class="form-control"
                    id="input_password"
                    placeholder="请输入"
                  />
                </div>
                <div class="text-right mt-4">
                  <a href="#" class="text-white">忘记密码?</a>
                </div>
                <button
                  type="submit"
                  class="btn btn-block btn-lg bg-white mt-4"
                >
                  登录
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "LoginPage",
});
</script>
