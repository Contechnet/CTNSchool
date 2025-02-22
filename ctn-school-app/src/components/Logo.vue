<template>
  <div class="logo">
    <RouterLink to="/overview" aria-label="logo">
      <svg
        width="118"
        height="35"
        viewBox="0 0 118 35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Logo: A simple book icon -->
        <rect
          x="2"
          y="5"
          width="10"
          height="20"
          fill="#007BFF"
          stroke="black"
          stroke-width="1"
        />
        <rect
          x="8"
          y="5"
          width="10"
          height="20"
          fill="white"
          stroke="black"
          stroke-width="1"
        />
        <line x1="8" y1="5" x2="8" y2="25" stroke="black" stroke-width="1" />

        <text x="40" y="22" font-family="Arial" font-size="18" fill="black">
          School
        </text>
      </svg>
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
