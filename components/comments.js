import {createRef, useEffect} from 'react'

import {UTTERANCES_REPO} from '../utils/constants'

export default function Comments() {
  const ref = createRef()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.crossOrigin = 'anonymous'
    script.async = true
    script.setAttribute('repo', UTTERANCES_REPO)
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('theme', 'github-light')
    ref.current.appendChild(script)
  }, [])

  return (
    <div ref={ref}></div>
  )
}
