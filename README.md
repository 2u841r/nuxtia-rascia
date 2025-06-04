source code of this site originally created by [Tania Rascia](https://github.com/taniarascia/taniarascia.com) in Gatsby+Markdown, I converted it to Vue.
previously to previously to [Svelte+Wordpress-API](https://github.com/2u841r/sveltia-rascia) and [Astro](https://github.com/2u841r/astroia-rascia/).

My future plan is 
- [x] [Svelte](https://github.com/2u841r/sveltia-rasci) version of this site. 
- [x] [Astro](https://github.com/2u841r/astroia-rascia/) version of this site. 
- [ ] Convert CSS to Tailwind CSS.

Instruction
create a .env file beforenpm run dev

```
PUBLIC_API=https://wp4.zmt3.buzz/wp-json/wp/v2
```

It's a WordPress REST API link. Astro will visit each post, tag, and category and make static files. You can see that in the terminal in the build process. npm run build

Feel free to change/use this src code for Markdown files.

If you don't have a WordPress site, find a website with WordPress, then visit that-sites-name.com/wp-json/wp/v2/posts.

If you get posts, use that link for test :-) or ask me (email available at /me route), I will give you my wordpress link.




# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
