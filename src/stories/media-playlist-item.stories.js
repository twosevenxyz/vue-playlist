/* eslint indent: ["warn", 2] */
// import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'
import { generateMediaEntry } from './utils'
import MediaPlaylistItem from '../components/media-playlist-item.vue'

export default {
  title: 'Media Playlist Item'
}

export const basic = () => ({
  components: { MediaPlaylistItem },
  template: `
  <div style="max-width: 420px;">
    <media-playlist-item :title="entry.title" :poster="entry.poster" :duration="entry.duration" :description="entry.description"/>
  </div>
  `,
  data () {
    return {
      entry: generateMediaEntry()
    }
  },
  methods: {
  }
})
