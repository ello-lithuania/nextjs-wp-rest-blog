import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from "next/link"
import Layout from '../components/layout'
import { getHomepageData } from '../lib/wordpress';

export async function getStaticProps() {
  const homepageData = await getHomepageData();

  return {
    props: {
      homepageData
    }
  }
}

export default function Home({homepageData}) {

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img
                className="object-cover object-center rounded"
                alt="hero"
                src={homepageData.hero_image}
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                {homepageData.title}
              </h1>
              <p className="mb-8 leading-relaxed">
              {homepageData.short_description}
              </p>
            </div>
          </div>
        </section>

    </Layout>
  );
}
