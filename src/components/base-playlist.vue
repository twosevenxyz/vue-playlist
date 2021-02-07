<template>
  <div class="playlist-root">
    <draggable class="playlist-container"
        :forceFallback="true"
        tag="div"
        v-model="localOrder"
        v-bind="finalDragOpts"
        @start="onStart"
        @end="onEnd"
        @change="onChange"
        @choose="e => $emit('choose', e)"
        @unchoose="e => $emit('unchoose', e)">
      <transition-group type="transition" name="flip-list">
        <div class="list-group-item" v-for="(key, $index) in localOrder" :key="key">
          <slot name="list-item" :entry="data[key]" :index="$index">
            {{ data[key].title }}
          </slot>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

const defaultDragOpts = () => {
  return {
    animation: 100,
    group: 'playlist',
    disabled: false,
    ghostClass: 'ghost',
    scrollSensitivity: 30,
    bubbleScroll: true,
    handle: '.handle'
  }
}

export default {
  name: 'base-playlist',
  components: {
    draggable
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    order: {
      type: Array,
      required: true
    },
    keyField: {
      type: String,
      required: true
    },
    nowPlaying: {
      type: String,
      default: ''
    },
    dragOpts: {
      type: Object,
      default () {
        return defaultDragOpts()
      }
    }
  },
  computed: {
    finalDragOpts () {
      return Object.assign(defaultDragOpts(), this.dragOpts, {
        containment: this.$el
      })
    }
  },
  data () {
    return {
      localOrder: []
    }
  },
  watch: {
    order () {
      this.localOrder = this.order
    }
  },
  methods: {
    onStart (e) {
      this.$emit('start', e)
    },
    onEnd (e) {
      this.$emit('end', e)
    },
    async onChange (evt) {
      await this.$nextTick()
      this.$emit('change', evt)
      this.$emit('update:order', this.localOrder)
    }
  },
  beforeMount () {
    this.localOrder = this.order
  }
}
</script>

<style lang="scss" scoped>
.playlist-root {
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .list-group {
    min-height: 20px;
    display: inline-block;
  }
  .list-group-item {
    border: thin solid lightgrey;
    border-radius: 2px;
    ::v-deep .drag-handle-container {
      cursor: hand;
      cursor: move;
      cursor: grab;
    }
  }
      .sortable-chosen {
        ::v-deep .drag-handle-container {
          cursor: grabbing !important;
        }
      }
}
</style>
