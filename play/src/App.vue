<script setup lang="ts">
import { AddCircle } from '@vicons/ionicons5'

import { ref } from 'vue'
interface TreeOption {
  label: string
  key: string
  children?: TreeOption[]
}
function createData(level = 4, parentKey = ''): TreeOption[] {
  if (!level) return []
  const arr = new Array(6 - level).fill(0)
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx
    return {
      xxx: createLabel(level),
      key,
      children: createData(level - 1, key)
    }
  })
}
function createLabel(level: number): string {
  if (level === 4) return '道生一'
  if (level === 3) return '一生二'
  if (level === 2) return '二生三'
  if (level === 1) return '三生万物'
  return ''
}
const data = ref<TreeOption[]>(createData())
</script>

<template>
  测试

  <ZIcon color="red" :size="20">
    <AddCircle />
  </ZIcon>
  <!-- 传递树结构 -->
  <z-tree
    :data="data"
    label-field="xxx"
    key-field="key"
    children-field="children"
  ></z-tree>
</template>

<style scoped></style>
