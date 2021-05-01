import ReactAudioPlayer from 'react-audio-player'

export default function Audio({ src }) {
  return (
    <ReactAudioPlayer src={src} controls className="w-full" />
  )
}
