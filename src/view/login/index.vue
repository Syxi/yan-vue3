<template>
  <el-form
    ref="loginFormRef"
    :model="loginData"
    :rules="loginRules"
    class="login-form"
  >
    <div class="flex text-white items-center py-4">
      <span class="text-2xl flex-1 text-center">{{ $t("login.title") }}</span>
      <lang-select style="color: #fff" />
    </div>

    <el-form-item prop="username">
      <div class="p-2" text-white>
        <el-icon><User /></el-icon>
      </div>
      <el-input
        class="flex-1"
        size="large"
        ref="username"
        v-model="loginData.username"
        placeholder="登录名"
        name="username"
      />
    </el-form-item>

    <el-form-item prop="password">
      <span class="p-2 text-white">
        <el-icon><Lock /></el-icon>
      </span>
      <el-input
        class="flex-1"
        v-model="loginData.password"
        placeholder="密码"
        :type="passwordVisible === false ? 'passwor' : 'input'"
        size="large"
        @keyup="checkCapslock"
        @keyup.enter="handleLogin"
      />
      <span class="mr-2" @cclick="passwordVisible = !passwordVisible">
        <svg-icon
          :icon-class="passwordVisible === false ? 'eye' : 'eye-open'"
          class="text-white cursor-pointer"
        />
      </span>
    </el-form-item>

    <el-form-item prop="verifyCode">
      <el-input
        v-mode="loginData.verifyCode"
        auto-complete="off"
        :placeholder="$t(login.verifyCode)"
        class="w-[60%]"
        @keyup.enter="handleLogin"
      />
      <div class="captcha">
        <img :src="captchaBase64" @click="getLoginCaptcha" />
      </div>
    </el-form-item>

    <el-button
      type="primary"
      size="default"
      :loading="loading"
      class="w-full"
      @click.prevent="handleLogin"
      >{{ $t("login.login") }}</el-button
    >
  </el-form>
</template>

<script lang="ts" setup>
import router from "@/router";

// 状态管理依赖
import { useUserStore } from "@/store/user";

// api依赖
import { LocationQuery, LocationQueryValue, useRoute } from "vue-router";
import { getCaptchaApi } from "@/api/login";
import { LoginData } from "@/api/login/types";
import { ElForm } from "element-plus";

const userStore = useUserStore();
const route = useRoute();

/**
 * 按钮loaging
 */
const loading = ref(false);

/**
 * 是否大写锁定
 */
const isCapslock = ref(false);

/**
 * 密码是否可见
 */
const passwordVisible = ref(false);

/**
 * 验证码图片Base64字符串
 */
const captchaBase64 = ref();

/**
 * 登录表单引用
 */
const loginFormRef = ref(ElForm);

const loginData = ref<LoginData>({
  username: "",
  password: "",
});

const loginRules = {
  username: [{ require: true, trigger: "blur" }],
  password: [{ require: true, trigger: "blur", validator: passwordValidator }],
  verifyCode: [{ require: true, trigger: "blur" }],
};

/**
 * 密码校验器
 */
// @ts-ignore
function passwordValidator(rule: any, value: any, callback: any) {
  if (value.length < 6) {
    callback(new Error("密码不能少于6位"));
  } else {
    callback();
  }
}

/**
 * 检查输入大小写状态
 */
function checkCapslock(e: any) {
  const { key } = e;
  isCapslock.value = key && key.length === 1 && key >= "A" && key <= "Z";
}

/**
 * 获取验证码
 */
function getLoginCaptcha() {
  getCaptchaApi().then(({ data }) => {
    const { verifyCodeBase64, verifyCodeKey } = data;
    loginData.value.verifyCodeKey = verifyCodeKey;
    captchaBase64.value = verifyCodeBase64;
  });
}

/**
 * 登录
 */
function handleLogin() {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true;
      userStore
        .login(loginData.value)
        .then(() => {
          const query: LocationQuery = route.query;
          const redirect = (query.redirect as LocationQueryValue) ?? "/";
          const otherQueryParams = Object.keys(query).reduce(
            (acc: any, cur: string) => {
              if (cur !== "redirect") {
                acc[cur] = query[cur];
              }
              return acc;
            },
            {}
          );
          router.push({ path: redirect, query: otherQueryParams });
        })
        .catch(() => {
          // 验证失败，重新生成验证码
          getLoginCaptcha();
        })
        .finally(() => {
          loading.value = false;
        });
    }
  });
}

onMounted(() => {
  getLoginCaptcha();
});
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #2d3a4b;

  .login-form {
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .captcha {
      position: absolute;
      top: 0;
      right: 0;

      img {
        width: 120px;
        height: 48px;
        cursor: pointer;
      }
    }
  }
}

.el-form-item {
  background: rgb(0 0 0 / 10%);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 5px;
}

.el-input {
  background: transparent;

  // 子组件 scoped 无效，使用 :deep
  :deep(.el-input__wrapper) {
    padding: 0;
    background: transparent;
    box-shadow: none;

    .el-input__inner {
      color: #fff;
      caret-color: #fff;
      background: transparent;
      border: 0;
      border-radius: 0;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px transparent inset !important;
        -webkit-text-fill-color: #fff !important;
      }

      // 设置输入框自动填充的延迟属性
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        transition:
          color 99999s ease-out,
          background-color 99999s ease-out;
        transition-delay: 99999s;
      }
    }
  }
}
</style>
@/router/router@/store/modules/userStore@/store/user@/router/index1
