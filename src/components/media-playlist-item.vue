<template>
  <div class="media-playlist-item-root">
    <div class="index-container" v-show="index !== -1">
      <div class="index">
        <slot name="index">
          {{ index }}
        </slot>
      </div>
    </div>
    <div class="drag-handle-container handle">
      <slot name="drag-handle">
        <DragVertical class="drag-handle" />
      </slot>
    </div>
    <div class="poster-container">
      <div class="overlay">
        <slot name="overlay-content">
          Play >
        </slot>
      </div>
      <slot name="poster">
        <img :src="poster">
      </slot>
    </div>
    <div class="text-content">
      <div class="title-row">
        <div class="title">{{ title }}</div>
      </div>
      <div class="description-row">
        <div class="description" v-html="description"></div>
      </div>
    </div>
    <div class="options-container dropdown" :class="{'is-active': showOptions}">
      <div class="options-btn-container">
        <slot name="options-btn">
          <DotsVertical class="options-btn" @click="toggleOptions()"/>
        </slot>
      </div>
      <div class="dropdown-menu">
        <div class="dropdown-content">
          <slot name="options">
            <a class="dropdown-item" @click="$emit('remove'); toggleOptions(false)">
              Remove from list
            </a>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DotsVertical from 'vue-material-design-icons/DotsVertical.vue'
import DragVertical from 'vue-material-design-icons/DragVertical.vue'

export default {
  name: 'media-playlist-item',
  components: {
    DotsVertical,
    DragVertical
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    duration: {
      type: String
    },
    poster: {
      type: String
    },
    index: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      showOptions: false
    }
  },
  watch: {
  },
  methods: {
    toggleOptions (value) {
      value = value !== undefined ? value : !this.showOptions
      this.showOptions = value
      if (this.showOptions) {
        setTimeout(() => window.addEventListener('click', this.windowOnClick), 0)
      } else {
        console.log('Removed listener')
        window.addEventListener('click', this.windowOnClick)
      }
      this.$emit('toggle-options', { vm: this, value })
    }
  },
  beforeMount () {
    this.windowOnClick = e => {
      const { target } = e
      const optionsContainer = this.$el.querySelector('.options-container')
      if (target.closest('.options-container') !== optionsContainer) {
        console.log('Removed listener')
        window.removeEventListener('click', this.windowOnClick)
        this.showOptions = false
      }
    }
  },
  mounted () {
  },
  beforeDestroy () {
    window.addEventListener('click', this.windowOnClick)
  }
}
</script>

<style lang="scss" scoped>
$item-height: 56px;
$padding-vertical: 8px;
$img-margin-horizontal: 0px;
$img-height: calc(#{$item-height} - (2 * #{$padding-vertical}));

$bg-color: rgba(120, 120, 120, 1);

$text-color: #1e1e1e;
$text-color-hover: #0e0e0e;

.media-playlist-item-root {
  @import '~bulma/sass/utilities/_all.sass';
  @import '~bulma/sass/base/_all.sass';
  @import '~bulma/sass/components/dropdown.sass';

  display: flex;
  flex-direction: row;
  flex: 1;
  height: var(--item-height, $item-height);
  background-color: var(--bg-color, $bg-color);
  border-radius: inherit;
  color: var(--text-color, $text-color);
  padding: var(--item-padding-vertical, #{$padding-vertical}) var(--item-padding-horizontal, 0px);
  &:hover {
    background-color: var(--hover-bg-color, #{lighten($bg-color, 10)});
  }
  .index-container {
    display: flex;
    flex-direction: column;
    width: 1em;
    align-items: center;
    justify-content: center;
  }
  .poster-container {
    position: relative;
    border-radius: inherit;
    height: 100%;
    .overlay {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: none;
      flex-direction: column;
      flex: 1;
      align-items: center;
      justify-content: center;
    }
    &:hover {
      .overlay {
        display: flex;
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
    img {
      display: block;
      height: 100%;
      width: auto;
    }
  }
  .text-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    margin-left: 1em;
    .title-row {
      display: flex;
      flex: 1.15;
      align-items: center;
      .title {
        font-weight: bold;
        font-size: 1em;
      }
    }
    .description-row {
      display: flex;
      flex: 1;
      align-items: center;
      .description {
        font-size: 0.9em;
      }
    }
  }
  .drag-handle-container {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
  .options-container {
    display: flex;
    color: var(--options-btn-color, --text-color);
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .options-btn {
      cursor: pointer;
      &:hover {
        color: var(--text-color-hover, #{$text-color-hover});
      }
    }
    &.dropdown {
      .dropdown-menu {
        top: 70%;
        right: 0; /* Contain it within the item */
        left: unset;
        .dropdown-content {
          background-color: var(--menu-bg-color, var(--bg-color, #{lighten($bg-color, 5)}));
          .dropdown-item {
            background-color: inherit;
            padding-right: 0;
            width: initial;
            color: var(--menu-text-color, inherit);
            &:hover {
              background-color: var(--hover-bg-color, #{lighten($bg-color, 10)});
            }
          }
        }
      }
    }
  }
}
</style>
