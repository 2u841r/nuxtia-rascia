export default defineEventHandler(async (event) => {
  try {
    const wppost = await $fetch('https://wp3.zmt3.com/wp-json/wp/v2/posts?per_page=100');
    
    // Set cache headers
    setResponseHeader(event, 'Cache-Control', 'max-age=3600');
    
    return { 
      wppost, 
      title: 'All Blogs' 
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'An error occurred while fetching all blogs'
    });
  }
});