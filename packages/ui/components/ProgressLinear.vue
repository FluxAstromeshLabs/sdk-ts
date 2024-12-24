<template>
  <div class="progress-container">
    <div class="progress-bar"></div>
    <span v-if="showValue" :class="textClass" class="progress-value">{{ value }}%</span>
    <div v-if="targetValue" class="target" />
    <div class="progress-bar-bg bg-blueGray-light-200"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: Number,
    required: true,
    default: 0,
    validator: (value) => value >= 0 && value <= 100
  },
  height: {
    type: Number,
    default: 10
  },
  color: {
    type: String,
    default: () => 'currentColor'
  },
  textClass: {
    type: String,
    default: () => 'text-blueGray-900'
  },
  targetValue: {
    type: Boolean,
    default: false
  },
  showValue: {
    type: Boolean,
    default: false
  }
})
const width = computed(() => {
  return `${Math.min(100, props.value)}%`
})
const height = computed(() => {
  return `${props.height}px`
})
const left = computed(() => Number(props.targetValue) + '%')
</script>

<style>
.progress-container {
  width: 100%;
  height: v-bind(height);
  overflow: hidden;
  position: relative;
  border-radius: 12px;
}
.progress-value {
  @apply text-[10px] font-bold;
}
.progress-bar-bg {
  bottom: 0;
  left: 0;
  top: 0;
  position: absolute;
  width: 100%;
}
.progress-bar {
  height: 100%;
  width: v-bind(width);
  transition: width 0.5s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 12px;
  padding: 0 0.1px;
  background-color: v-bind(color);
}
.striped {
  animation: move 1s infinite linear;
  background-image: linear-gradient(
    135deg,
    hsla(0, 0%, 100%, 0.25) 25%,
    transparent 0,
    transparent 50%,
    hsla(0, 0%, 100%, 0.25) 0,
    hsla(0, 0%, 100%, 0.25) 75%,
    transparent 0,
    transparent
  );
  background-repeat: repeat;
  background-size: 10px;
}
.target {
  left: v-bind(left);
  @apply h-full border-r border-dotted border-blueGray-50 absolute top-0;
}
@keyframes move {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 10px 0;
  }
}
</style>
