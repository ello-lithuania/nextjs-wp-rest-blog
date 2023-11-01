const BASE_URL = process.env.NEXT_PUBLIC_WP_BASE_URL;
const NEXT_PUBLIC_WP_JSON_URL = process.env.NEXT_PUBLIC_WP_JSON_URL;

export async function getBlogs() {
    const postsRes = await fetch(BASE_URL+'posts?_fields=id,title,slug,description,content,excerpt,featured_image_url')

    const posts = await postsRes.json()
    return posts
}

export async function getBlogData(slug) {
    const postsRes = await fetch(BASE_URL+'posts/?slug='+slug)

    const post = await postsRes.json()
    return {
        slug,
        ...post
    }
}

export async function getAllBlogSlugs() {
    const postsRes = await getBlogs()

    return postsRes.map((post) => {
        return {
            params: {
                slug: post.slug
            },
        };
    });
}

export async function getHomepageData() {
    const homeData = await fetch(NEXT_PUBLIC_WP_JSON_URL+'/myplugin/v1/bwp-settings?setting-name=homepage_setting');

    const homepageData = await homeData.json();

    return homepageData;
}