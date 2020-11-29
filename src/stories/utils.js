import { v4 as uuidv4 } from 'uuid'
import DockerNames from 'docker-names'

function generateIntString (max, padding) {
  const str = '' + Math.floor(max * Math.random())
  return str.padStart(padding, '0')
}

export function generateMediaEntry (uuid = uuidv4()) {
  return {
    uuid,
    title: DockerNames.getRandomName(),
    url: `https://youtube.com/${uuid}`,
    poster: 'https://picsum.photos/360/200',
    description: 'https://youtube.com',
    duration: `${generateIntString(4, 2)}:${generateIntString(60, 2)}:${generateIntString(60, 2)}`
  }
}
