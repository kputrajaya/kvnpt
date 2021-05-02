import Head from 'next/head'

import { STATIC_PROPS_REVALIDATE } from '../../utils/constants'
import BackButton from '../../components/back_button'

export default function Song() {
  return null
}

export async function getStaticPaths() {
  const paths = []

  return {paths, fallback: true}
}

export async function getStaticProps({ params }) {
  if (false) return {notFound: true}

  return {
    props: {},
    revalidate: STATIC_PROPS_REVALIDATE
  }
}
