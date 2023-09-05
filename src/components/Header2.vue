<template>
    <nav
    class="navbar navbar-expand-lg navbar-transparent navbar-dark bg-dark py-4"
  >
    <div class="container">
      <a class="navbar-brand" href="../"><strong>DD</strong> PMS</a>
      <button
        class="navbar-toggler"
        type="button"
        data-action="offcanvas-open"
        data-target="#navbar_main"
        aria-controls="navbar_main"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse offcanvas-collapse" id="navbar_main">
        <ul class="navbar-nav ml-auto align-items-lg-center">
          <h6 class="dropdown-header font-weight-600 d-lg-none px-0">菜单</h6>
          <li class="nav-item">
            <a class="nav-link" href="/">首页</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="../docs/introduction.html">产品介绍</a>
          </li>
          <div class="dropdown-divider d-lg-none my-4"></div>
          <h6 class="dropdown-header font-weight-600 d-lg-none px-0">
            Social Media
          </h6>
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://instagram.com/webpixelsofficial/"
              target="_blank"
              ><i class="fab fa-instagram"></i
              ><span class="ml-2 d-lg-none">Instagram</span></a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://web.facebook.com/webpixels"
              target="_blank"
              ><i class="fab fa-facebook"></i
              ><span class="ml-2 d-lg-none">Facebook</span></a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://dribbble.com/webpixels"
              target="_blank"
              ><i class="fab fa-dribbble"></i
              ><span class="ml-2 d-lg-none">Dribbble</span></a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://github.com/webpixels"
              target="_blank"
              ><i class="fab fa-github"></i
              ><span class="ml-2 d-lg-none">Github</span></a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

    <slot></slot>
</template>