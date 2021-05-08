import {STATIC_PROPS_REVALIDATE} from '../../utils/constants'

export default function Song() {
  return null
}

export async function getStaticPaths() {
  return {paths: [], fallback: true}
}

export async function getStaticProps({params}) {
  if (false) return {notFound: true}

  return {
    props: {},
    revalidate: STATIC_PROPS_REVALIDATE,
  }
}
