import Link from "next/link"
import Image from "next/image"
import { getBlogs } from "../lib/wordpress"
import Layout from '../components/layout'

export async function getStaticProps() {
    const allPostsData = await getBlogs()

    return {
        props: {
            allPostsData
        }
    }
}

export default function Blog({allPostsData}) {
    
  return (
    <Layout>
      <div className="text-black uppercase text-center text-4xl mb-2">
        <h1>blog</h1>
        <hr/>
      </div>
      <>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 pt-4 mx-auto">
            <div className="flex flex-wrap -m-4">

              { allPostsData.map((post, i) => (

              <div className="p-4 md:w-1/3" key={i}>
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                { post.featured_image_url ?
                <Image
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={post.featured_image_url}
                  alt="blog"
                  width="500"
                  height="500"
                /> : 
                <Image
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src='https://dummyimage.com/720x400'
                  alt="blog"
                  width="500"
                  height="500"
                />
                }
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                      {post.title.rendered}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {post.title.rendered}
                  </h1>
                  <div className="leading-relaxed mb-3">
                      <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                  </div>
                  <div className="flex items-center flex-wrap ">
                    <Link href={'blog/'+post.slug} className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

                  )) 
              }

            </div>
          </div>
        </section>
      </>

    </Layout>
  )
}
