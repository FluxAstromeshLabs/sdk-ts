<script setup lang="ts">
//random id
const id = Math.random().toString(36).substring(7)
const id1 = Math.random().toString(36).substring(7)
const id2 = Math.random().toString(36).substring(7)
const id3 = Math.random().toString(36).substring(7)
</script>
<template>
  <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g :clip-path="`url(#${id})`">
      <path
        id="Vector"
        d="M3.68008 13.411C3.81111 13.28 3.98876 13.2064 4.174 13.2064H21.2646C21.576 13.2064 21.7318 13.5829 21.5116 13.803L18.1345 17.1774C18.0035 17.3083 17.8258 17.3818 17.6406 17.3818H0.549963C0.238625 17.3818 0.0827701 17.0054 0.303007 16.7853L3.68008 13.411Z"
        :fill="`url(#${id1})`"
      />
      <path
        id="Vector_2"
        d="M3.68 0.804468C3.81104 0.673543 3.98869 0.599998 4.17392 0.599998H21.2645C21.5759 0.599998 21.7317 0.976477 21.5115 1.19654L18.1344 4.57093C18.0034 4.70185 17.8258 4.7754 17.6405 4.7754H0.549887C0.238549 4.7754 0.0826938 4.39891 0.30293 4.17886L3.68 0.804468Z"
        :fill="`url(#${id2})`"
      />
      <path
        id="Vector_3"
        d="M18.1345 7.06755C18.0035 6.9366 17.8258 6.8631 17.6406 6.8631H0.549963C0.238625 6.8631 0.0827701 7.23954 0.303007 7.45961L3.68008 10.834C3.81111 10.9649 3.98876 11.0385 4.174 11.0385H21.2646C21.576 11.0385 21.7318 10.662 21.5116 10.4419L18.1345 7.06755Z"
        :fill="`url(#${id3})`"
      />
    </g>
    <defs>
      <linearGradient
        :id="id1"
        x1="14.6776"
        y1="-4.00337"
        x2="2.8494"
        y2="18.6523"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00FFA3" />
        <stop offset="1" stop-color="#DC1FFF" />
      </linearGradient>
      <linearGradient
        :id="id2"
        x1="14.6775"
        y1="-4.00336"
        x2="2.84932"
        y2="18.6524"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00FFA3" />
        <stop offset="1" stop-color="#DC1FFF" />
      </linearGradient>
      <linearGradient
        :id="id3"
        x1="14.6776"
        y1="-4.00338"
        x2="2.8494"
        y2="18.6523"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#00FFA3" />
        <stop offset="1" stop-color="#DC1FFF" />
      </linearGradient>
      <clipPath :id="id">
        <rect width="21.4308" height="16.8" fill="white" transform="translate(0.199982 0.599998)" />
      </clipPath>
    </defs>
  </svg>
</template>
