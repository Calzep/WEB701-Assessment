<template>
  <transition
    enter-active-class="animate__animated animate__fadeInDown"
    leave-active-class="animate__animated animate__fadeOutUp"
  >
    <div
      v-if="message"
      class="feedback animate__animated"
      :class="[type, animationClass]"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: String,
    type: {
      type: String, // "success" | "error" | "loading"
      default: "success"
    }
  },

  computed: {
    animationClass() {
      switch (this.type) {
        case "loading":
          return "animate__pulse animate__infinite";
        case "error":
          return "animate__shakeX";
        default:
          return "";
      }
    }
  }
}
</script>

<style scoped>
.feedback {
  padding: 12px 18px;
  border-radius: 6px;
  font-weight: 600;
  margin-top: 15px;
  text-align: center;
  width: 280px;
}

.success {
  background: #d4f8d4;
  color: #1b751b;
  border: 1px solid #8ddf8d;
}

.error {
  background: #ffd9d9;
  color: #9b1c1c;
  border: 1px solid #ff8a8a;
}

.loading {
  background: #e7e7ff;
  color: #3939a8;
  border: 1px solid #a5a5ff;
}
</style>
