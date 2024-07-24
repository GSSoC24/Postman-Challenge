
<h1 align="center">Postman-Challenge</h1>

<div align="center">
  
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<a href="https://github.com/recodehive/awesome-github-profiles/stargazers"><img src="https://img.shields.io/github/stars/recodehive/awesome-github-profiles" alt="Stars Badge"/></a>
<a href="https://github.com/recodehive/awesome-github-profiles/network/members"><img src="https://img.shields.io/github/forks/recodehive/awesome-github-profiles" alt="Forks Badge"/></a>
<a href="https://github.com/recodehive/awesome-github-profiles/pulls"><img src="https://img.shields.io/github/issues-pr/recodehive/awesome-github-profiles" alt="Pull Requests Badge"/></a>
<a href="https://github.com/recodehive/awesome-github-profiles/issues"><img src="https://img.shields.io/github/issues/recodehive/awesome-github-profiles" alt="Issues Badge"/></a>
<a href="https://github.com/recodehive/awesome-github-profiles/graphs/contributors"><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/recodehive/awesome-github-profiles?color=2b9348"></a>
<a href="https://github.com/recodehive/awesome-github-profiles/blob/master/LICENSE"><img src="https://img.shields.io/github/license/recodehive/awesome-github-profiles?color=2b9348" alt="License Badge"/></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
This is the all in one place for documentation help regarding the postman challenge.
</div>

# Add Your Certificate

## Usage

To use the Leap day theme:

1. Add the following to your site's `_config.yml`:

    ```yml
    remote_theme: pages-themes/leap-day@v0.2.0
    plugins:
    - jekyll-remote-theme # add this line to the plugins list if you already have one
    ```

2. Optionally, if you'd like to preview your site on your computer, add the following to your site's `Gemfile`:

    ```ruby
    gem "github-pages", group: :jekyll_plugins
    ```

## Customizing Badge on Gssoc

### Configuration variables

Leap day will respect the following variables, if set in your site's `_config.yml`:

```yml
title: [The title of your site]
description: [A short description of your site's purpose]
```

Additionally, you may choose to set the following optional variables:

```yml
show_downloads: ["true" or "false" (unquoted) to indicate whether to provide a download URL]
google_analytics: [Your Google Analytics tracking ID]
```

### Stylesheet
## Contributing

Interested in contributing to Postman documentation? We'd love your help. Leap day is an open source project, built one contribution at a time by users like you. See [the CONTRIBUTING file](docs/CONTRIBUTING.md) for instructions on how to contribute.

### Previewing the theme locally

If you'd like to preview the theme locally (for example, in the process of proposing a change):

1. Clone down the theme's repository (`git clone https://github.com/pages-themes/`)
2. `cd` into the theme's directory
3. Run `script/bootstrap` to install the necessary dependencies
4. Run `bundle exec jekyll serve` to start the preview server
5. Visit [`localhost:4000`](http://localhost:4000) in your browser to preview the theme

### Running tests

The theme contains a minimal test suite, to ensure a site with the theme would build successfully. To run the tests, simply run `script/cibuild`. You'll need to run `script/bootstrap` once before the test script will work.
