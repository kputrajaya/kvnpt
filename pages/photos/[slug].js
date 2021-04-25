import Head from 'next/head'

import BackButton from '../../components/back_button'

export default function Photo() {
  return null
}

export async function getStaticPaths() {
  const paths = []

  return {paths, fallback: false}
}

export async function getStaticProps({ params }) {
  return {
    props: {}
  }
}
