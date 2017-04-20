# consultation-kit-website

### Website + berawa

This site is built off of static page generator [Hugo](https://gohugo.io/overview/introduction/).

In order to add more pages to the site add markdown to `content/`.

To have Hugo set up the file for you with a title tamp stamp etc. run

```
$ hugo new page/faq.md
```

To edit the homepage edit `layouts/index.html`

main.css is loaded in berawa. If you make a new css file and want it loaded at it to the custom_css array in `config.toml`

Navigation, some configuration variables, logos etc can all be changed through `config.toml`

### Building site

Should be as easy as running
```
$ hugo
```

which should build a new static version in `docs/` and then push it up

### Adding new partials and features

Make changes to https://github.com/sipplified/berawa
