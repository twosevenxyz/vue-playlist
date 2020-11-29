/* eslint indent: ["warn", 2] */
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'
import { v4 as uuidv4 } from 'uuid'
import { generateMediaEntry } from './utils'
import BasePlaylist from '../components/base-playlist.vue'
import MediaPlaylistItem from '../components/media-playlist-item.vue'

export default {
  title: 'Playlist'
}

const order = [uuidv4(), uuidv4(), uuidv4()]
const data = {}
order.forEach(uuid => { data[uuid] = generateMediaEntry(uuid) })

export const playlist = () => ({
  components: {
    BasePlaylist,
    MediaPlaylistItem
  },
  template: `
  <div style="max-width: 360px; max-height: 420px; overflow-y: auto;">
    <button @click="addItem">Add Item</button>
    <base-playlist :data="data" :order.sync="order" key-field="uuid">
      <template v-slot:list-item="props">
        <media-playlist-item v-bind="props.entry" @remove="remove(props.entry, props.index)"/>
      </template>
    </base-playlist>
  </div>
  `,
  data () {
    return {
      data,
      order
    }
  },
  methods: {
    addItem () {
      const entry = generateMediaEntry()
      const { uuid } = entry
      this.$set(this.data, uuid, entry)
      this.order.push(uuid)
    },
    remove (entry, index) {
      this.order.splice(index, 1)
      this.$set(this.data, entry.uuid, undefined)
    }
  }
})
