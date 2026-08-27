import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, image }) => {
  const siteName = "Anusha Kirshna | Software Engineer";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "Portfolio of Anusha Kirshna, a Software Engineer and UI/UX Designer specializing in immersive web experiences and interactive front-end development.";
  const defaultUrl = "https://anushakirshna.com"; // Change to the actual deployed URL when ready
  const defaultImage = "/preview-image.jpg"; // You can replace this with a real preview image path

  const seo = {
    title: fullTitle,
    description: description || defaultDescription,
    url: url ? `${defaultUrl}${url}` : defaultUrl,
    image: image || defaultImage,
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  );
};

export default SEO;
