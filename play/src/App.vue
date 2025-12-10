<script setup lang="ts">
import type { Key, TreeOption } from '@mine/components/tree/src/tree'
import { AddCircle } from '@vicons/ionicons5'

import { ref } from 'vue'

function createData(level = 4, parentKey = ''): TreeOption[] {
  if (!level) return []
  const arr = new Array(6 - level).fill(0)
  return arr.map((_, idx: number) => {
    const key = parentKey + level + idx
    return {
      label: createLabel(level),
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

// function createData() {
//   return [
//     {
//       label: nextLabel(),
//       key: 1,
//       isLeaf: false //isLeaf false表示点击的时候动态加载叶子节点
//     },
//     {
//       label: nextLabel(),
//       key: 2,
//       isLeaf: false
//     }
//   ]
// }

function nextLabel(currentLabel?: string | number): string {
  if (!currentLabel) return 'Out of Tao, One is born'

  if (currentLabel === 'Out of Tao, One is born') return 'Out of One, Two'
  if (currentLabel === 'Out of One, Two') return 'Out of Two, Three'
  if (currentLabel === 'Out of Two, Three') {
    return 'Out of Three, the created universe'
  }

  if (currentLabel === 'Out of Three, the created universe') {
    return 'Out of Tao, One is born'
  }

  return ''
}

const data = ref<TreeOption[]>(createData())

const handleLoad = (node: TreeOption) => {
  // 内部组件需要将需要展开的节点传给用户
  return new Promise<TreeOption[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([
        // 这里作为当前展开的node
        {
          label: nextLabel(node.label),
          key: node.key + nextLabel(node.label),
          isLeaf: false
        }
      ])
    }, 1000)
  })
}

const value = ref<Key[]>(['40', '41'])

// const data = ref<TreeOption[]>([
//   {
//     key: '0',
//     label: '0',
//     children: [
//       {
//         key: '0-0',
//         label: '0-0'
//       },
//       {
//         disabled: true, // 这个节点被禁用
//         key: '0-1',
//         label: '0-1',
//         children: [
//           {
//             label: '0-1-0',
//             key: '0-1-0'
//           },
//           {
//             label: '0-1-1',
//             key: '0-1-1'
//           }
//         ]
//       }
//     ]
//   }
// ])
</script>

<template>
  测试

  <ZIcon color="red" :size="20">
    <AddCircle />
  </ZIcon>
  <!-- 传递树结构 -->
  <z-tree :data="data" selectable multiple v-model:selected-keys="value">
    <template #default="{ node }">
      <span>{{ node.label }} {{ node.key }}</span>
    </template>
  </z-tree>
  <!-- selectable 表示可以选择节点  multiple 表示可以多选  selected-keys是选中后的节点  -->
</template>

<style scoped></style>
