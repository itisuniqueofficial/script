document.addEventListener("DOMContentLoaded", () => {
  const websiteUrlInput = document.getElementById("website-url");
  const generateBtn = document.getElementById("generate-btn");
  const outputContainer = document.getElementById("output-container");
  const outputText = document.getElementById("output-text");
  const copyBtn = document.getElementById("copy-btn");
  const errorMessage = document.getElementById("error-message");

  websiteUrlInput.addEventListener("input", () => {
    generateBtn.disabled = websiteUrlInput.value === "";
  });

  generateBtn.addEventListener("click", () => {
    const websiteUrl = websiteUrlInput.value;
    const platform = document.getElementById("platform-select").value;

    if (websiteUrl === "") {
      errorMessage.style.display = "block";
      return;
    }

    errorMessage.style.display = "none";

    // Generate the robots.txt content based on the selected platform
    let robotsTxtContent = "";

    if (platform === "blogger") {
      // Robots.txt content for Blogger
      robotsTxtContent = `User-agent: *

Disallow: /search

Sitemap: ${websiteUrl}${websiteUrl.endsWith("/") ? "" : "/"}sitemap.xml

Sitemap: ${websiteUrl}${websiteUrl.endsWith("/") ? "" : "/"}sitemap-pages.xml

Sitemap: ${websiteUrl}${websiteUrl.endsWith("/") ? "" : "/"}atom.xml?redirect=false&start-index=1&max-results=500`;
    } else if (platform === "wordpress") {
      // Robots.txt content for WordPress
      robotsTxtContent = `User-agent: *

Disallow: /wp-admin/

Disallow: /wp-includes/

Sitemap: ${websiteUrl}${websiteUrl.endsWith("/") ? "" : "/"}sitemap.xml`;
    }

    // Display the robots.txt content and copy button
    outputText.innerText = robotsTxtContent;
    outputContainer.style.display = "block";
    copyBtn.style.display = "block";

    // Typing effect
    let i = 0;
    function addTypingEffect() {
      if (i <= robotsTxtContent.length) {
        outputText.innerText = robotsTxtContent.slice(0, i);
        i++;
        setTimeout(addTypingEffect, 50);
      }
    }
    addTypingEffect();
  });

  copyBtn.addEventListener("click", () => {
    const copyText = document.createElement("textarea");
    copyText.value = outputText.innerText;
    document.body.appendChild(copyText);
    copyText.select();
    document.execCommand("copy");
    document.body.removeChild(copyText);
    alert("Copied to clipboard!");
  });
});