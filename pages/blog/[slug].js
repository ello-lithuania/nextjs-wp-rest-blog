import { getAllBlogSlugs, getBlogData } from "../../lib/wordpress"
import Layout from '../../components/layout'

//set the path
export async function getStaticPaths() {
    const paths = await getAllBlogSlugs()
    return {
        paths,
        fallback: false
    }
}

// fetch result by slug
export async function getStaticProps({params}) {
    const postData = await getBlogData(params.slug)
    return {
        props: {
            postData
        }
    }
}

export default function BlogSingle({postData}) {
  
  const post = postData[0]

  return (
    <Layout>
        <h1>{post.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}/>


  <section className="text-gray-600 body-font">
    <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
      <img
        className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
        alt="hero"
        src="https://dummyimage.com/720x600"
      />
      <div className="text-center lg:w-2/3 w-full">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {post.title.rendered}
        </h1>
        <p className="mb-8 leading-relaxed">
          Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing
          tousled. Chambray dreamcatcher trust fund, kitsch vice godard disrupt
          ramps hexagon mustache umami snackwave tilde chillwave ugh. Pour-over
          meditation PBR&amp;B pickled ennui celiac mlkshk freegan photo booth
          af fingerstache pitchfork.
        </p>
        <div className="flex justify-center">
          <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Button
          </button>
          <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
            Button
          </button>
        </div>
      </div>
    </div>
  </section>

    </Layout>
  )
}
