<template>
  <div :class="bem.b()">
    <!-- <template v-for="node in flattenTree" :key="node.key">
      <div :class="bem.e('element')">{{ node.label }}</div>
    </template> -->
    <z-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :expanded="isExpanded(node)"
      @toggle="toggleExpand"
    ></z-tree-node>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { TreeNode, TreeOption, treeProps } from './tree'
import { createNamespace } from '@mine/utils/create'
import ZTreeNode from './treeNode.vue'

const bem = createNamespace('tree')

defineOptions({
  name: 'z-tree'
})

const props = defineProps(treeProps)

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

//

const expandedKeysSet = ref(new Set(props.defaultExpandedKeys))

const flattenTree = computed(() => {
  let expandedKeys = expandedKeysSet.value

  // 被扁平化的树
  let flattenNodes: TreeNode[] = []

  const nodes = tree.value || [] //被格式化的节点

  const stack: TreeNode[] = [] //遍历树的栈

  for (let i = nodes.length - 1; i >= 0; i--) {
    stack.push(nodes[i])
  }
  while (stack.length) {
    const node = stack.pop()
    if (node) {
      flattenNodes.push(node)
      if (expandedKeys.has(node.key)) {
        const children = node.children || []
        for (let i = children.length - 1; i >= 0; i--) {
          stack.push(children[i])
        }
      }
    }
  }
  return flattenNodes
})

function isExpanded(node) {
  return expandedKeysSet.value.has(node.key)
}

function collapse(node: TreeNode) {
  expandedKeysSet.value.delete(node.key)
}

function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key)
}

function toggleExpand(node: TreeNode) {
  const expandKeys = expandedKeysSet.value
  if (expandKeys.has(node.key)) {
    collapse(node)
  } else {
    expand(node)
  }
}
</script>
