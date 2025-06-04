export default defineEventHandler(async (event) => {
  try {
     const config = useRuntimeConfig(event)
    const API = config.public.NUXT_PUBLIC_API

    const wppost = await $fetch(`${API}/posts?per_page=100`);
    
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