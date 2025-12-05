<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>
<!-- 组件没有名字 -->
<!-- 方案一 -->
<!-- <script lang="ts">
export default {
  name: "MineIcon",
}; -->
<!-- </script> -->
<!-- 方案二插件 unplugin-vue-define-options -->
<script lang="ts" setup>
import { createNamespace } from "@mine/utils/create";
import { iconProps } from "./icon";
import { computed } from "vue";
defineOptions({
  name: "ZIcon",
});
const props = defineProps(iconProps);

const bem = createNamespace("icon");

const style = computed(() => {
  if (!props.size && !props.color) return {};

  return {
    ...(props.size ? { "font-size": props.size + "px" } : {}),
    ...(props.color ? { color: props.color } : {}),
  };
});
</script>
