<script>
import { ref, reactive, computed, onBeforeMount, onBeforeUpdate } from 'vue'

export default {
  props: {
    //page value
    modelValue: {
      type: Number
    },
    //total number of pages
    pageCount: {
      type: Number,
      required: true
    },
    initialPage: {
      type: Number,
      default: 1
    },
    forcePage: {
      type: Number
    },
    clickHandler: {
      type: Function,
      default: () => {}
    },
    //number of pages to display
    pageRange: {
      type: Number,
      default: 3
    },
    marginPages: {
      type: Number,
      default: 1
    },
    breakViewText: {
      type: String,
      default: '…'
    },
    containerClass: {
      type: String,
      default: 'pagination'
    },
    pageClass: {
      type: String,
      default: 'page-item'
    },
    activeClass: {
      type: String,
      default: 'active'
    },
    disabledClass: {
      type: String,
      default: 'disabled'
    },
    firstLastButton: {
      type: Boolean,
      default: false
    },
    firstButtonText: {
      type: String,
      default: 'First'
    },
    lastButtonText: {
      type: String,
      default: 'Last'
    },
    hidePrevNext: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const innerValue = ref(1)

    const selected = computed({
      get: () => props.modelValue || innerValue.value,
      set: (newValue) => {
        innerValue.value = newValue
      }
    })

    const pages = computed(() => {
      const items = {}
      const { pageCount, pageRange, marginPages } = props
      if (pageCount <= pageRange) {
        for (let index = 0; index < pageCount; index++) {
          const page = {
            index: index,
            content: index + 1,
            selected: index === selected.value - 1
          }
          items[index] = page
        }
      } else {
        const halfPageRange = Math.floor(pageRange / 2)

        const setPageItem = (index) => {
          const page = {
            index: index,
            content: index + 1,
            selected: index === selected.value - 1
          }
          items[index] = page
        }

        const setBreakView = (index) => {
          const breakView = {
            disabled: true,
            breakView: true
          }
          items[index] = breakView
        }

        for (let i = 0; i < marginPages; i++) {
          setPageItem(i)
        }

        let selectedRangeLow = 0
        if (selected.value - halfPageRange > 0) {
          selectedRangeLow = selected.value - 1 - halfPageRange
        }

        let selectedRangeHigh = selectedRangeLow + pageRange - 1
        if (selectedRangeHigh >= pageCount) {
          selectedRangeHigh = pageCount - 1
          selectedRangeLow = selectedRangeHigh - pageRange + 1
        }

        for (let i = selectedRangeLow; i <= selectedRangeHigh && i <= pageCount - 1; i++) {
          setPageItem(i)
        }

        if (selectedRangeLow > marginPages) {
          setBreakView(selectedRangeLow - 1)
        }

        if (selectedRangeHigh + 1 < pageCount - marginPages) {
          setBreakView(selectedRangeHigh + 1)
        }

        for (let i = pageCount - 1; i >= pageCount - marginPages; i--) {
          setPageItem(i)
        }
      }
      return items
    })

    const handlePageSelected = (selected) => {
      if (selected === selected.value) return
      innerValue.value = selected
      emit('update:modelValue', selected)
      props.clickHandler(selected)
    }

    const prevPage = () => {
      if (selected.value <= 1) return
      handlePageSelected(selected.value - 1)
    }

    const nextPage = () => {
      if (selected.value >= props.pageCount) return
      handlePageSelected(selected.value + 1)
    }

    const firstPageSelected = () => selected.value === 1

    const lastPageSelected = () => selected.value === props.pageCount || props.pageCount === 0

    const selectFirstPage = () => {
      if (selected.value <= 1) return
      handlePageSelected(1)
    }

    const selectLastPage = () => {
      if (selected.value >= props.pageCount) return
      handlePageSelected(props.pageCount)
    }

    onBeforeMount(() => {
      innerValue.value = props.initialPage
    })

    onBeforeUpdate(() => {
      if (props.forcePage === undefined) return
      if (props.forcePage !== selected.value) {
        selected.value = props.forcePage
      }
    })

    return {
      innerValue,
      selected,
      pages,
      handlePageSelected,
      prevPage,
      nextPage,
      firstPageSelected,
      lastPageSelected,
      selectFirstPage,
      selectLastPage
    }
  }
}
</script>

<template>
  <!-- Alternative container without list items -->
  <div :class="containerClass" class="base-pagination" v>
    <BaseButton
      v-if="firstLastButton"
      @click="selectFirstPage()"
      @keyup.enter="selectFirstPage()"
      :class="['page-item', { [disabledClass]: firstPageSelected() }]"
      tabindex="0"
      v-html="firstButtonText"
    >
    </BaseButton>
    <BaseButton
      v-if="!(firstPageSelected() && hidePrevNext)"
      @click="prevPage()"
      @keyup.enter="prevPage()"
      :class="['page-item', { [disabledClass]: firstPageSelected() }]"
      tabindex="0"
    >
      <BaseIcons name="arrowLeft" />
    </BaseButton>
    <template v-for="page in pages">
      <a
        v-if="page.breakView"
        :key="page.index"
        :class="['break-view-item', { [disabledClass]: page.disabled }]"
        tabindex="0"
      >
        <slot name="breakViewContent">{{ breakViewText }}</slot>
      </a>

      <a
        v-else-if="page.disabled"
        :key="page.index + 'disabled'"
        :class="[{ [activeClass]: page.selected }, disabledClass]"
        tabindex="0"
        >{{ page.content }}</a
      >

      <a
        v-else
        :key="page.index + 'enabled'"
        @click="handlePageSelected(page.index + 1)"
        @keyup.enter="handlePageSelected(page.index + 1)"
        :class="[pageClass, { [activeClass]: page.selected }]"
        tabindex="0"
        >{{ page.content }}</a
      >
    </template>
    <BaseButton
      v-if="!(lastPageSelected() && hidePrevNext)"
      @click="nextPage()"
      @keyup.enter="nextPage()"
      :class="['page-item', { [disabledClass]: lastPageSelected() }]"
      tabindex="0"
    >
      <BaseIcons name="arrowRight" />
    </BaseButton>
    <BaseButton
      v-if="firstLastButton"
      @click="selectLastPage()"
      @keyup.enter="selectLastPage()"
      :class="['page-item', { [disabledClass]: lastPageSelected() }]"
      tabindex="0"
      v-html="lastButtonText"
    ></BaseButton>
  </div>
</template>

<style scoped></style>
