import posts from './api/posts.json';
import { cleanTitle, PostData } from './post/[slug]';

const EXTERNAL_DATA_URL = 'https://do4ng.vercel.app/post';

function generateSiteMap(ps: PostData[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://do4ng.vercel.app/</loc>
     </url>
     <url>
       <loc>https://do4ng.vercel.app/about</loc>
     </url>
     ${ps
       .map(({ data }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${cleanTitle(data.title)}`}</loc>
           <changefreq>daily</changefreq>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(posts);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
