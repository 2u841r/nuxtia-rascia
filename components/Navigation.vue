<script setup>
import blog from "assets/nav-blog.png";
import search from "./public/assets/nav-search.png  ";
import floppy from "./public/assets/nav-floppy.png";
import projects from "./public/assets/nav-projects.png";
import moon from "./public/assets/emoji/moon.png";
import sun from "./public/assets/emoji/sun.png";
import github from "./public/assets/nav-github.png";


// DARK MODE
import  '../styles/style.css';
import '../styles/new-moon.css';
import '../styles/dark-mode.css'

const theme = ref('dark');
const srcImage = computed(() => theme.value === 'dark' ? sun : moon);

// Update theme function
const onUpdateTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem('theme', theme.value);
    document.documentElement.classList.toggle('dark');
};

// Update mounted hook
onMounted(() => {
    const savedTheme = window.localStorage.getItem('theme') || 'dark';
    theme.value = savedTheme;
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
});



const mainNavItems = [
    { url: "/", icon: floppy, label: "Home" },
    { url: "/me", icon: search, label: "About" },
    { url: "/blog", icon: blog, label: "Blog" },
    { url: "/projects", icon: projects, label: "Projects" },
];
const socialNavItems = [
    { url: "https://github.com/2u841r", icon: github, label: "GitHub" },
];

// function slugify(string) {

//     return (
//         string &&
//         `${string}`
//             .match(
//                 /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
//             )
//             .map((x) => x.toLowerCase())
//             .join('-')
//     )
//}


</script>

<template>
    <div>
        <section class="navigation">
            <div class="container">
                <nav>
                    <div v-for="navItem in mainNavItems" :key="navItem.label" class="nav-item-outer">
                        <NuxtLink :to="navItem.url" :class="['item']">
                            <img :src="navItem.icon" alt="navIcon" class="nav-image" />
                            <span>{{ navItem.label }}</span>
 
                        </NuxtLink>
                    </div>

                    <div v-for="socialNavItem in socialNavItems" :key="socialNavItem.label" class="nav-item-outer">
                        <a :href="socialNavItem.url" class="desktop-only item">
                            <img :src="socialNavItem.icon" alt="navIcon" class="nav-image" />
                            <span>{{ socialNavItem.label }}</span>
                        </a>
                    </div>
                </nav>

                <div class="theme-toggle">
                    <button @click="onUpdateTheme">
                        <img :src="srcImage" alt="ThemeToggleButton" />
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>