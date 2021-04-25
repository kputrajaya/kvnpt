import Head from 'next/head'

import BackButton from '../../components/back_button'

export default function Song() {
  return null
}

export async function getStaticPaths() {
  const paths = []

  return {paths, fallback: false}
}
