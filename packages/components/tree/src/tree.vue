<template>tree</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { TreeNode, TreeOption, treeProps } from './tree'

defineOptions({
  name: 'z-tree'
})

const props = defineProps(treeProps)
console.log(props)

// 有了props 要对用户的数据进行格式化

const tree = ref<TreeNode[]>([])

function createOptions(key: string, label: string, children: string) {
  return {
    getKey(node: TreeOption) {
      return node[key] as string
    },
    getLabel(node: TreeOption) {
      return node[label] as string
    },
    getChildren(node: TreeOption) {
      return node[children] as TreeOption[]
    }
  }
}

const treeOptions = createOptions(
  props.keyField,
  props.labelField,
  props.childrenField
)

// 对树结构进行格式化
function createTree(data: TreeOption[]) {
  function traverse(data: TreeOption[], parent: TreeNode | null = null) {
    return data.map(node => {
      let children = treeOptions.getChildren(node) || []
      const treeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [] as TreeNode[],
        rawNode: node,
        level: parent ? parent.level + 1 : 1,
        // 判断节点是自带isLeaf,如果带了以自带的为准，否则看有没有children
        isLeaf: node.isLeaf ?? children.length == 0
      }
      if (children.length > 0) {
        treeNode.children = traverse(children, treeNode)
      }
      return treeNode
    })
  }
  const result: TreeNode[] = traverse(data)
  return result
}

watch(
  () => props.data,
  (data: TreeOption[]) => {
    tree.value = createTree(data)
    console.log(tree.value)
  },
  { immediate: true }
)
</script>
