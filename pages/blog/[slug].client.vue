<script setup>
import { ref, onMounted } from 'vue';
import SidebarLayout from '~/components/SidebarLayout.vue';

// import { formatDate } from '~/lib/util/helpers';  // Adjust according to your helpers location

const route = useRoute();
const blogSlug = route.params.slug;
const postData = ref(null);
const errorMessage = ref(null);
const categories = ref([]);
const tags = ref([]);

const fetchPostData = async () => {
  console.log(`https://wp3.zmt3.com/wp-json/wp/v2/posts?slug=${blogSlug}`)
  try {
    const response = await fetch(`https://wp3.zmt3.com/wp-json/wp/v2/posts?slug=${blogSlug}`);
    if (!response.ok) throw new Error('Failed to fetch post data');
    const post = await response.json();

    if (post.length === 0) {
      throw new Error('No blog found');
    }

    postData.value = post[0];

    // Fetch categories
    const categoryIds = post[0].categories.join(',');
    const categoriesRes = await fetch(`https://wp3.zmt3.com/wp-json/wp/v2/categories?include=${categoryIds}`);
    if (!categoriesRes.ok) throw new Error('Failed to fetch categories');
    categories.value = await categoriesRes.json();

    // Fetch tags
    const tagIds = post[0].tags.join(',');
    const tagsRes = await fetch(`https://wp3.zmt3.com/wp-json/wp/v2/tags?include=${tagIds}`);
    if (!tagsRes.ok) throw new Error('Failed to fetch tags');
    tags.value = await tagsRes.json();

  } catch (error) {
    errorMessage.value = `An error occurred while fetching the blog - ${blogSlug}.`;
    console.error(error);
  }
};

onMounted(fetchPostData);
</script>
<template>

  <SidebarLayout>
    <div v-if="errorMessage">
      <section class="segment small">
        <p class="error">{{ errorMessage }}</p>
        <p class="error">Or maybe there's a typo in the link.</p>
      </section>
    </div>
    <div v-else>
      <!-- <SEO :postNode="postData" postSEO /> -->
      <main>
        <div class="post-header medium width">
          <h1>{{ postData?.title.rendered }}</h1>
        </div>
        <section class="segment small">
          <div class="post-content" v-html="postData?.content.rendered"></div>
        </section>
        <PostSidebar :categories="categories" :tags="tags" :date="postData?.date" />
      </main>
    </div>
  </SidebarLayout>

</template>