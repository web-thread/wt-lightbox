# Web-Thread Lightbox

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE.md)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/web-thread/wt-lightbox)

A lightweight, simple, and responsive lightbox gallery script for any website.

**Web-Thread Lightbox** is a zero-dependency (vanilla) JavaScript solution for adding an elegant image popup and gallery to your website. It's fast, easy to install, and fully responsive, requiring no libraries like jQuery.

---

## 🚀 Live Demo

See it in action at our **[Live Demo Page](https://web-thread.com/apps/wt-lightbox/)**.

## ✨ Features

* **Zero Dependencies:** Written in pure, "vanilla" JavaScript.
* **Fully Responsive:** Looks great on all devices, from mobile phones to desktops.
* **Image Gallery/Slideshow:** Automatically groups images and adds "Next" / "Previous" navigation.
* **Lightweight:** Tiny footprint. Just one CSS file and one JS file.
* **Easy to Use:** Works by adding just two CSS classes to your existing HTML.

## ⚙️ Get Started

You can use this library by downloading the `wt-lightbox.js` and `wt-lightbox.css` files from this repository and including them in your project.

### 1. Add the CSS

Include the `wt-lightbox.css` stylesheet inside your HTML's `<head>` tag.

```html
<head>
  <link rel="stylesheet" href="path/to/wt-lightbox.css">
</head>
```

### 2. Add the JavaScript

Place the `wt-lightbox.js` script file just before your closing `</body>` tag for optimal performance.

```html
<body>
  <script src="path/to/wt-lightbox.js"></script>
</body>
```

### 3. Markup HTML Structure

This script works by detecting two simple classes.
1. Add the class="wt-lightbox-group" to the main container that holds your gallery.
2. Add the class="wt-lightbox-item" to each individual element that contains a thumbnail.
The script will automatically find the `<img>` tag inside each item and use its src, alt, and title attributes to build the lightbox.

```html
<div class="wt-lightbox-group example-thumbs-layout">
    <div class="wt-lightbox-item">
        <img src="images/caretta.jpg" alt="Caretta caretta, oil painting by alex tade" title="Caretta caretta" />
    </div>
    <div class="wt-lightbox-item">
        <img src="images/clouds.jpg" alt="Clouds, oil painting by alex tade" title="Clouds" />
    </div>
    <div class="wt-lightbox-item">
        <img src="images/roots.jpg" alt="Roots, oil painting by alex tade" title="Roots" />
    </div>
    <div class="wt-lightbox-item">
        <img src="images/unicorn.jpg" alt="Unicorn, oil painting by alex tade" title="Unicorn" />
    </div>
</div>
```

That's all there is to it! The script will automatically find these items and build the lightbox gallery.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
(We recommend you add a file named `LICENSE.md` with the MIT license text.)

## 🧑‍💻 Author

Brought to you by Alexandros Pertsinidis member of the team at **[web-thread](https://web-thread.com/)**.
