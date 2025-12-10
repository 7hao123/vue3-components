<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSelected),
      bem.is('disabled', node?.disabled)
    ]"
  >
    <div
      :class="[bem.e('content')]"
      :style="{ paddingLeft: node!.level * 16 + 'px' }"
    >
      <span
        :class="[
          bem.e('expand-icon'),
          { expanded: expanded && !node?.isLeaf },
          bem.is('leaf', node?.isLeaf)
        ]"
        @click="handleExpand"
      >
        <z-icon size="25">
          <Switcher v-if="!isLoading"></Switcher>
          <Loading v-else></Loading>
        </z-icon>
      </span>
      <span @click="handleSelected" :class="bem.e('label')">{{
        node?.label
      }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { treeNodeEmits, treeNodeProps } from './tree'
import { createNamespace } from '@mine/utils/create'
import ZIcon from '@mine/components/icon'
import Switcher from './icon/Switcher'
import Loading from './icon/Loading'
import { computed } from 'vue'

const props = defineProps(treeNodeProps)
const emit = defineEmits(treeNodeEmits)
const bem = createNamespace('tree-node')
function handleExpand() {
  emit('toggle', props.node!)
}

const isLoading = computed(() => {
  return props.loadingKeys?.has(props.node!.key)
})

const isSelected = computed(() => {
  return props.selectedKeys?.includes(props.node!.key)
})
function handleSelected() {
  if (props.node?.disabled) return
  emit('select', props.node!)
}
</script>
